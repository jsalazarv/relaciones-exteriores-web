export interface ISignInResponse {
  token: string;
  expires_at: number;
  token_type: string;
}
export interface ISignInRequest {
  email: string;
  password: string;
}
