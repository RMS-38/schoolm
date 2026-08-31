import { GradeForm } from "@/components/grades/grade-form";
import GradeLayout from "@/layouts/grade-layout";
import Layout from "@/layouts/layout";
import type { Subject } from "@/types/subject";

export default function CreateGrade({subjects}:{subjects:Subject[]}) {

    return (
        <>
            <GradeForm
                subjects={subjects}
            />
        </>
    );
}

CreateGrade.layout = [
    [Layout],
    [GradeLayout,
        {
            title: 'Create Grade',
            breadCrumb: [
                { title: 'Grade', routeName: 'grade.index' },
                { title: 'Create', routeName: 'grade.create', currentPage:true}
            ]
        }
    ]
]