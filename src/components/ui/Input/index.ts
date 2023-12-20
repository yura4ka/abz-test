import { InputHTMLAttributes } from "react";

export type InputProps = {
  label: string;
  isError: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export * from "./FileInput";
export * from "./Input";
