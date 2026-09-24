import { setLayoutProps } from "@inertiajs/react";
import { GradeForm } from "@/components/grades/grade-form";
import Layout from "@/layouts/layout";
import NestedLayout from "@/layouts/nested-layout";
import type{ Grade } from "@/types/grade";
import type{ Subject } from "@/types/subject";


type GradeWithSubjects = Grade & {
    subjects: Subject[]
}

interface Props{
    grade: GradeWithSubjects;
    subjects: Subject[];
}
export default function GradeEdit({ subjects, grade }: Props) {
    setLayoutProps('grade', {
        title: `${grade.name} Edit`,
        breadCrumb: [
            {title: 'Grade', routeName: 'grade.index'},
            {title: 'Show', routeName: 'grade.show', params: grade.id},
            {title: 'Edit', routeName: 'grade.edit', params: grade.id, currentPage:true}
        ]
    })

    return (<>
        <GradeForm
            subjects={subjects}
            grade={grade}
        />
    </>)
}

GradeEdit.layout = {
    Layout,
    grade: NestedLayout,
}