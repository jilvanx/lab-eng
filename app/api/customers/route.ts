import { NextRequest, NextResponse } from "next/server";

import { createCustomerSchema } from "@/schemas";
import prisma from "@prisma_dir/client";

export async function GET() {
  const listCustomers = await prisma.customer.findMany();

  return NextResponse.json(listCustomers, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = createCustomerSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newCustomer = await prisma.customer.create({
    data: {
      name: body.name,
    },
  });

  return NextResponse.json(newCustomer, { status: 201 });
}
