import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  // Protéger toutes les routes /admin sauf /admin/login
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Permettre l'accès à la page de login
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Vérifier le token JWT dans les cookies
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      // Pas de token, rediriger vers login
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Vérifier la validité du token
      verifyToken(token);
      return NextResponse.next();
    } catch (error) {
      // Token invalide ou expiré, rediriger vers login
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      // Supprimer le cookie invalide
      response.cookies.delete('admin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
