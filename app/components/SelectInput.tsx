import React, { forwardRef } from "react";

import { Select } from "@radix-ui/themes";
import { de } from "date-fns/locale";
import {
  Control,
  FieldPath,
  FieldValue,
  FieldValues,
  useController,
} from "react-hook-form";

import { Spinner } from "./Spinner";

interface SelectInputProps<T extends FieldValues, K> {
  control: Control<FieldValue<T>>;
  name: FieldPath<T>;
  isLoading?: boolean;
  placeholder?: string;
  data: K[];
  defaultValue?: string;
}

type ItemType = {
  id: number;
  name: string;
};

export const SelectInput = forwardRef<
  HTMLDivElement,
  SelectInputProps<FieldValues, unknown>
>(({ placeholder, isLoading, data, control, name, defaultValue }, ref) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <Select.Root
      value={field.value || defaultValue}
      onValueChange={field.onChange}
    >
      <Select.Trigger placeholder={placeholder} className="w-full" />
      <Select.Content ref={ref} position="popper">
        {isLoading && <Spinner />}
        {data.map((item) => (
          <Select.Item
            key={(item as ItemType).id}
            value={(item as ItemType).id + ""}
          >
            {(item as ItemType).name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
});
SelectInput.displayName = "SelectInput";
