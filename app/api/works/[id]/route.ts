import { NextRequest, NextResponse } from "next/server";

import prisma from "@prisma_dir/client";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const work = await prisma.work.findFirst({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(work, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { id } = params;

  const work = await prisma.work.update({
    where: {
      id: Number(id),
    },
    data: {
      ...body,
      customerId: Number(body.customerId),
    },
  });

  return NextResponse.json(work, { status: 200 });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const deletedWork = await prisma.work.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(deletedWork, { status: 200 });
}
