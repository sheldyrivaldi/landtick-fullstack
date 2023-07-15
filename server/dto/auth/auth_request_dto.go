package authdto

type LoginRequestDTO struct {
	Email    string `json:"email" form:"email" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
}
type RegisterRequestDTO struct {
	Fullname string `json:"fullname" form:"fullname" validate:"required"`
	Username string `json:"username" form:"username" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
	Gender   string `json:"gender" form:"gender"`
	Telp     string `json:"no_hp" form:"no_hp"`
	Address  string `json:"address" form:"address"`
}
