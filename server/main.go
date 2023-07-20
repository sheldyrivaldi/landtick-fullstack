package main

import (
	"fmt"
	"landtick/database"
	"landtick/pkg/mysql"
	"landtick/routes"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	godotenv.Load()

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PATCH, echo.DELETE},
		AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization"},
	}))

	mysql.DatabaseInit()
	database.RunMigration()

	e.Static("/uploads", "./uploads")

	routes.RouteInit(e.Group("/api/v1"))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	fmt.Println("Serve unning on port 8000")
	e.Logger.Fatal(e.Start(":" + port))
}
