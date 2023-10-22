
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getUserId(): string | null {
    // Aquí puedes agregar lógica para extraer el ID del usuario desde el token si es necesario.
    // Por ahora, solo devolverá null.
    return null;
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}

