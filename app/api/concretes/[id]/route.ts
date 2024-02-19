import { NextRequest, NextResponse } from "next/server";

import prisma from "@prisma_dir/client";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const concrete = await prisma.concrete.findFirst({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(concrete, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { id } = params;

  const concrete = await prisma.concrete.update({
    where: {
      id: Number(id),
    },
    data: {
      ...body,
      workId: Number(body.workId),
    },
  });

  return NextResponse.json(concrete, { status: 200 });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const deletedConcrete = await prisma.concrete.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(deletedConcrete, { status: 200 });
}
