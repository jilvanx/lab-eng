import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useGet, usePost, usePut } from "@/hooks/useApi";
import { Rupture } from "@/models";
import { createRuptureSchema } from "@/schemas";

import { Spinner } from "./Spinner";

type RuptureForm = z.infer<typeof createRuptureSchema>;

type RuptureDialogProps = {
  concreteId: number;
  piece: string;
};

export const RuptureDialog = ({ concreteId, piece }: RuptureDialogProps) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { data: getRupture } = useGet<Rupture>(
    `/api/ruptures/concretes/${concreteId}`
  );
  const { mutateAsync: createRupture } = usePost<RuptureForm>();
  const { mutateAsync: updateRupture } = usePut<RuptureForm>();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RuptureForm>({
    resolver: zodResolver(createRuptureSchema),
    mode: "all",
    criteriaMode: "all",
  });

  const [tf14h1, tf14h2, tf7d1, tf7d2, tf28d1, tf28d2, tf63d] = watch([
    "tf14h1",
    "tf14h2",
    "tf7d1",
    "tf7d2",
    "tf28d1",
    "tf28d2",
    "tf63d",
  ]);

  const onSubmit = handleSubmit(async (data) => {
    getRupture
      ? await updateRupture({ url: `/api/ruptures/${getRupture.id}`, data })
      : await createRupture({ url: "/api/ruptures", data });

    setOpen(false);
  });

  const transformToMPA = (tf: number) => {
    return +((tf * 100 * 0.981) / 78.54).toFixed(2);
  };

  useEffect(() => {
    tf14h1 && setValue("mpa14h1", transformToMPA(tf14h1));
    tf14h2 && setValue("mpa14h2", transformToMPA(tf14h2));
    tf7d1 && setValue("mpa7d1", transformToMPA(tf7d1));
    tf7d2 && setValue("mpa7d2", transformToMPA(tf7d2));
    tf28d1 && setValue("mpa28d1", transformToMPA(tf28d1));
    tf28d2 && setValue("mpa28d2", transformToMPA(tf28d2));
    tf63d && setValue("mpa63d", transformToMPA(tf63d));
  }, [setValue, tf14h1, tf14h2, tf28d1, tf28d2, tf63d, tf7d1, tf7d2]);

  useEffect(() => {
    setValue("concreteId", concreteId.toString());
  }, [concreteId, setValue]);

  useEffect(() => {
    if (getRupture) {
      setValue("tf14h1", getRupture.tf14h1);
      setValue("tf14h2", getRupture.tf14h2);
      setValue("tf7d1", getRupture.tf7d1);
      setValue("tf7d2", getRupture.tf7d2);
      setValue("tf28d1", getRupture.tf28d1);
      setValue("tf28d2", getRupture.tf28d2);
      setValue("tf63d", getRupture.tf63d);
      setValue("mpa14h1", getRupture.mpa14h1);
      setValue("mpa14h2", getRupture.mpa14h2);
      setValue("mpa7d1", getRupture.mpa7d1);
      setValue("mpa7d2", getRupture.mpa7d2);
      setValue("mpa28d1", getRupture.mpa28d1);
      setValue("mpa28d2", getRupture.mpa28d2);
      setValue("mpa63d", getRupture.mpa63d);
    }
  }, [getRupture, setValue]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button color="blue">Rupturas</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/80 fixed inset-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white shadow shadow-black/25 text-zinc-900 p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-5 text-md">
            <Dialog.Title className="text-xl font-medium">
              Inserir Rupturas - {piece}
            </Dialog.Title>
            <Dialog.Close
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close"
            >
              <Cross2Icon className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <Form.Root className="max-w-xl" onSubmit={onSubmit}>
            <div className="flex justify-between">
              <div>
                <Form.Field className="grid mb-[10px]" name="tf14h1">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[13px] ">TF 14h</Form.Label>
                    {errors.tf14h1?.message && (
                      <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                        {errors.tf14h1?.message}
                      </Form.Message>
                    )}
                  </div>
                  <Form.Control asChild>
                    <TextField.Input
                      placeholder="TF 14h"
                      {...register("tf14h1")}
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field className="grid mb-[10px]" name="tf14h2">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[13px] ">TF 14h</Form.Label>
                    {errors.tf14h2?.message && (
                      <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                        {errors.tf14h2?.message}
                      </Form.Message>
                    )}
                  </div>
                  <Form.Control asChild>
                    <TextField.Input
                      placeholder="TF 14h"
                      {...register("tf14h2")}
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field className="grid mb-[10px]" name="tf7d1">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[13px] ">TF 7d</Form.Label>
                    {errors.tf7d1?.message && (
                      <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                        {errors.tf7d1?.message}
                      </Form.Message>
                    )}
                  </div>
                  <Form.Control asChild>
                    <TextField.Input
                      placeholder="TF 7d"
                      {...register("tf7d1")}
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field className="grid mb-[10px]" name="tf7d2">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[13px] ">TF 7d</Form.Label>
                    {errors.tf7d2?.message && (
                      <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                        {errors.tf7d2?.message}
                      </Form.Message>
                    )}
                  </div>
                  <Form.Control asChild>
                    <TextField.Input
                      placeholder="TF 7d"
                      {...register("tf7d2")}
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field className="grid mb-[10px]" name="tf28d1">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[13px] ">TF 28d</Form.Label>
                    {errors.tf28d1?.message && (
                      <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                        {errors.tf28d1?.message}
                      </Form.Message>
                    )}
                  </div>
                  <Form.Control asChild>
                    <TextField.Input
                      placeholder="TF 28d"
                      {...register("tf28d1")}
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field className="grid mb-[10px]" name="tf28d2">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[13px] ">TF 28d</Form.Label>
                    {errors.tf28d2?.message && (
                      <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                        {errors.tf28d2?.message}
                      </Form.Message>
                    )}
                  </div>
                  <Form.Control asChild>
                    <TextField.Input
                      placeholder="TF 28d"
                      {...register("tf28d2")}
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field className="grid mb-[10px]" name="tf63d">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[13px] ">TF 63d</Form.Label>
                    {errors.tf63d?.message && (
                      <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                        {errors.tf63d?.message}
                      </Form.Message>
                    )}
                  </div>
                  <Form.Control asChild>
                    <TextField.Input
                      placeholder="TF 63d"
                      {...register("tf63d")}
                    />
                  </Form.Control>
                </Form.Field>
              </div>

              <div>
                <Form.Field className="grid mb-[10px]" name="mpa14h1">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[13px] ">MPA 14h</Form.Label>
                    {errors.mpa14h1?.message && (
                      <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                        {errors.mpa14h1?.message}
                      </Form.Message>
                    )}
                  </div>
                  <Form.Control asChild>
                    <TextField.Input
                      placeholder="MPA 14h"
                      {...register("mpa14h1")}
                      disabled
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field className="grid mb-[10px]" name="mpa14h2">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[13px] ">MPA 14h</Form.Label>
                    {errors.mpa14h2?.message && (
                      <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                        {errors.mpa14h2?.message}
                      </Form.Message>
                    )}
                  </div>
                  <Form.Control asChild>
                    <TextField.Input
                      placeholder="MPA 14h"
                      {...register("mpa14h2")}
                      disabled
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field className="grid mb-[10px]" name="mpa7d1">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[13px] ">MPA 7d</Form.Label>
                    {errors.mpa7d1?.message && (
                      <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                        {errors.mpa7d1?.message}
                      </Form.Message>
                    )}
                  </div>
                  <Form.Control asChild>
                    <TextField.Input
                      placeholder="MPA 7d"
                      {...register("mpa7d1")}
                      disabled
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field className="grid mb-[10px]" name="mpa7d2">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[13px] ">MPA 7d</Form.Label>
                    {errors.mpa7d2?.message && (
                      <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                        {errors.mpa7d2?.message}
                      </Form.Message>
                    )}
                  </div>
                  <Form.Control asChild>
                    <TextField.Input
                      placeholder="MPA 7d"
                      {...register("mpa7d2")}
                      disabled
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field className="grid mb-[10px]" name="mpa28d1">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[13px] ">MPA 28d</Form.Label>
                    {errors.mpa28d1?.message && (
                      <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                        {errors.mpa28d1?.message}
                      </Form.Message>
                    )}
                  </div>
                  <Form.Control asChild>
                    <TextField.Input
                      placeholder="MPA 28d"
                      {...register("mpa28d1")}
                      disabled
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field className="grid mb-[10px]" name="mpa28d2">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[13px] ">MPA 28d</Form.Label>
                    {errors.mpa28d2?.message && (
                      <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                        {errors.mpa28d2?.message}
                      </Form.Message>
                    )}
                  </div>
                  <Form.Control asChild>
                    <TextField.Input
                      placeholder="MPA 28d"
                      {...register("mpa28d2")}
                      disabled
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field className="grid mb-[10px]" name="mpa63d">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[13px] ">MPA 63d</Form.Label>
                    {errors.mpa63d?.message && (
                      <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                        {errors.mpa63d?.message}
                      </Form.Message>
                    )}
                  </div>
                  <Form.Control asChild>
                    <TextField.Input
                      placeholder="MPA 63d"
                      {...register("mpa63d")}
                      disabled
                    />
                  </Form.Control>
                </Form.Field>
              </div>
            </div>

            <div className="mt-8 space-x-6 text-right">
              <Dialog.Close className="text-gray-500 hover:text-gray-600 px-4 py-3 text-sm rounded font-medium">
                Cancelar
              </Dialog.Close>
              <button
                disabled={isSubmitting}
                className="bg-green-500 hover:bg-green-600 px-4 py-3 text-sm text-white rounded font-medium"
              >
                Salvar {isSubmitting && <Spinner />}
              </button>
            </div>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
