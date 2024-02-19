import { NextRequest, NextResponse } from "next/server";

import { createRuptureSchema } from "@/schemas";
import prisma from "@prisma_dir/client";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = createRuptureSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newRupture = await prisma.rupture.create({
    data: {
      ...body,
      concreteId: Number(body.concreteId),
    },
  });

  return NextResponse.json({}, { status: 201 });
}
