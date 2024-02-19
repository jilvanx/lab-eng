"use client";

import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import { Button, TextField } from "@radix-ui/themes";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PanelError } from "@/components/PanelError";
import { Spinner } from "@/components/Spinner";
import { useGet, usePost, usePut } from "@/hooks/useApi";
import { Customer } from "@/models";
import { createCustomerSchema } from "@/schemas";

type CustomerForm = z.infer<typeof createCustomerSchema>;

const NewCustomerPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    mutateAsync: createCustomer,
    error,
    status,
  } = usePost<CustomerForm>();

  const {
    mutateAsync: updateCustomer,
    error: errorUpdate,
    status: statusUpdate,
  } = usePut<CustomerForm>();

  const { data: getCustomer } = useGet<Customer>(`/api/customers/${id}`);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CustomerForm>({
    resolver: zodResolver(createCustomerSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    id === "new"
      ? await createCustomer({ url: "/api/customers", data })
      : await updateCustomer({ url: `/api/customers/${id}`, data });

    router.push("/pages/customers");
  });

  useEffect(() => {
    if (id !== "new" && getCustomer?.name) {
      setValue("name", getCustomer?.name);
    }
  }, [getCustomer?.name, id, setValue]);

  const isLoading = status === "pending" || statusUpdate === "pending";

  if (error) return <PanelError message={error.message} />;
  if (errorUpdate) return <PanelError message={errorUpdate.message} />;

  return (
    <Form.Root className="max-w-xl" onSubmit={onSubmit}>
      <Form.Field className="grid mb-[10px]" name="name">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[13px] ">Nome do Cliente</Form.Label>
          {errors.name?.message && (
            <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
              {errors.name?.message}
            </Form.Message>
          )}
        </div>
        <Form.Control asChild>
          <TextField.Input
            placeholder="Nome do Cliente"
            {...register("name")}
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <Button disabled={isLoading || !!error}>
          Salvar {isLoading && <Spinner />}
        </Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default NewCustomerPage;
