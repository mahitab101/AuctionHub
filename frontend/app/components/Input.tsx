"use client";

import { UseControllerProps, useController } from "react-hook-form";
import clsx from "clsx";

type Props = {
  label: string;
  type?: string;
  showLabel?: boolean;
} & UseControllerProps;

export default function Input(props: Props) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <div className="mb-3">
      {props.showLabel && (
        <label className="block mb-1 text-sm font-medium capitalize">
          {props.label}
        </label>
      )}

      <input
        {...field}
        {...props}
        type={props.type ?? "text"}
        value={field.value || ""}
        placeholder={props.label}
        className={clsx(
          "w-full px-3 py-2 rounded-md border text-sm transition-colors",

          // base focus reset
          "focus:outline-none focus:ring-2",

          // filled state (only when no error)
          !error && "not-placeholder-shown:bg-green-50",

          // error styles ALWAYS win
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50"
            : "border-gray-300 focus:border-green-500 focus:ring-green-500",

          "placeholder:capitalize"
        )}
      />


      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}
