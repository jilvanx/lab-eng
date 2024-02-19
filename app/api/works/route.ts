import { NextRequest, NextResponse } from "next/server";

import { createWorkSchema } from "@/schemas";
import prisma from "@prisma_dir/client";

export async function GET() {
  const listWork = await prisma.work.findMany({
    include: {
      customer: true,
    },
  });

  return NextResponse.json(listWork, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = createWorkSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newWork = await prisma.work.create({
    data: {
      name: body.name,
      customerId: Number(body.customerId),
    },
  });

  return NextResponse.json(newWork, { status: 201 });
}
