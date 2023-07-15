package authdto

type AuthResponseDTO struct {
	Fullname string `json:"fullname"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Token    string `json:"token"`
	Role     string `json:"role"`
}
