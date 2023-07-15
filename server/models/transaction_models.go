package models

type Transaction struct {
	ID       int                           `json:"id" gorm:"primaryKey"`
	UserID   int                           `json:"user_id"`
	User     UserResponseModelsTransaction `json:"user" gorm:"foreignKey:UserID"`
	TicketID int                           `json:"ticket_id"`
	Ticket   TicketResponseModels          `json:"ticket" gorm:"foreignKey:TicketID"`
	Image    string                        `json:"image"`
	Status   string                        `json:"status" gorm:"default:'Pending'"`
}

type TransactionResponseModels struct {
	UserID   int                           `json:"user_id"`
	User     UserResponseModelsTransaction `json:"user"`
	TicketID int                           `json:"ticket_id"`
	Ticket   TicketResponseModels          `json:"ticket"`
	Image    string                        `json:"image"`
}

type MyTicketTransaction struct {
	ID       int                           `json:"id"`
	TicketID int                           `json:"-"`
	Ticket   TicketResponseModels          `json:"ticket"`
	UserID   int                           `json:"-"`
	User     UserResponseModelsTransaction `json:"user"`
	Status   string                        `json:"status"`
}

func (TransactionResponseModels) TableName() string {
	return "transactions"
}

func (MyTicketTransaction) TableName() string {
	return "transactions"
}
