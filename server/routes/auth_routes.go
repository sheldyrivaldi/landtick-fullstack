package routes

import (
	"landtick/handlers"
	"landtick/pkg/middlewares"
	"landtick/pkg/mysql"
	"landtick/repositories"

	"github.com/labstack/echo/v4"
)

func AuthRoutes(e *echo.Group) {
	authRepository := repositories.RepositoryAuth(mysql.DB)
	h := handlers.HandlerAuth(authRepository)
	e.POST("/register", h.Register)
	e.POST("/login", h.Login)
	e.GET("/check-auth", middlewares.Auth(h.CheckAuth))
}
