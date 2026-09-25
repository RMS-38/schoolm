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
        title: 'Student enrollment ',
        breadCrumb: [
                { title: 'Student', routeName: 'student.index' },
                { title: 'Enrollment', routeName: 'student.create', currentPage:true}
            ]
    }]
]