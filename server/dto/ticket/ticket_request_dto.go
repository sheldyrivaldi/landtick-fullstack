package ticketdto

type CreateTicketRequestDTO struct {
	NameTrain            string `json:"name_train" form:"name_train"`
	TypeTrain            string `json:"type_train" form:"type_train"`
	StartDate            string `json:"start_date" form:"start_date"`
	StartTime            string `json:"start_time" form:"start_time"`
	ArrivalTime          string `json:"arrival_time" form:"arrival_time"`
	StartStationID       string `json:"start_station_id" form:"start_station_id"`
	DestinationStationID string `json:"destination_station_id" form:"destination_station_id"`
	Price                string `json:"price" form:"price"`
	Qty                  string `json:"qty" form:"qty"`
}

type UpdateTicketRequestDTO struct {
	NameTrain            string `json:"name_train" form:"name_train"`
	TypeTrain            string `json:"type_train" form:"type_train"`
	StartDate            string `json:"start_date" form:"start_date"`
	StartTime            string `json:"start_time" form:"start_time"`
	ArrivalTime          string `json:"arrival_time" form:"arrival_time"`
	StartStationID       string `json:"start_station_id" form:"start_station_id"`
	DestinationStationID string `json:"destination_station_id" form:"destination_station_id"`
	Price                string `json:"price" form:"price"`
	Qty                  string `json:"qty" form:"qty"`
}
