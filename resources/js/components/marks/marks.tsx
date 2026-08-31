import { Form, Link,  } from "@inertiajs/react";
import { Save, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Report, Reports, ReportYears } from "@/types/report";
import type { Subject } from "@/types/subject"
import {  useRoute } from "ziggy-js";
import { SelectTerm } from "../select-term";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"



interface Props{
    subjects: Subject[];
    reports: Reports;
    yearReport: ReportYears
    onTermChange: (value: string) => void
    grade_id: number
}
export const Marks = ({ subjects, reports,yearReport, onTermChange, grade_id }: Props) => {
    const route = useRoute();
     const params = route().params
    const [editId, setEditId] = useState(0);
    const [edit, setEdit] = useState(false);

    const openEdit = (id: number) => {
        setEditId(id);
        setEdit(true);
    }

    const cancel = () => {
        setEditId(0);
        setEdit(false);
    }

    const closeEdit = () => {
        setEdit(false);
        setEditId(0);
    }

    const findMark = (report:Report,subject_id: number) => {
        return report.marks.find(m => m.subject_id === subject_id);
    }

    return (
        <div
            className="mt-2"
        >{params.term}
            <Form
                method="post"
                action={route('mark.store', editId)}
                setDefaultsOnSuccess
                onSuccess={closeEdit}
            >{({errors, clearErrors}) => (<>
                    <div
                        className="flex justify-between items-center"
                    >
                        <div>
                            <a href={
                                params.term === '4'
                                    ? route('year.pdf', grade_id)
                                    : route('marks.pdf', [grade_id,params.term??1])
                            }>pdf</a>
                            {Object.values(errors).map((e, i) => (
                                <p key={i}
                                    className="text-red-500 text-sm"
                                >
                                    {e}
                                </p>
                            ))}
                        </div>
                        <SelectTerm name="term" onChange={(value) => {
                            clearErrors();
                            onTermChange(value);
                        }} />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Id
                                </TableHead>
                                <TableHead>
                                    Full name
                                </TableHead>
                                {params.term === '4' ?
                                    (<>
                                        <TableHead>
                                            I
                                        </TableHead>
                                        <TableHead>
                                            II
                                        </TableHead>
                                        <TableHead>
                                            III
                                        </TableHead>
                                    </>)
                                    :subjects.map(subject => (
                                    <TableHead key={subject.id}>
                                        {subject.name}
                                        {edit && <p>{subject.weight}</p>}
                                    </TableHead>
                                ))}
                                {params.term!=="4"&&<TableHead>
                                    Total
                                </TableHead>}
                                <TableHead>
                                    Average
                                </TableHead>
                                <TableHead>
                                    Rank
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {params.term === '4'
                                ?
                                yearReport.data.map(r => (
                                    <TableRow
                                        key={r.id}
                                        className="relative"
                                    >
                                        <TableCell>
                                            {r.id}
                                            <Link
                                                href={route('mark.show',[r.id, params.term??1])}
                                            >
                                                <span className="absolute inset-0"></span>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {r.name}
                                        </TableCell>
                                        <TableCell>
                                            {r.terms[0]??'-'}
                                        </TableCell>
                                        <TableCell>
                                            {r.terms[1]??'-'}
                                        </TableCell>
                                        <TableCell>
                                            {r.terms[2]??'-'}
                                        </TableCell>
                                        <TableCell>
                                            {r.year_average}
                                        </TableCell>
                                        <TableCell>
                                            {r.rank}
                                        </TableCell>
                                    </TableRow>
                                ))
                                :
                                reports.data.map(r => (
                                <TableRow key={r.id}
                                    className="relative"
                                    onClick={() => {
                                        openEdit(r.id);
                                        clearErrors();
                                    }}
                                >
                                    <TableCell>
                                        {r.id}
                                    </TableCell>
                                        <TableCell
                                            className="relative"
                                        >
                                            {r.name}
                                            <Link
                                                href={route('mark.show', [r.id, params.term??1])}
                                                onClick={(e)=>e.stopPropagation()}
                                            >
                                                <span className="absolute inset-0"></span>
                                            </Link>
                                    </TableCell>
                                    {subjects.map(s => {
                                        const mark = findMark(r, s.id);

                                            return editId === r.id
                                                ? <TableCell key={s.id}
                                                    className="p-0 m-0"
                                                >
                                                    <input
                                                        type="number"
                                                        step="any"
                                                        name={`weights[${s.id}]`}
                                                        value={s.weight}
                                                        hidden
                                                    />
                                                    <input
                                                        type="number"
                                                        step="any"
                                                        name={`marks[${s.id}]`}
                                                        className={cn(`w-14 px-1 border`, { 'border-red-500 border rounded-sm': errors[`marks.${s.id}`] })}
                                                    />
                                                </TableCell>
                                                : <TableCell key={s.id}>
                                                    { mark?mark.value: '-' }
                                                </TableCell>
                                        
                                    })}
                                    {editId === r.id 
                                    ?<TableCell className="p-0 m-0 text-right">
                                            <Button
                                                type="submit"
                                                className="text-emerald-500 bg-transparent"
                                            >
                                                <Save />
                                            </Button>
                                            <Button
                                                variant={'secondary'}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    clearErrors();
                                                    cancel();
                                                }}
                                                className="text-red-500 bg-transparent"
                                            >
                                                <X />
                                            </Button>
                                    </TableCell>
                                    :
                                    (<><TableCell>
                                        {r.total}
                                    </TableCell>
                                    <TableCell>
                                        {r.average}
                                    </TableCell>
                                    <TableCell>
                                        {r.rank}
                                    </TableCell></>)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>)}
            </Form>
        </div>
    )
}