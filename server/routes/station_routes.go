package routes

import (
	"landtick/handlers"
	"landtick/pkg/middlewares"
	"landtick/pkg/mysql"
	"landtick/repositories"

	"github.com/labstack/echo/v4"
)

func StationRoutes(e *echo.Group) {
	stationRepository := repositories.RepositoryStation(mysql.DB)
	h := handlers.HandlerStation(stationRepository)

	e.GET("/stations", h.FindStations)
	e.GET("/station/:id", h.GetStation)
	e.POST("/station", middlewares.Auth(h.CreateStation))
	e.PATCH("/station/:id", middlewares.Auth(h.UpdateStation))
	e.DELETE("/station/:id", middlewares.Auth(h.DeleteStation))
}
