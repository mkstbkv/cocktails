export interface User {
  _id: string,
  email: string,
  displayName: string,
  avatar: string | null,
  token: string,
  role: string,
  facebookId: string | null,
}

export interface FieldError {
  message: string
}

export interface LoginUserData {
  email: string,
  password: string,
}

export interface FacebookUserData {
  authToken: string,
  id: string,
  email: string,
  photoUrl: string,
  name: string,
}

export interface LoginError {
  error: string
}

