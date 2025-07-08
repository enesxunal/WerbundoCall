import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const firmSchema = z.object({
  name: z.string().min(1, 'Firma adı gerekli'),
  prompt: z.string().min(1, 'Prompt gerekli'),
  language: z.string().min(1, 'Dil gerekli'),
  email: z.string().email('Geçerli e-posta gerekli'),
});

export async function GET() {
  try {
    const firms = await prisma.firm.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(firms);
  } catch (error) {
    console.error('Firmalar getirilemedi:', error);
    return NextResponse.json(
      { error: 'Firmalar getirilemedi' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = firmSchema.parse(body);

    const firm = await prisma.firm.create({
      data: validatedData,
    });

    return NextResponse.json(firm, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Geçersiz veri', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Firma oluşturulamadı:', error);
    return NextResponse.json(
      { error: 'Firma oluşturulamadı' },
      { status: 500 }
    );
  }
} 