package routes

import (
	"landtick/handlers"
	"landtick/pkg/middlewares"
	"landtick/pkg/mysql"
	"landtick/repositories"

	"github.com/labstack/echo/v4"
)

func TicketRoutes(e *echo.Group) {
	ticketRepository := repositories.RepositoryTicket(mysql.DB)
	h := handlers.HandlerTicket(ticketRepository)

	e.GET("/tickets", h.FindTickets)
	e.GET("/ticket", h.SearchTickets)
	e.GET("/ticket/:id", h.GetTicket)
	e.GET("/ticket/my-ticket", middlewares.Auth(h.GetMyTicket))
	e.POST("/ticket", middlewares.Auth(h.CreateTicket))
}
