import { useRoute } from "ziggy-js"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export const SelectTerm = ({name, onChange}:{name:string, onChange:(value:string)=>void}) => {
    const items = [
        { label: 'Year', value: '4' },
        { label: 'First term', value: '1' },
        {label: 'Second term', value: '2'},
        {label: 'Third term', value: '3'}
    ]
    const route = useRoute();
    const params = route().params
    
    return (
        <Select
            items={items}
            name={name} onValueChange={(value) => {
            onChange(value as string)
            }}
            defaultValue={params.term ?? items[1].value}
        >
            <SelectTrigger
                className="w-35"
            >
                <SelectValue placeholder="Term"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {
                        items.map(item => (
                            <SelectItem key={item.label} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}