import { StudentForm } from "@/components/student/student-form";
import GradeLayout from "@/layouts/grade-layout";
import Layout from "@/layouts/layout";

export default function StudentCreate() {
    return (
        <StudentForm />
    )
}

StudentCreate.layout = [
    [Layout],
    [GradeLayout, {
        title: 'Inscriptions',
        breadCrumb: [
                { title: 'Student', routeName: 'student.index' },
                { title: 'Inscriptions', routeName: 'student.create', currentPage:true}
            ]
    }]
]