package repositories

import (
	"landtick/models"

	"gorm.io/gorm"
)

type TicketRepositories interface {
	FindTickets() ([]models.Ticket, error)
	SearchTickets(date string, startStationID, destinationStationID int, qty int) ([]models.Ticket, error)
	GetTicket(ID int) (models.Ticket, error)
	GetMyTicket(UserID int) ([]models.MyTicketTransaction, error)
	CreateTicket(ticket models.Ticket) (models.Ticket, error)
	UpdateTicket(ticket models.Ticket) (models.Ticket, error)
	DeleteTicket(ticket models.Ticket) (models.Ticket, error)
	GetStationByName(name string) (models.Station, error)
}

func RepositoryTicket(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTickets() ([]models.Ticket, error) {
	var tickets []models.Ticket
	err := r.db.Preload("StartStation").Preload("DestinationStation").Find(&tickets).Error

	return tickets, err
}

func (r *repository) SearchTickets(date string, startStationID, destinationStationID int, qty int) ([]models.Ticket, error) {
	var tickets []models.Ticket
	err := r.db.Where("start_date = ? AND start_station_id = ? AND destination_station_id = ? AND qty >= ?", date, startStationID, destinationStationID, qty).Preload("StartStation").Preload("DestinationStation").Find(&tickets).Error

	return tickets, err

}

func (r *repository) GetTicket(ID int) (models.Ticket, error) {
	var ticket models.Ticket
	err := r.db.Preload("StartStation").Preload("DestinationStation").First(&ticket, ID).Error

	return ticket, err
}

func (r *repository) GetMyTicket(UserID int) ([]models.MyTicketTransaction, error) {
	var transaction []models.MyTicketTransaction
	err := r.db.Where("user_id = ?", UserID).Preload("Ticket.StartStation").Preload("Ticket.DestinationStation").Preload("User").Find(&transaction).Error

	return transaction, err

}

func (r *repository) CreateTicket(ticket models.Ticket) (models.Ticket, error) {
	err := r.db.Create(&ticket).Error

	return ticket, err
}

func (r *repository) UpdateTicket(ticket models.Ticket) (models.Ticket, error) {
	err := r.db.Save(&ticket).Error

	return ticket, err
}

func (r *repository) DeleteTicket(ticket models.Ticket) (models.Ticket, error) {
	err := r.db.Delete(&ticket).Scan(&ticket).Error

	return ticket, err
}

func (r *repository) GetStationByName(name string) (models.Station, error) {
	var station models.Station
	err := r.db.First(&station, "name = ?", name).Error

	return station, err
}
