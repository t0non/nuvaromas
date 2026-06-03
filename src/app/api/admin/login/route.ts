import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (password === adminPassword) {
      const response = NextResponse.json({ success: true });
      // Salva um cookie de sessão simples com validade de 1 dia
      response.cookies.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 1 dia
      });
      return response;
    } else {
      return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}
