"use client";

import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import { Button, Select, TextField } from "@radix-ui/themes";
import { useParams, useRouter } from "next/navigation";
import { Control, Controller, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

import { Loading } from "@/components/Loading";
import { PanelError } from "@/components/PanelError";
import { SelectInput } from "@/components/SelectInput";
import { Spinner } from "@/components/Spinner";
import { useGet, usePost, usePut } from "@/hooks/useApi";
import { Customer, Work } from "@/models";
import { createWorkSchema } from "@/schemas";

type WorkForm = z.infer<typeof createWorkSchema>;

const NewWorkPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    mutateAsync: createWork,
    error: errorWork,
    status,
  } = usePost<WorkForm>();
  const {
    mutateAsync: updateWork,
    error: errorUpdate,
    status: statusUpdate,
  } = usePut<WorkForm>();
  const {
    data: customers,
    error,
    isLoading: isLoadingCustomers,
  } = useGet<Customer[]>("/api/customers");
  const { data: work, isLoading: isLoadingWork } = useGet<Work>(
    `/api/works/${id}`
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<WorkForm>({
    resolver: zodResolver(createWorkSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    id === "new"
      ? await createWork({ url: "/api/works", data })
      : await updateWork({ url: `/api/works/${id}`, data });

    router.push("/pages/works");
  });

  useEffect(() => {
    if (id !== "new" && work) {
      setValue("customerId", work.customerId.toString());
      setValue("name", work.name);
    }
  }, [id, setValue, work]);

  if (isLoadingWork || statusUpdate === "pending") return <Loading />;

  if (error) return <PanelError message={error.message} />;
  if (errorWork) return <PanelError message={errorWork.message} />;
  if (errorUpdate) return <PanelError message={errorUpdate.message} />;

  return (
    <>
      <Form.Root className="max-w-xl" onSubmit={onSubmit}>
        <Form.Field className="grid mb-[10px]" name="customerId">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[13px] ">
              Selecione um cliente
            </Form.Label>
            {errors.customerId?.message && (
              <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                {errors.customerId?.message}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <SelectInput
              control={control}
              name="customerId"
              isLoading={isLoadingCustomers}
              placeholder="Selecione um cliente"
              data={customers ?? []}
              defaultValue={work && work.customerId.toString()}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="grid mb-[10px]" name="name">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[13px] ">Nome da Obra</Form.Label>
            {errors.name?.message && (
              <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                {errors.name?.message}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <TextField.Input placeholder="Nome da obra" {...register("name")} />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <Button disabled={status === "pending" || !!error}>
            Salvar {status === "pending" && <Spinner />}
          </Button>
        </Form.Submit>
      </Form.Root>
    </>
  );
};

export default NewWorkPage;
