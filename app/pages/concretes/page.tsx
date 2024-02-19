"use client";

import React from "react";

import { Button, Table } from "@radix-ui/themes";
import { formatDate, parseISO } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Loading } from "@/components/Loading";
import { PanelError } from "@/components/PanelError";
import { RuptureDialog } from "@/components/RuptureDialog";
import { useDelete, useGet } from "@/hooks/useApi";
import { Concrete } from "@/models";

const ConcretePage = () => {
  const router = useRouter();

  const { data, error, isLoading } = useGet<Concrete[]>("/api/concretes");
  const deleteConcrete = useDelete();

  const handleDelete = (id: string) => {
    deleteConcrete.mutate({ url: "/api/concretes", id });
  };

  if (error) return <PanelError message={error.message} />;
  if (isLoading || deleteConcrete.status === "pending") return <Loading />;

  return (
    <>
      <div className="space-y-5">
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Data da Moldagem</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Peça</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>NF</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>QT CP</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Obra</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>FCK</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Slump</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data &&
              data.map((concrete) => (
                <Table.Row key={concrete.id}>
                  <Table.RowHeaderCell>
                    {formatDate(parseISO(concrete.moldingDate), "dd/MM/yyyy")}
                  </Table.RowHeaderCell>
                  <Table.Cell>{concrete.piece}</Table.Cell>
                  <Table.Cell>{concrete.invoice}</Table.Cell>
                  <Table.Cell>{concrete.qtd_cp}</Table.Cell>
                  <Table.Cell>{concrete.work.name}</Table.Cell>
                  <Table.Cell>{concrete.fck}</Table.Cell>
                  <Table.Cell>{concrete.slump}</Table.Cell>
                  <Table.Cell>
                    <div className="space-x-2">
                      <RuptureDialog
                        concreteId={concrete.id}
                        piece={concrete.piece}
                      />

                      <Button
                        color="green"
                        onClick={() =>
                          router.push(`/pages/concretes/${concrete.id}`)
                        }
                      >
                        Editar
                      </Button>
                      <Button
                        color="red"
                        onClick={() => handleDelete(String(concrete.id))}
                      >
                        Delete
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>
        <Button>
          <Link href="/pages/concretes/new">Novo Registro</Link>
        </Button>
      </div>
    </>
  );
};

export default ConcretePage;
