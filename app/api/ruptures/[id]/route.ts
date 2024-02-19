import { NextRequest, NextResponse } from "next/server";

import prisma from "@prisma_dir/client";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { id } = params;

  const editRupture = await prisma.rupture.update({
    where: {
      id: Number(id),
    },
    data: {
      ...body,
      concreteId: Number(body.concreteId),
    },
  });

  return NextResponse.json(editRupture, { status: 200 });
}
