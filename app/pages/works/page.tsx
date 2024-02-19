"use client";

import React, { useMemo, useState } from "react";

import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Loading } from "@/components/Loading";
import { PanelError } from "@/components/PanelError";
import { useDelete, useGet } from "@/hooks/useApi";
import { Work } from "@/models";

const WorksPage = () => {
  const router = useRouter();

  const { data, error, isLoading } = useGet<Work[]>("/api/works");
  const deleteWork = useDelete();

  const handleDelete = (id: string) => {
    deleteWork.mutate({ url: "/api/works", id });
  };

  if (error) return <PanelError message={error.message} />;
  if (isLoading || deleteWork.status === "pending") return <Loading />;

  return (
    <div className="space-y-5">
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Obra</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Cliente</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data &&
            data.map((work) => (
              <Table.Row key={work.id}>
                <Table.RowHeaderCell>{work.name}</Table.RowHeaderCell>
                <Table.Cell>{work.customer.name}</Table.Cell>
                <Table.Cell>
                  <div className="space-x-2">
                    <Button
                      color="green"
                      onClick={() => router.push(`/pages/works/${work.id}`)}
                    >
                      Editar
                    </Button>
                    <Button
                      color="red"
                      onClick={() => handleDelete(String(work.id))}
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
        <Link href="/pages/works/new">Nova Obra</Link>
      </Button>
    </div>
  );
};

export default WorksPage;
