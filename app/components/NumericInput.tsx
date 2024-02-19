import React from "react";

import { TextField } from "@radix-ui/themes";
import { Control, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

type NumericInputProps = {
  name: string;
  placeholder: string;
  control: Control<any>;
  disabled?: boolean;
};

function NumericInput({
  name,
  placeholder,
  control,
  disabled,
}: NumericInputProps) {
  return (
    <TextField.Root>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field: { ref, value, onChange } }) => (
          <NumericFormat
            disabled={disabled}
            placeholder={placeholder}
            getInputRef={ref}
            decimalSeparator=","
            fixedDecimalScale
            decimalScale={2}
            value={value}
            customInput={TextField.Input}
            onValueChange={(e) => onChange(e.floatValue ?? null)}
          />
        )}
      />
    </TextField.Root>
  );
}

export default NumericInput;
