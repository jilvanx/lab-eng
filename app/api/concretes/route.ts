import { format, parse } from "date-fns";
import { enGB } from "date-fns/locale";
import { NextRequest, NextResponse } from "next/server";

import { createConcreteSchema } from "@/schemas";
import prisma from "@prisma_dir/client";

export async function GET() {
  const listConcretes = await prisma.concrete.findMany({
    include: {
      work: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json(listConcretes, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = createConcreteSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  if (body.moldingDate) {
    const parsedDate = parse(body.moldingDate, "P", new Date(), {
      locale: enGB,
    });

    const date = format(parsedDate, "yyyy-MM-dd");
    body.moldingDate = new Date(date);
  }

  const newConcrete = await prisma.concrete.create({
    data: {
      moldingDate: body.moldingDate,
      invoice: body.invoice,
      qtd_cp: body.qtd_cp,
      fck: body.fck,
      slump: body.slump,
      piece: body.piece,
      workId: Number(body.workId),
    },
  });

  return NextResponse.json(newConcrete, { status: 201 });
}
