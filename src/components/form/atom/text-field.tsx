import { useFieldContext } from "@/hooks/form-context";
import { Input } from "../../../components/ui/input";
import { useStore } from "@tanstack/react-form";

interface TextFieldProps {
  label: string;
  placeholder: string;
}

export default function TextField({ label, placeholder }: TextFieldProps) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <label>
        <div>{label}</div>
        <Input
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          placeholder={placeholder}
        />
      </label>
      {errors.map((error: string) => (
        <div key={error} style={{ color: "red" }}>
          {error}
        </div>
      ))}
    </div>
  );
}
