import { GradeForm } from "@/components/grades/grade-form";
import Layout from "@/layouts/layout";
import NestedLayout from "@/layouts/nested-layout";
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
    [NestedLayout,
        {
            title: 'Create Grade',
            breadCrumb: [
                { title: 'Grade', routeName: 'grade.index' },
                { title: 'Create', routeName: 'grade.create', currentPage:true}
            ]
        }
    ]
]