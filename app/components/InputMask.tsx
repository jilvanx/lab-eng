"use client";

import React, { forwardRef } from "react";

import { TextField } from "@radix-ui/themes";
import {
  Control,
  FieldValue,
  FieldValues,
  useController,
} from "react-hook-form";

interface InputMaskProps<T extends FieldValues> {
  name: string;
  placeholder: string;
  control: Control<FieldValue<T>>;
}

export const InputMask = forwardRef<null, InputMaskProps<FieldValues>>(
  ({ placeholder, control, name }, ref) => {
    const { field } = useController({
      name,
      control,
    });

    // const dateFormat = (value: string) => {
    //   const dateValue = value
    //     .replace(/\D/g, "")
    //     .match(/(\d{0,2})(\d{0,2})(\d{0,4})/);

    //   const dateValueFormatted =
    //     dateValue && !dateValue[2]
    //       ? dateValue[1]
    //       : `${dateValue && dateValue[1]}/${dateValue && dateValue[2]}${`${
    //           dateValue && dateValue[3] ? `/${dateValue[3]}` : ""
    //         }`}`;

    //   return dateValueFormatted;
    // };

    const maskDate = (value: string) => {
      const numericValue = value.replace(/\D/g, "");
      const day = numericValue.slice(0, 2);
      const month = numericValue.slice(2, 4);
      const year = numericValue.slice(4, 8);

      if (numericValue.length <= 2) {
        return day;
      }

      if (numericValue.length <= 4) {
        return `${day}/${month}`;
      }

      return `${day}/${month}/${year}`;
    };

    return (
      <TextField.Root>
        <TextField.Input
          ref={ref}
          name={name}
          placeholder={placeholder}
          value={field.value ?? ""}
          onChange={(evt) => {
            const dateValue = maskDate(evt.target.value);
            field.onChange(dateValue);
          }}
        />
      </TextField.Root>
    );
  }
);

InputMask.displayName = "InputMask";
