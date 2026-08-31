import { Form, router } from "@inertiajs/react";
import { Ellipsis, Pencil, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import type { Subject } from "@/types/subject";
import { useRoute } from "ziggy-js";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";



export const SubjectTable = ({ subjects }: { subjects: Subject[] }) => {
    const route = useRoute();
    const [activeId, setActiveId] = useState<number | null>(null);
    const [edit, setEdit] = useState<number>(0);

    const handleEdit = (id: number) => {
        setEdit(id);
        setActiveId(null);
    }
    const resetEdit = () => {
        setEdit(0);
    }

    const handleCancel = () => setEdit(0);

    const handleToggle = (id: number) => {
        setActiveId(activeId === id ? null : id);
    }

    const handleDelete = (id: number) => {
        if (confirm(`Are you sure to delete this subject`)) {
            router.delete(route('subject.destroy', id));
        }
    }

    return (<Form
        method="put"
        action={route('subject.update', edit)}
        onSuccess={resetEdit}
        >{({ errors }) => (<Table>
            {/* <TableCaption>A list of subjects</TableCaption> */}
            <TableHeader>
                <TableRow
                    className="font-bold text-lg bg-emerald-500 dark:bg-emerald-900
                    dark:hover:bg-emerald-900"
                >
                    <TableHead>Name</TableHead>
                    <TableHead className="text-center">Description</TableHead>
                    <TableHead className="text-center">Coefficient</TableHead>
                    <TableHead
                        className="text-right"
                    >
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                    {subjects.map(subject => <TableRow
                        key={subject.id}
                        className="font-semibold text-sm group"
                    >
                        {edit === subject.id ?
                        
                            <>
                                <TableCell>
                                    <Input
                                        type="text"
                                        name="name"
                                        defaultValue={subject.name}
                                    />
                                    {errors.name && <span
                                        className="text-xs text-red-500"
                                    >
                                        {errors.name}
                                    </span>}
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        name="weight"
                                        defaultValue={subject.weight}
                                    />
                                    {errors.coefficient && <span
                                        className="text-xs text-red-500"
                                    >
                                        {errors.coefficient}
                                    </span>}
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="text"
                                        name="desc"
                                        defaultValue={subject.desc}
                                    />
                                    {errors.desc && <span
                                        className="text-xs text-red-500"
                                    >
                                        {errors.desc}
                                    </span>}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={handleCancel}
                                        variant={'secondary'}
                                    >
                                        <X />
                                    </Button>
                                    <Button
                                        type="submit"
                                    >
                                        <Save />
                                    </Button>
                                </TableCell>
                            </>
                       
                            :
                            <>
                                <TableCell>{subject.name}</TableCell>
                                <TableCell className="text-center">{subject.weight}</TableCell>
                                <TableCell className="text-center">{subject.desc}</TableCell>
                                <TableCell
                                    className="relative flex justify-end gap-2 items-center text-right"
                                >
                                    {activeId === subject.id && <div
                                        className="absolute right-12 flex gap-2"
                                    >
                                        <Button
                                            type="button"
                                            onClick={() => handleEdit(subject.id)}
                                        >
                                            <Pencil />
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={()=>handleDelete(subject.id)}
                                            className="bg-red-200 hover:bg-red-300 transition"
                                        >
                                            <Trash2
                                                className="text-red-500 "
                                            />
                                        </Button>
                                    </div>}
                                    <Button
                                        variant={"ghost"}
                                        onClick={() => handleToggle(subject.id)}
                                        className="flex items-center justify-center"
                                    >
                                        <Ellipsis />
                                    </Button>
                                </TableCell>
                            </>
                        }
                    </TableRow>)}
                </TableBody >
            </Table>)
            }
        </Form >
    )
}