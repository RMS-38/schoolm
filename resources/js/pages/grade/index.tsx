import { Link, usePage } from "@inertiajs/react";
import { Mails, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import GradeLayout from "@/layouts/grade-layout";
import Layout from "@/layouts/layout";
import type { Grades } from "@/types/grade";
import { useRoute } from "ziggy-js";



export default function GradeIndex({ grades}: { grades: Grades}) {
    const route = useRoute();
    const { flash } = usePage();

    if (flash.status) {
        toast.success(flash.status, {position: 'top-right'});
    }

    return (
        <>
            <div
                className="flex justify-between items-center m-5"
            >
                <div>Search</div>
                <Link href={route('grade.create')}>
                    <Button>Create</Button>
                </Link>
            </div>
            <div
                className="m-5 grid grid-cols-1 lg:grid-cols-2 gap-5
                "
            >
                {grades.data.map(grade => <Card
                    key={grade.id}
                    className="relative p-3 md:p-5 shadow-lg dark:shadow-lg"
                >
                    <div
                        className="flex gap-5 md:gap-10"
                    >
                        <div>
                            <img src={grade.user?.avatar
                                ? `/storage/${grade.user.avatar}`
                                : '/storage/images/avatars/avatar.jpg'}
                                alt="user avatar"
                                className="w-25 h-25 object-cover object-center rounded-lg"
                            />
                        </div>
                        <div
                            className="flex-1 space-y-2"
                        >
                            <h1
                                className="text-xl font-medium"
                            >
                                {grade.name}
                            </h1>
                            <Separator/>
                            <h2 className="text-center text-sm flex items-center gap-2">
                                <UserRound />
                                {grade.user?.name}
                            </h2>
                            <p className="flex items-center gap-2">
                                <Mails />{grade.user?.email}
                            </p>
                        </div>
                    </div>
                    <Link
                        href={route('grade.show', grade.id)}
                        className="-mt-5"
                    >
                        <span className="absolute inset-0"></span>
                    </Link>
                </Card>)}
            </div>
        </>
    )
}

GradeIndex.layout = [
    [Layout],
    [GradeLayout, {
        title: 'Grades'
    }]]