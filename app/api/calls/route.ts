import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const calls = await prisma.call.findMany({
      include: {
        firm: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(calls);
  } catch (error) {
    console.error('Çağrılar getirilemedi:', error);
    return NextResponse.json(
      { error: 'Çağrılar getirilemedi' },
      { status: 500 }
    );
  }
} 