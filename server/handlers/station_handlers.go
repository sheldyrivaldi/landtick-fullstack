package handlers

import (
	resultdto "landtick/dto/result"
	stationdto "landtick/dto/station"
	"landtick/models"
	"landtick/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
)

type handlerStation struct {
	StationRepositories repositories.StationRepositories
}

type dataStations struct {
	Stations interface{} `json:"station"`
}

func HandlerStation(StationRepositories repositories.StationRepositories) *handlerStation {
	return &handlerStation{StationRepositories}
}

func (h *handlerStation) FindStations(c echo.Context) error {
	stations, err := h.StationRepositories.FindStations()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data: dataStations{
			Stations: stations,
		},
	})
}

func (h *handlerStation) GetStation(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: "Invalid ID! Please input id as number."})
	}

	station, err := h.StationRepositories.GetStation(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data: dataStations{
			Stations: convertResponseStation(station),
		},
	})
}

func (h *handlerStation) CreateStation(c echo.Context) error {
	request := new(stationdto.CreateStationRequestDTO)

	err := c.Bind(&request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	validation := validator.New()

	validationErr := validation.Struct(request)
	if validationErr != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	newStation := models.Station{
		Name: request.Name,
	}

	data, err := h.StationRepositories.CreateStation(newStation)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data: dataStations{
			Stations: convertResponseStation(data),
		},
	})
}

func (h *handlerStation) UpdateStation(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: "Invalid ID! Please input id as number."})
	}

	request := new(stationdto.UpdateStationRequestDTO)

	bindErr := c.Bind(&request)
	if bindErr != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	validation := validator.New()
	validationErr := validation.Struct(request)
	if validationErr != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "failed", Message: validationErr.Error()})
	}

	station, getErr := h.StationRepositories.GetStation(id)
	if getErr != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	if request.Name != "" {
		station.Name = request.Name
	}

	data, err := h.StationRepositories.UpdateStation(station)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data: dataStations{
			Stations: convertResponseStation(data),
		},
	})
}

func (h *handlerStation) DeleteStation(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: "Invalid ID! Please input id as number."})
	}

	station, err := h.StationRepositories.GetStation(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	data, err := h.StationRepositories.DeleteStation(station)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data: dataStations{
			Stations: convertResponseStation(data),
		},
	})
}

func convertResponseStation(s models.Station) stationdto.StationResponseDTO {
	return stationdto.StationResponseDTO{
		ID:   s.ID,
		Name: s.Name,
	}
}
