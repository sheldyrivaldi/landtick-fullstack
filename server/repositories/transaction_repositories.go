package repositories

import (
	"landtick/models"

	"gorm.io/gorm"
)

type TransactionRepositories interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransactionPayment(status string, ID int) (models.Transaction, error)
	DeleteTransaction(id int) error
	GetTicketTransaction(ID int) (models.Ticket, error)
	UpdateTicketTransaction(ticket models.Ticket) bool
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("User").Preload("Ticket").Preload("Ticket.StartStation").Preload("Ticket.DestinationStation").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Preload("Ticket").Preload("Ticket.StartStation").Preload("Ticket.DestinationStation").First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	var data models.Transaction
	err := r.db.Create(&transaction).Where("user_id = ? AND ticket_id = ?", transaction.UserID, transaction.TicketID).Order("id DESC").Preload("User").Preload("Ticket").Preload("Ticket.StartStation").Preload("Ticket.DestinationStation").First(&data).Error

	return data, err
}

func (r *repository) UpdateTransaction(transaction models.Transaction) (models.Transaction, error) {
	var transactionData models.Transaction
	err := r.db.Save(&transaction).Where("id = ? ", transaction.ID).Preload("User").Preload("Ticket").Preload("Ticket.StartStation").Preload("Ticket.DestinationStation").First(&transactionData).Error

	return transactionData, err
}

func (r *repository) DeleteTransaction(id int) error {
	err := r.db.Delete(&models.Transaction{}, id).Error
	return err
}

func (r *repository) GetTicketTransaction(ID int) (models.Ticket, error) {
	var ticket models.Ticket
	err := r.db.First(&ticket, ID).Error

	return ticket, err
}

func (r *repository) UpdateTicketTransaction(ticket models.Ticket) bool {
	err := r.db.Save(&ticket).Error

	return err == nil
}

func (r *repository) UpdateTransactionPayment(status string, ID int) (models.Transaction, error) {
	var transaction models.Transaction
	r.db.Preload("User").
		Preload("Ticket").
		Preload("Ticket.StartStation").
		Preload("Ticket.DestinationStation").
		First(&transaction, ID)

	transaction.Status = status

	err := r.db.Save(&transaction).Error

	return transaction, err
}
