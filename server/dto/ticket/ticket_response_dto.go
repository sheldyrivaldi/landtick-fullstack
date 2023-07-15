package ticketdto

import (
	"landtick/models"
)

type TicketResponseDTOCreate struct {
	ID                   int    `json:"id"`
	NameTrain            string `json:"name_train"`
	TypeTrain            string `json:"type_train"`
	StartDate            string `json:"start_date"`
	StartStationID       int    `json:"start_station_id"`
	StartTime            string `json:"start_time"`
	DestinationStationID int    `json:"destination_station_id"`
	ArrivalTime          string `json:"arival_time"`
	Price                int    `json:"price"`
	Qty                  int    `json:"qty"`
}

type TicketResponseDTOGet struct {
	ID                   int                          `json:"id"`
	NameTrain            string                       `json:"name_train"`
	TypeTrain            string                       `json:"type_train"`
	StartDate            string                       `json:"start_date"`
	StartStationID       int                          `json:"-"`
	StartStation         models.StationResponseModels `json:"start_station"`
	StartTime            string                       `json:"start_time"`
	DestinationStationID int                          `json:"-" `
	DestinationStation   models.StationResponseModels `json:"destination_station"`
	ArrivalTime          string                       `json:"arrival_time"`
	Price                int                          `json:"price"`
}

type TicketMyResponseDTO struct {
	ID                   int                                  `json:"id"`
	NameTrain            string                               `json:"name_train"`
	TypeTrain            string                               `json:"type_train"`
	StartDate            string                               `json:"start_date"`
	StartStationID       int                                  `json:"-"`
	StartStation         models.StationResponseModels         `json:"start_station"`
	StartTime            string                               `json:"start_time"`
	DestinationStationID int                                  `json:"-" `
	DestinationStation   models.StationResponseModels         `json:"destination_station"`
	ArrivalTime          string                               `json:"arrival_time"`
	Price                int                                  `json:"price"`
	UserID               int                                  `json:"-"`
	User                 models.UserResponseModelsTransaction `json:"user"`
}
