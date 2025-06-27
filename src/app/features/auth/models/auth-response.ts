export interface AuthResponse {
  id: string;
  token: {
    token: string;
    expiresIn: string;
  }
}
