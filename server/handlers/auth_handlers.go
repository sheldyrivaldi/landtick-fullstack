package handlers

import (
	authdto "landtick/dto/auth"
	resultdto "landtick/dto/result"
	"landtick/models"
	"landtick/pkg/bcrypt"
	jwtToken "landtick/pkg/jwt"
	"landtick/repositories"
	"net/http"
	"time"

	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

type handlerAuth struct {
	AuthRepositories repositories.AuthRepositories
}

type dataAuth struct {
	Users interface{} `json:"users"`
}

func HandlerAuth(AuthRepositories repositories.AuthRepositories) *handlerAuth {
	return &handlerAuth{AuthRepositories}
}

func (h *handlerAuth) Login(c echo.Context) error {
	request := new(authdto.LoginRequestDTO)

	err := c.Bind(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	validation := validator.New()

	validationErr := validation.Struct(request)

	if validationErr != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	user, err := h.AuthRepositories.Login(request.Email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	isValid := bcrypt.ComparePassword(request.Password, user.Password)
	if !isValid {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: "Username or Password Error!"})
	}

	claims := jwt.MapClaims{}
	claims["id"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * 12).Unix()

	token, err := jwtToken.GenerateToken(&claims)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	data := authdto.AuthResponseDTO{
		Fullname: user.Fullname,
		Username: user.Username,
		Email:    user.Email,
		Token:    token,
		Role:     user.Role,
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data: dataAuth{
			Users: data,
		},
	})

}

func (h *handlerAuth) Register(c echo.Context) error {
	request := new(authdto.RegisterRequestDTO)

	err := c.Bind(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	validation := validator.New()

	validationErr := validation.Struct(request)

	if validationErr != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	hashPassword, err := bcrypt.GeneratePassword(request.Password)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	newUser := models.User{
		Fullname: request.Fullname,
		Username: request.Username,
		Email:    request.Email,
		Password: hashPassword,
		Gender:   request.Gender,
		Telp:     request.Telp,
		Address:  request.Address,
	}

	data, err := h.AuthRepositories.Register(newUser)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data: dataAuth{
			Users: convertResponseUser(data),
		},
	})

}

func (h *handlerAuth) CheckAuth(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, _ := h.AuthRepositories.CheckAuth(int(userId))

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data: dataAuth{
			Users: convertResponseUser(user),
		},
	})
}
