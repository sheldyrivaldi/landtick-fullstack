package repositories

import (
	"landtick/models"

	"gorm.io/gorm"
)

type AuthRepositories interface {
	Login(email string) (models.User, error)
	Register(user models.User) (models.User, error)
	CheckAuth(ID int) (models.User, error)
}

func RepositoryAuth(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Login(email string) (models.User, error) {

	var user models.User

	err := r.db.First(&user, "email = ?", email).Error

	return user, err
}

func (r *repository) Register(user models.User) (models.User, error) {

	err := r.db.Create(&user).Error

	return user, err
}

func (r *repository) CheckAuth(ID int) (models.User, error) {
	var user models.User
	err := r.db.First(&user, ID).Error

	return user, err
}
