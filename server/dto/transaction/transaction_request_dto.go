package transactiondto

type CreateTransactionRequestDTO struct {
	TicketID int `json:"ticket_id" form:"ticket_id"`
}

type UpdateTransactionRequestDTO struct {
	Status string `json:"status"`
}
type CreateTransactionMidtrans struct {
	ID       int    `json:"id" form:"id"`
	Fullname string `json:"fullname" form:"fullname"`
	Email    string `json:"email" form:"email"`
	Price    int    `json:"price" form:"email"`
}
