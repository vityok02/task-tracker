import { Injectable } from '@angular/core';
import { JwtPayload, JwtPayloadRaw } from './models/jwt-payload';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private parsedPayload: JwtPayload | null = null;

  public parseToken(): JwtPayload | null {
    if (this.parsedPayload) return this.parsedPayload;

    const token = this.getToken();
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1];
      const payload = atob(payloadBase64);
      const rawPayload: JwtPayloadRaw = JSON.parse(payload);
      this.parsedPayload = this.mapJwtPayload(rawPayload);
      return this.parsedPayload;
    } catch {
      return null;
    }
  }

  private getToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  private mapJwtPayload(raw: JwtPayloadRaw): JwtPayload {
    return {
      userName: raw["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      userId: raw.sub,
      email: raw.email,
      uri: raw["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/uri"],
      exp: raw.exp,
      issuer: raw.iss,
      audience: raw.aud
    };
  }
}
