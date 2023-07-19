package handlers

import (
	resultdto "landtick/dto/result"
	ticketdto "landtick/dto/ticket"
	transactiondto "landtick/dto/transaction"
	"landtick/models"
	"landtick/repositories"
	"net/http"
	"strconv"
	"time"

	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

type handlerTicket struct {
	TicketRepositories repositories.TicketRepositories
}

func HandlerTicket(TicketRepositories repositories.TicketRepositories) *handlerTicket {
	return &handlerTicket{TicketRepositories}
}

func (h *handlerTicket) FindTickets(c echo.Context) error {
	tickets, err := h.TicketRepositories.FindTickets()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	response := make([]ticketdto.TicketResponseDTOGet, len(tickets))
	for i, t := range tickets {
		response[i] = convertResponseTicketGet(t)
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data:   response,
	})
}

func (h *handlerTicket) SearchTickets(c echo.Context) error {
	date := c.QueryParam("date")
	startStationQuery := c.QueryParam("startStation")
	destinationStationQuery := c.QueryParam("destinationStation")
	qty := c.QueryParam("qty")

	startStation, err := h.TicketRepositories.GetStationByName(startStationQuery)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	destinationStation, err := h.TicketRepositories.GetStationByName(destinationStationQuery)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}
	parseQty, _ := strconv.Atoi(qty)
	tickets, err := h.TicketRepositories.SearchTickets(date, startStation.ID, destinationStation.ID, parseQty)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	response := make([]ticketdto.TicketResponseDTOGet, len(tickets))
	for i, t := range tickets {
		response[i] = convertResponseTicketGet(t)
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data:   response,
	})
}

func (h *handlerTicket) GetTicket(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	ticket, err := h.TicketRepositories.GetTicket(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data:   convertResponseTicketGet(ticket),
	})
}

func (h *handlerTicket) CreateTicket(c echo.Context) error {
	request := new(ticketdto.CreateTicketRequestDTO)

	err := c.Bind(&request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	validation := validator.New()

	validationErr := validation.Struct(request)
	if validationErr != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	parseStartDate, err := time.Parse("2006-01-02", request.StartDate)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	parseStartTime, err := time.Parse("15:04", request.StartTime)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	parseArrivalTime, err := time.Parse("15:04", request.ArrivalTime)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	parseStartStationID, _ := strconv.Atoi(request.StartStationID)
	parseDestinationStationID, _ := strconv.Atoi(request.DestinationStationID)
	parsePrice, _ := strconv.Atoi(request.Price)
	parseQty, _ := strconv.Atoi(request.Qty)

	newTicket := models.Ticket{
		NameTrain:            request.NameTrain,
		TypeTrain:            request.TypeTrain,
		StartDate:            parseStartDate,
		StartTime:            time.Date(1, 1, 1, parseStartTime.Hour(), parseStartTime.Minute(), 0, 0, time.Local),
		ArrivalTime:          time.Date(1, 1, 1, parseArrivalTime.Hour(), parseArrivalTime.Minute(), 0, 0, time.Local),
		StartStationID:       parseStartStationID,
		DestinationStationID: parseDestinationStationID,
		Price:                parsePrice,
		Qty:                  parseQty,
	}

	data, err := h.TicketRepositories.CreateTicket(newTicket)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: "EROR BOS"})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data:   convertResponseTicketCreate(data),
	})
}

func (h *handlerTicket) GetMyTicket(c echo.Context) error {
	claims := c.Get("userLogin")
	id := claims.(jwt.MapClaims)["id"].(float64)
	userID := int(id)

	ticket, err := h.TicketRepositories.GetMyTicket(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	response := make([]transactiondto.TransactionTicketResponse, len(ticket))
	for i, t := range ticket {
		response[i] = convertResponseMyTicketTransaction(t)
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data:   response,
	})

}

func convertResponseTicketCreate(t models.Ticket) ticketdto.TicketResponseDTOCreate {
	return ticketdto.TicketResponseDTOCreate{
		ID:                   t.ID,
		NameTrain:            t.NameTrain,
		TypeTrain:            t.TypeTrain,
		StartDate:            t.StartDate.Format("02-01-2006"),
		StartStationID:       t.StartStationID,
		StartTime:            t.StartTime.Format("15:04"),
		DestinationStationID: t.DestinationStationID,
		ArrivalTime:          t.ArrivalTime.Format("15:04"),
		Price:                t.Price,
		Qty:                  t.Qty,
	}
}

func convertResponseTicketGet(t models.Ticket) ticketdto.TicketResponseDTOGet {
	return ticketdto.TicketResponseDTOGet{
		ID:                 t.ID,
		NameTrain:          t.NameTrain,
		TypeTrain:          t.TypeTrain,
		StartDate:          t.StartDate.Format("02-01-2006"),
		StartStation:       t.StartStation,
		StartTime:          t.StartTime.Format("15:04"),
		DestinationStation: t.DestinationStation,
		ArrivalTime:        t.ArrivalTime.Format("15:04"),
		Price:              t.Price,
	}
}

func convertResponseMyTicket(t models.TicketResponseModels) ticketdto.TicketResponseDTOGet {
	return ticketdto.TicketResponseDTOGet{
		ID:                 t.ID,
		NameTrain:          t.NameTrain,
		TypeTrain:          t.TypeTrain,
		StartDate:          t.StartDate.Format("02-01-2006"),
		StartStation:       t.StartStation,
		StartTime:          t.StartTime.Format("15:04"),
		DestinationStation: t.DestinationStation,
		ArrivalTime:        t.ArrivalTime.Format("15:04"),
		Price:              t.Price,
	}
}

func convertResponseMyTicketTransaction(t models.MyTicketTransaction) transactiondto.TransactionTicketResponse {
	return transactiondto.TransactionTicketResponse{
		ID:     t.ID,
		Ticket: convertResponseMyTicket(t.Ticket),
		User:   t.User,
		Status: t.Status,
	}
}
