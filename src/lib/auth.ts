import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface TokenPayload {
  userId: number;
  username: string;
  iat?: number;
  exp?: number;
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

export function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromRequest(request);
  if (!token) return false;
  
  const payload = verifyToken(token);
  return payload !== null;
}
