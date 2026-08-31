import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export const InputField = (
    {
        type = "text",
        label,
        name,
        placeholder,
        value,
        onChange,
        defaultValue,
        error,
        disabled=false
    }:{
        type?: string,
        label:string
        name: string,
        placeholder?: string,
        value?: string|number,
        onChange?: (e:any)=>void
        defaultValue?: string
        error?:string,
        disabled?:boolean
    }) => {
    return (
        <div className="mt-3 space-y-3">
            <Label
                htmlFor={name}
                className="font-medium font-sans text-emerald-700"
            >{ label}</Label>
            <Input
                type={type}
                placeholder={placeholder}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                defaultValue={defaultValue}
                className="w-full border border-emerald-300  outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            />
            {error && <span
                className="text-xs text-red-500"
            >
                {error}
            </span>}
        </div>
    )
}