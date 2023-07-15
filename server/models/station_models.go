package models

type Station struct {
	ID   int    `json:"id" gorm:"primary_key"`
	Name string `json:"name" gorm:"varchar(255)"`
}

type StationResponseModels struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func (StationResponseModels) TableName() string {
	return "stations"
}
