import { lazy } from "react";
import { fieldContext, formContext, useFormContext } from "./form-context";
import { createFormHook } from "@tanstack/react-form";

const TextField = lazy(() => import("@/components/form/atom/text-field"));

function SubscribeButton({label}:{label:string}){
  const form=useFormContext()
  return(
    <form.Subscribe selector={(state) => state.isSubmitting}>
    {(isSubmitting) => <button disabled={isSubmitting}>{label}</button>}
  </form.Subscribe>
  )
}

export const { useAppForm, withForm } = createFormHook({
    fieldComponents: {
      TextField,
    },
    formComponents: {
      SubscribeButton,
    },
    fieldContext,
    formContext,
  })