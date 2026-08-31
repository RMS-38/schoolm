import { usePage } from "@inertiajs/react"
import type { Grade } from "@/types/grade";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../ui/select"

export const SelectGrade = ({grade_id}:{grade_id?:number}) => {
    const { grades } = usePage<{ grades: Grade[] }>().props;
    const items = grades.map(g => ({ label: g.name, value: g.id }));

    return (
        <Select name="grade_id" items={items} defaultValue={grade_id?grade_id :undefined}>
            <SelectTrigger>
                <SelectValue placeholder="Select Grade"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {items.map((item) => (
                        <SelectItem  key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}