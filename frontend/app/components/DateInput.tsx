"use client";

import { useController, UseControllerProps } from "react-hook-form";
import DatePicker, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

type Props = {
    label: string;
    type?: string;
} & UseControllerProps & DatePickerProps;

export default function DateInput(props: Props) {
    const {
        field,
        fieldState: { error },
    } = useController(props);

    return (
        <div className="mb-3">
            <DatePicker
                {...field}
                {...props}
                selected={field.value}
                placeholderText={props.label}
                className={clsx(
                    "w-full px-3 py-2 rounded-md border text-sm transition-colors",

                    "focus:outline-none focus:ring-2",

                    !error && field.value && "bg-green-50",

                    error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-white"
                        : "border-gray-300 focus:border-green-500 focus:ring-green-500"
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
