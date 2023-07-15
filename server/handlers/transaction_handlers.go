package handlers

import (
	"fmt"
	resultdto "landtick/dto/result"
	transactiondto "landtick/dto/transaction"
	"landtick/models"
	"landtick/repositories"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
	"gopkg.in/gomail.v2"
)

type handlerTransaction struct {
	TransactionRepositories repositories.TransactionRepositories
}

type dataTrsansaction struct {
	Transaction interface{} `json:"transaction"`
}

func HandlerTransaction(TransactionRepositories repositories.TransactionRepositories) *handlerTransaction {
	return &handlerTransaction{TransactionRepositories}
}

func (h *handlerTransaction) FindTransactions(c echo.Context) error {
	transactions, err := h.TransactionRepositories.FindTransactions()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}
	response := make([]transactiondto.TransactionResponseDTO, len(transactions))
	for i, t := range transactions {
		response[i] = convertResponseTransactionFindAll(t)
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data: dataTrsansaction{
			Transaction: response,
		},
	})
}
func (h *handlerTransaction) GetTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	transaction, err := h.TransactionRepositories.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data: dataTrsansaction{
			Transaction: convertResponseTransactionGet(transaction),
		},
	})
}

func (h *handlerTransaction) CreateTransaction(c echo.Context) error {
	request := new(transactiondto.CreateTransactionRequestDTO)
	err := c.Bind(&request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	validation := validator.New()

	validationErr := validation.Struct(request)
	if validationErr != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: validationErr.Error()})
	}
	var transactionIsMatch = false
	var transactionId int
	for !transactionIsMatch {
		transactionId = int(time.Now().Unix())
		transactionData, _ := h.TransactionRepositories.GetTransaction(transactionId)
		if transactionData.ID == 0 {
			transactionIsMatch = true
		}
	}

	claims := c.Get("userLogin")
	id := claims.(jwt.MapClaims)["id"].(float64)
	UserID := int(id)

	newTransaction := models.Transaction{
		ID:       transactionId,
		UserID:   UserID,
		TicketID: request.TicketID,
	}

	data, err := h.TransactionRepositories.CreateTransaction(newTransaction)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data:   convertResponseTransactionGet(data),
	})
}

func (h *handlerTransaction) CreateTransactionPaymentMidtrans(c echo.Context) error {
	request := new(transactiondto.CreateTransactionMidtrans)
	err := c.Bind(&request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(request.ID),
			GrossAmt: int64(request.Price),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: request.Fullname,
			Email: request.Email,
		},
	}

	snapResp, _ := s.CreateTransaction(req)

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data:   snapResp,
	})
}

func (h *handlerTransaction) Notification(c echo.Context) error {
	var notificationPayload map[string]interface{}

	if err := c.Bind(&notificationPayload); err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed!", Message: err.Error()})
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderID := notificationPayload["order_id"].(string)

	order_id, _ := strconv.Atoi(orderID)

	fmt.Println("Ini payload", notificationPayload)

	data, err := h.TransactionRepositories.GetTransaction(order_id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}
	ticket, err := h.TransactionRepositories.GetTicketTransaction(data.TicketID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	ticket.Qty = ticket.Qty - 1

	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			_, err := h.TransactionRepositories.UpdateTransactionPayment("Pending", order_id)
			if err != nil {
				fmt.Println("Error di update BOS!")
			}
			errTicket := h.TransactionRepositories.UpdateTicketTransaction(ticket)
			if !errTicket {
				fmt.Println("Error di update Ticket BOS!")
			}
		} else if fraudStatus == "accept" {
			SendMail("Success", data)
			_, err := h.TransactionRepositories.UpdateTransactionPayment("Approved", order_id)
			if err != nil {
				fmt.Println("Error di update BOS!")
			}
			errTicket := h.TransactionRepositories.UpdateTicketTransaction(ticket)
			if !errTicket {
				fmt.Println("Error di update Ticket BOS!")
			}
		}
	} else if transactionStatus == "settlement" {
		SendMail("Success", data)
		_, err := h.TransactionRepositories.UpdateTransactionPayment("Approved", order_id)
		if err != nil {
			fmt.Println("Error di update BOS!")
		}
		errTicket := h.TransactionRepositories.UpdateTicketTransaction(ticket)
		if !errTicket {
			fmt.Println("Error di update Ticket BOS!")
		}
	} else if transactionStatus == "deny" {
		_, err := h.TransactionRepositories.UpdateTransactionPayment("Pending", order_id)
		if err != nil {
			fmt.Println("Error di update BOS!")
		}
		errTicket := h.TransactionRepositories.UpdateTicketTransaction(ticket)
		if !errTicket {
			fmt.Println("Error di update Ticket BOS!")
		}
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		_, err := h.TransactionRepositories.UpdateTransactionPayment("Canceled", order_id)
		if err != nil {
			fmt.Println("Error di update BOS!")
		}
		errTicket := h.TransactionRepositories.UpdateTicketTransaction(ticket)
		if !errTicket {
			fmt.Println("Error di update Ticket BOS!")
		}
	} else if transactionStatus == "pending" {
		_, err := h.TransactionRepositories.UpdateTransactionPayment("Pending", order_id)
		if err != nil {
			fmt.Println("Error di update BOS!")
		}
		errTicket := h.TransactionRepositories.UpdateTicketTransaction(ticket)
		if !errTicket {
			fmt.Println("Error di update Ticket BOS!")
		}
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Status: "Success", Data: notificationPayload})
}

func (h *handlerTransaction) UpdateTransaction(c echo.Context) error {
	request := new(transactiondto.UpdateTransactionRequestDTO)
	err := c.Bind(&request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}
	id, _ := strconv.Atoi(c.Param("id"))

	data, err := h.TransactionRepositories.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	newTransaction := models.Transaction{
		ID:       data.ID,
		UserID:   data.UserID,
		TicketID: data.TicketID,
		Status:   request.Status,
	}

	dataUpdate, errUpdate := h.TransactionRepositories.UpdateTransaction(newTransaction)
	if errUpdate != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: errUpdate.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data: dataTrsansaction{
			Transaction: convertResponseTransactionGet(dataUpdate),
		},
	})
}

func (h *handlerTransaction) DeleteTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	data, err := h.TransactionRepositories.GetTransaction(id)
	deleteErr := h.TransactionRepositories.DeleteTransaction(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: deleteErr.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data: dataTrsansaction{
			Transaction: convertResponseTransactionGet(data),
		},
	})
}

func SendMail(status string, transaction models.Transaction) {
	if status != transaction.Status && (status == "Success") {
		var CONFIG_SMTP_HOST = "smtp.gmail.com"
		var CONFIG_SMTP_PORT = 587
		var CONFIG_SENDER_NAME = "Landtick <sheldyrivaldi@gmail.com>"
		var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
		var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")

		var startStation = transaction.Ticket.StartStation.Name
		var destinationStation = transaction.Ticket.DestinationStation.Name
		var price = strconv.Itoa(transaction.Ticket.Price)

		mailer := gomail.NewMessage()
		mailer.SetHeader("From", CONFIG_SENDER_NAME)
		mailer.SetHeader("To", transaction.User.Email)
		mailer.SetHeader("Subject", "Transaction Status")
		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8" />
					<meta http-equiv="X-UA-Compatible" content="IE=edge" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>Document</title>
					<style>
						h1 {
						color: brown;
						}
					</style>
				</head>
				<body>
					<h2>Ticket Payment :</h2>
					<ul style="list-style-type:none;">
						<li>From : %s</li>
						<li>To: %s</li>
						<li>Total payment: Rp.%s</li>
						<li>Status : <b>%s</b></li>
					</ul>
				</body>
	  		</html>`, startStation, destinationStation, price, status))

		dialer := gomail.NewDialer(
			CONFIG_SMTP_HOST,
			CONFIG_SMTP_PORT,
			CONFIG_AUTH_EMAIL,
			CONFIG_AUTH_PASSWORD,
		)

		err := dialer.DialAndSend(mailer)
		if err != nil {
			fmt.Println(err.Error())
		}

		fmt.Println("Mail send to : " + transaction.User.Email)
	} else {
		fmt.Println("Error on sending mail!")
	}
}

func convertResponseTransactionFindAll(t models.Transaction) transactiondto.TransactionResponseDTO {
	return transactiondto.TransactionResponseDTO{
		ID:     t.ID,
		User:   convertUser(t.User),
		Ticket: convertTicket(t.Ticket),
		Status: t.Status,
	}
}
func convertResponseTransactionGet(t models.Transaction) transactiondto.TransactionIdResponseDTO {
	return transactiondto.TransactionIdResponseDTO{
		ID:     t.ID,
		User:   convertUser(t.User),
		Ticket: convertTicket(t.Ticket),
		Status: t.Status,
	}
}

func convertTicket(t models.TicketResponseModels) models.TicketResponseModelsTransaction {
	return models.TicketResponseModelsTransaction{
		ID:                   t.ID,
		NameTrain:            t.NameTrain,
		TypeTrain:            t.TypeTrain,
		StartDate:            t.StartDate.Format("02-01-2006"),
		StartStationID:       t.StartStationID,
		StartStation:         convertStation(t.StartStation),
		StartTime:            t.StartTime.Format("15:04"),
		DestinationStationID: t.DestinationStationID,
		DestinationStation:   convertStation(t.DestinationStation),
		ArrivalTime:          t.ArrivalTime.Format("15:04"),
		Price:                t.Price,
	}
}

func convertStation(s models.StationResponseModels) models.StationResponseModels {
	return models.StationResponseModels{
		ID:   s.ID,
		Name: s.Name,
	}
}

func convertUser(u models.UserResponseModelsTransaction) models.UserResponseModelsTransaction {
	return models.UserResponseModelsTransaction{
		Fullname: u.Fullname,
		Telp:     u.Telp,
		Email:    u.Email,
	}
}
