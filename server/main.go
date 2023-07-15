package main

import (
	"fmt"
	"landtick/database"
	"landtick/pkg/mysql"
	"landtick/routes"
	"log"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

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

	fmt.Println("Serve unning on port 8000")
	e.Logger.Fatal(e.Start(":8000"))
}