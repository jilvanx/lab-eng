"use client";

import React from "react";

import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Loading } from "@/components/Loading";
import { PanelError } from "@/components/PanelError";
import { useDelete, useGet } from "@/hooks/useApi";
import { Customer } from "@/models";

const CustomersPage = () => {
  const router = useRouter();
  const { data, error, isLoading } = useGet<Customer[]>("/api/customers");
  const deleteCustomer = useDelete();

  const handleDelete = (id: string) => {
    deleteCustomer.mutate({ url: "/api/customers", id });
  };

  if (error) return <PanelError message={error.message} />;
  if (isLoading || deleteCustomer.status === "pending") return <Loading />;

  return (
    <div className="space-y-5">
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Cliente</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data &&
            data.map((customer) => (
              <Table.Row key={customer.id}>
                <Table.RowHeaderCell>{customer.name}</Table.RowHeaderCell>
                <Table.Cell>
                  <div className="space-x-2">
                    <Button
                      color="green"
                      onClick={() =>
                        router.push(`/pages/customers/${customer.id}`)
                      }
                    >
                      Editar
                    </Button>
                    <Button
                      color="red"
                      onClick={() => handleDelete(String(customer.id))}
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
        <Link href="/pages/customers/new">Novo Cliente</Link>
      </Button>
    </div>
  );
};

export default CustomersPage;
