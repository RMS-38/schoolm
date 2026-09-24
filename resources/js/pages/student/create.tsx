import { StudentForm } from "@/components/student/student-form";
import Layout from "@/layouts/layout";
import NestedLayout from "@/layouts/nested-layout";

export default function StudentCreate() {
    return (
        <StudentForm />
    )
}

StudentCreate.layout = [
    [Layout],
    [NestedLayout, {
        title: 'Inscriptions',
        breadCrumb: [
                { title: 'Student', routeName: 'student.index' },
                { title: 'Inscriptions', routeName: 'student.create', currentPage:true}
            ]
    }]
]