import { NextRequest, NextResponse } from "next/server";

import prisma from "@prisma_dir/client";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const customer = await prisma.customer.findFirst({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(customer, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { id } = params;

  const customer = await prisma.customer.update({
    where: {
      id: Number(id),
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(customer, { status: 200 });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const deletedCustomer = await prisma.customer.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(deletedCustomer, { status: 200 });
}
