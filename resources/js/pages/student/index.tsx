import { Head, Link, usePage } from "@inertiajs/react";
import { LayersPlus, Mail, MapPin, Phone } from "lucide-react";
import { PCard } from "@/components/student/p-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import GradeLayout from "@/layouts/grade-layout";
import Layout from "@/layouts/layout";
import type { Grade } from "@/types/grade";
import type { Student } from "@/types/student";
import { useRoute } from "ziggy-js";
import { useEffect } from "react";
import { toast } from "sonner";


type StudentWithGrade = Student &{
    grade: Grade
}

type StudentsWithGrade = {
    data: StudentWithGrade[]
}

interface Props{
    students: StudentsWithGrade;
}

export default function StudentIndex({ students}: Props) {
    const route = useRoute();
    const {flash} = usePage()

        if (flash.status) {
            toast.success(flash.status, { position: 'top-right' })
        }
    

    return (
        <>
            <Head title="Students" />
            <div
                className="flex justify-between items-center m-5"
            >
                <div>Search</div>
                <Link
                    href={route('student.create')}
                >
                    <Button>Create</Button>
                </Link>
            </div>
            <div
                className="m-5 grid grid-cols-1 lg:grid-cols-2 gap-5
                "
            >
                {students.data.map(student => (
                    <Card
                        key={student.id}
                        className="relative shadow-xl dark:shadow-md dark:shadow-white/35"
                    >
                        <div
                        className="flex gap-5 md:gap-8 px-6"
                        >
                            <div>
                                <img src={student.photo
                                    ? `/storage/${student.photo}`
                                    : '/storage/images/student/student-default.png'}
                                    alt="user avatar"
                                    className="w-32 h-32 object-cover object-center rounded-lg"
                                />
                            </div>
                            <div className="p-2 space-y-1.5">
                                <h1
                                    className="text-xl font-medium"
                                >
                                    {student.name}
                                </h1>
                                <Separator className="mb-2"/>
                                <PCard
                                    className="capitalize"
                                    icon={LayersPlus}
                                    text={student.grade.name}
                                />
                                <PCard
                                    icon={MapPin}
                                    text={`${student.address.substring(0, 30)}...`}
                                />
                                <PCard
                                    icon={Mail}
                                    text={student.email}
                                />
                                <PCard
                                    icon={Phone}
                                    text={student.phone}
                                />
                            </div>
                        </div>
                        <Link
                            className="-mt-8"
                            href={route('student.show', student.id)}
                        >
                            <span className="absolute inset-0"></span>
                        </Link>
                    </Card>
                ))}
            </div>
        </>
    )
}

StudentIndex.layout = [
    [Layout],
    [GradeLayout, {title: 'Students'}]
]