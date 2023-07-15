package routes

import (
	"landtick/handlers"
	"landtick/pkg/middlewares"
	"landtick/pkg/mysql"
	"landtick/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	e.GET("/users", middlewares.Auth(h.FindUsers))
	e.GET("/user/:id", middlewares.Auth(h.GetUser))
	e.POST("/user", middlewares.Auth(h.CreateUser))
	e.PATCH("/user/:id", middlewares.Auth(h.UpdateUser))
	e.DELETE("/user/:id", middlewares.Auth(h.DeleteUser))
}
