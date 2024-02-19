import { NextRequest, NextResponse } from "next/server";

import prisma from "@prisma_dir/client";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const rupture = await prisma.rupture.findFirst({
    where: {
      concreteId: Number(id),
    },
  });

  return NextResponse.json(rupture, { status: 200 });
}
