export interface JwtPayload {
  userName: string;
  userId: string;
  email: string;
  uri: string;
  exp: number;
  issuer: string;
  audience: string;
}

export interface JwtPayloadRaw {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  sub: string;
  email: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/uri": string;
  exp: number;
  iss: string;
  aud: string;
}

function mapJwtPayload(raw: JwtPayloadRaw): JwtPayload {
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
