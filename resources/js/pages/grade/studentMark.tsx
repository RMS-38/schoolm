import { Form, Link, setLayoutProps } from "@inertiajs/react"
import GradeLayout from "@/layouts/grade-layout"
import Layout from "@/layouts/layout"
import type { Grade } from "@/types/grade";
import type { Report, ReportYear } from "@/types/report";
import type{ Subject } from "@/types/subject";
import { Student } from "@/types/student";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Numerals } from "react-day-picker";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRoute } from "ziggy-js";
import { cn } from "@/lib/utils";

type GradeWithSubjects = Grade & {
    subjects: Subject[];
}

interface Props{
    student: Student;
    term: number;
    term_1: Report;
    term_2: Report;
    term_3: Report;
    year: number;
    ranks: number[];
    grade: GradeWithSubjects
}
export default function ShowStudentMark({
    student,
    term,
    term_1,
    term_2,
    term_3,
    year,
    ranks,
    grade
}: Props) {
    const route = useRoute();
    const [cx, setCx]= useState<number | null>(null);
    const [cy, setCy] = useState(0);
    const [edit, setEdit] = useState(false);

      setLayoutProps('grade',{
            title: student.name,
            breadCrumb: [
                {title: 'Grade', routeName: 'grade.index'},
                {title: 'Show', routeName: 'grade.show', params: grade.id},
                {title: 'Mark', routeName: 'mark.show', params: [grade.id, term], currentPage: true}
            ]
      })
    
    const findMark = (report:Report,subject_id: number) => {
        return report.marks.find((mark) => mark.subject_id === subject_id)?.value;
    }

    const selectCell = (x: number, y: number) => {
        setCx(x);
        setCy(y);
        setEdit(true);
    }

    const handleCancel = () => {
        setCx(null);
        setCy(0);
        setEdit(false);
    }

    return (
        <div>
            <div className="flex items-center justify-end">
                <a
                    href={route('mark.pdf', [student.id, term])}
                    
                >
                    <img
                        src="/pdf-logo.png" alt="pdf-logo"
                        className="object-center object-cover h-auto w-6 rounded-sm"
                    />
                </a>
            </div>
            <Form
                method="put"
                action={route('mark.update', student.id)}
            >
                {({ processing, errors }) => (
                    <>
                        <Table>
                            
                            <TableHeader>
                                <TableHead>Subject</TableHead>
                                <TableHead>Weight</TableHead>
                                <TableHead>First term</TableHead>
                                <TableHead>Second term</TableHead>
                                <TableHead>Third term</TableHead>
                                <TableHead></TableHead>
                            </TableHeader>
                            <TableBody>
                                {grade.subjects.map((subject) => 
                                        <TableRow key={subject.id}>
                                            <TableCell>
                                                {subject.name}
                                            </TableCell>
                                            <TableCell>
                                                {subject.weight}
                                            </TableCell>
                                        <TableCell
                                            onClick={()=>selectCell(1, subject.id)}
                                        >
                                            {cx === 1 && cy === subject.id
                                                ?
                                                    <Field className="w-13">
                                                        <input name="subject_id" value={subject.id} hidden/>
                                                        <input name="grade" value={grade.id} hidden/>
                                                        <input name="term" value={1} hidden/>
                                                        <input name="weight" value={subject.weight} hidden/>
                                                        <Input name="mark" defaultValue={findMark(term_1, subject.id)}
                                                            className={cn('px-1', {'border border-red-500 ring-red-500 ring-2': errors['mark']})}
                                                    />
                                                    </Field>
                                                :findMark(term_1, subject.id)??'-'}
                                            </TableCell>
                                        <TableCell
                                            onClick={()=>selectCell(2, subject.id)}
                                        >
                                            {cx === 2 && cy === subject.id
                                                ?
                                                    <Field className="w-13">
                                                        <input name="subject_id" value={subject.id} hidden/>
                                                        <input name="grade" value={grade.id} hidden/>
                                                        <input name="term" value={2} hidden/>
                                                        <input name="weight" value={subject.weight} hidden/>
                                                        <Input name="mark" defaultValue={findMark(term_2, subject.id)} className="px-1"/>
                                                    </Field>
                                                :findMark(term_2, subject.id) ??'-'}
                                            </TableCell>
                                        <TableCell
                                            onClick={()=>selectCell(3, subject.id)}
                                        >
                                            {cx === 3 && cy === subject.id
                                                ?
                                                    <Field className="w-13">
                                                        <input name="subject_id" value={subject.id} hidden/>
                                                        <input name="grade" value={grade.id} hidden/>
                                                        <input name="term" value={3} hidden/>
                                                        <input name="weight" value={subject.weight} hidden/>
                                                        <Input name="mark" defaultValue={findMark(term_3, subject.id)} className="px-1"/>
                                                    </Field>
                                                :findMark(term_3, subject.id)??'-'}
                                        </TableCell>
                                        <TableCell
                                            className="relative"
                                        >
                                            {edit && cy === subject.id && <div
                                                className="absolute inset-0 pr-2 flex justify-end items-center gap-2"
                                            >
                                                <button
                                                    type="submit"
                                                    className="text-emerald-500"
                                                    disabled={processing}
                                                ><Save /></button>
                                                <Button
                                                    type="button"
                                                        onClick={handleCancel}
                                                        variant={"outline"}
                                                    className="text-red-500"
                                                ><X /></Button>
                                        </div>}</TableCell>
                                        </TableRow>
                                    )
                                }
                                <TableRow>
                                    <TableCell colSpan={2}>Average</TableCell>
                                    <TableCell>{ term_1.average }</TableCell>
                                    <TableCell>{ term_2.average }</TableCell>
                                    <TableCell>{ term_3.average??'-' }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Rank</TableCell>
                                    <TableCell>{ ranks[0] }</TableCell>
                                    <TableCell>{ ranks[1] }</TableCell>
                                    <TableCell>{ ranks[2] ?? '-' }</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </>
                )}
            </Form>
            <Separator />
            <div className="w-fit mt-4">
                <h1 className="text-2xl">Report card year</h1>
                <Separator />
                <div className="flex gap-4">
                    <p>Average: {year}</p>
                    <p>Rank: { ranks[3] }</p>
                </div>
            </div>
        </div>
    )
}

ShowStudentMark.layout = {
    layout:Layout,
    grade: GradeLayout
}