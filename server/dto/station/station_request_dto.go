package stationdto

type CreateStationRequestDTO struct {
	Name string `json:"name" form:"name" validate:"required"`
}

type UpdateStationRequestDTO struct {
	Name string `json:"name" form:"name"`
}
