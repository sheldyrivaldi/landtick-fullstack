package models

type User struct {
	ID       int    `json:"id" gorm:"primaryKey"`
	Fullname string `json:"fullname" gorm:"varchar(255)"`
	Username string `json:"username" gorm:"varchar(255)"`
	Email    string `json:"email" gorm:"varchar(255)"`
	Password string `json:"password" gorm:"varchar(255)"`
	Gender   string `json:"gender" gorm:"varchar(255)"`
	Telp     string `json:"no_hp" gorm:"varchar(255)"`
	Address  string `json:"address"`
	Role     string `json:"role" gorm:"default:'user'"`
}

type UserResponseModels struct {
	ID       int    `json:"id"`
	Fullname string `json:"fullname"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

type UserResponseModelsTicket struct {
	ID       int    `json:"id"`
	Fullname string `json:"fullname"`
	Telp     string `json:"no_hp"`
	Email    string `json:"email"`
}

type UserResponseModelsTransaction struct {
	ID       int    `json:"-"`
	Fullname string `json:"fullname"`
	Telp     string `json:"no_hp"`
	Email    string `json:"email"`
}

func (UserResponseModels) TableName() string {
	return "users"
}

func (UserResponseModelsTicket) TableName() string {
	return "users"
}
func (UserResponseModelsTransaction) TableName() string {
	return "users"
}
