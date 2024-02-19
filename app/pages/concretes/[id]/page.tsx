"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import { Button, TextField } from "@radix-ui/themes";
import { formatDate, parseISO } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { InputMask } from "@/components/InputMask";
import { Loading } from "@/components/Loading";
import { PanelError } from "@/components/PanelError";
import { SelectInput } from "@/components/SelectInput";
import { Spinner } from "@/components/Spinner";
import { useGet, usePost } from "@/hooks/useApi";
import { Concrete, Work } from "@/models";
import { createConcreteSchema } from "@/schemas";

type ConcreteForm = z.infer<typeof createConcreteSchema>;

const NewConcretePage = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    mutateAsync: createConcrete,
    error,
    status,
  } = usePost<ConcreteForm>();
  const {
    data: works,
    error: errorWork,
    isLoading: isLoadingWorks,
  } = useGet<Work[]>("/api/works");
  const {
    data: concrete,
    error: errorConcrete,
    isLoading: isLoadingConcrete,
  } = useGet<Concrete>(`/api/concretes/${id}`);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ConcreteForm>({
    resolver: zodResolver(createConcreteSchema),
    mode: "all",
    criteriaMode: "all",
  });

  const onSubmit = handleSubmit(async (data) => {
    await createConcrete({ url: "/api/concretes", data }).then((_resp) => {
      router.push("/pages/concretes");
    });
  });

  useEffect(() => {
    if (id !== "new" && concrete) {
      setValue("workId", concrete.workId.toString());
      setValue(
        "moldingDate",
        formatDate(parseISO(concrete.moldingDate), "dd/MM/yyyy")
      );
      setValue("invoice", concrete.invoice);
      setValue("qtd_cp", concrete.qtd_cp);
      setValue("fck", concrete.fck);
      setValue("slump", concrete.slump);
      setValue("piece", concrete.piece);
    }
  }, [concrete, id, setValue]);

  if (isLoadingConcrete || status === "pending") return <Loading />;

  if (error) return <PanelError message={error.message} />;
  if (errorWork) return <PanelError message={errorWork.message} />;
  if (errorConcrete) return <PanelError message={errorConcrete.message} />;

  return (
    <>
      <Form.Root className="max-w-xl" onSubmit={onSubmit}>
        <Form.Field className="grid mb-[10px]" name="workId">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[13px] ">Selecione a obra</Form.Label>
            {errors.workId?.message && (
              <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                {errors.workId?.message}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <SelectInput
              control={control}
              name="workId"
              isLoading={isLoadingWorks}
              placeholder="Selecione a obra"
              data={works ?? []}
              defaultValue={concrete && concrete?.workId.toString()}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="grid mb-[10px]" name="moldingDate">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[13px] ">Data da moldagem</Form.Label>
            {errors.moldingDate?.message && (
              <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                {errors.moldingDate?.message}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <InputMask
              name="moldingDate"
              placeholder="Data da Moldagem"
              control={control}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="grid mb-[10px]" name="invoice">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[13px] ">Nota Fiscal</Form.Label>
            {errors.invoice?.message && (
              <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                {errors.invoice?.message}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <TextField.Input
              placeholder="Nota Fiscal"
              {...register("invoice")}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="grid mb-[10px]" name="qtd_cp">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[13px] ">Qtd. CP</Form.Label>
            {errors.qtd_cp?.message && (
              <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                {errors.qtd_cp?.message}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <TextField.Input
              type="number"
              placeholder="Qtd. CP"
              {...register("qtd_cp")}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="grid mb-[10px]" name="fck">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[13px] ">FCK</Form.Label>
            {errors.fck?.message && (
              <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                {errors.fck?.message}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <TextField.Input
              type="number"
              placeholder="FCK"
              {...register("fck")}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="grid mb-[10px]" name="slump">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[13px] ">Slump</Form.Label>
            {errors.slump?.message && (
              <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                {errors.slump?.message}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <TextField.Input
              type="number"
              placeholder="Slump"
              {...register("slump")}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="grid mb-[10px]" name="piece">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[13px] ">Peça</Form.Label>
            {errors.piece?.message && (
              <Form.Message className="text-[13px] opacity-[0.8] text-red-700">
                {errors.piece?.message}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <TextField.Input placeholder="Peça" {...register("piece")} />
          </Form.Control>
        </Form.Field>

        <Button disabled={isSubmitting}>
          Salvar {isSubmitting && <Spinner />}
        </Button>
      </Form.Root>
    </>
  );
};

export default NewConcretePage;
