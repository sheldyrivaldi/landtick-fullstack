package transactiondto

import (
	ticketdto "landtick/dto/ticket"
	"landtick/models"
)

type TransactionResponseDTO struct {
	ID     int                                    `json:"id"`
	User   models.UserResponseModelsTransaction   `json:"user"`
	Ticket models.TicketResponseModelsTransaction `json:"ticket"`
	Status string                                 `json:"status"`
}

type TransactionIdResponseDTO struct {
	ID     int                                    `json:"id"`
	User   models.UserResponseModelsTransaction   `json:"user"`
	Ticket models.TicketResponseModelsTransaction `json:"ticket"`
	Status string                                 `json:"status"`
}
type TransactionTicketResponse struct {
	ID     int                                  `json:"id"`
	Ticket ticketdto.TicketResponseDTOGet       `json:"ticket"`
	User   models.UserResponseModelsTransaction `json:"user"`
	Status string                               `json:"status"`
}
