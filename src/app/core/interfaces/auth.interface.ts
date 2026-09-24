import { Congregation } from "./reuniones.interface";

export interface Credentials {
   username: string;
   password: string;
}

/** Respuesta de autenticación entregada por `POST /auth/login`. */
export interface LoginResponse {
  token: string;
  congregation: Congregation;
}
