import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Önce firmaya ait çağrıları sil
    await prisma.call.deleteMany({
      where: { firmId: id },
    });

    // Sonra firmayı sil
    await prisma.firm.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Firma başarıyla silindi' });
  } catch (error) {
    console.error('Firma silinemedi:', error);
    return NextResponse.json(
      { error: 'Firma silinemedi' },
      { status: 500 }
    );
  }
} 