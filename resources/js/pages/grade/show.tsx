import { Link, router, setLayoutProps, usePage } from "@inertiajs/react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Marks } from "@/components/marks/marks";
// import { StudentList } from "@/components/student/student-list";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import Layout from "@/layouts/layout";
import NestedLayout from "@/layouts/nested-layout";
import type { Grade } from "@/types/grade";
import type { PageProps } from "@/types/page-props";
import type { Report, ReportYear } from "@/types/report";
import type { Subject } from "@/types/subject";
import { useRoute } from "ziggy-js";

type GradeWithSubject = Grade & {
    subjects: Subject[];
}

interface Props{
    grade: GradeWithSubject;
    reportCards: Report[];
    yearReportsCards: ReportYear[];
}

export default function GradeShow({ grade, reportCards, yearReportsCards}: Props) {
    const route = useRoute();
    const { flash } = usePage<PageProps>().props;
    

    setLayoutProps('grade',{
        title: grade.name,
        breadCrumb: [
            {title: 'Grade', routeName: 'grade.index'},
            {title: 'Show', routeName: 'grade.show', params: grade.id, currentPage:true}
        ]
    })

    if (flash?.status) {
        toast.success(flash.status, { position: 'top-right' });
    }

    function handleDelete() {
        if (confirm(`Are you sure to delete ${grade.name} ${grade.name}`)) {
            router.delete(route('grade.destroy', grade.id))
        }
    }

    const changeTerm = (value: string) => {
        router.get(route('grade.show', { id: grade.id }),{term:value})
    }

    return (
        <>
            <div className="ml-10 mb-4 -mt-11 text-2xl flex items-center justify-end">
                
                <div className="flex items-center gap-2">
                    <Link
                        href={route('grade.edit', grade.id)}
                        className="text-emerald-500 hover:cursor-pointer"
                    >
                        <Pencil />
                    </Link>
                    <Button
                        onClick={handleDelete}
                        variant={'ghost'}
                        className="text-red-500"
                    >
                        <Trash2 />
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="students">
                <TabsList variant="line">
                    <TabsTrigger value="students">
                        Students
                    </TabsTrigger>
                    <TabsTrigger value="subjects">
                        Subjects
                    </TabsTrigger>
                </TabsList>
                <Separator className="-my-2"/>
                
                <TabsContent value="students">
                    {/* <StudentList students={students}/> */}
                    <Marks
                        subjects={grade.subjects}
                        reports={reportCards}
                        yearReport={yearReportsCards}
                        onTermChange={(value) => changeTerm(value)}
                        grade_id={grade.id}
                    />
                </TabsContent>
                <TabsContent value="subjects">
                    <div
                        className="grid md:grid-cols-2 p-2"
                    >
                        {grade.subjects.map(subject => <Card
                            key={subject.id}
                            className="px-4 py-2 m-2 rounded-md"
                        >
                            <CardTitle
                                className="flex items-center justify-between"
                            >
                                <h1>{subject.name}</h1>
                                <p>{ subject.desc }</p>
                            </CardTitle>
                        </Card>)}
                    </div>
                </TabsContent>
            </Tabs>
        </>
    )
}

GradeShow.layout = {
    layout:Layout,
    grade: NestedLayout
}