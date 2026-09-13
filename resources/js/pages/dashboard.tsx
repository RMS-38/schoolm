import { Head, Link } from "@inertiajs/react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useRoute } from "ziggy-js";

export default function Dashboard({
    grade_count,
    subject_count,
    student_count
}: {
        grade_count: number;
        subject_count: number;
        student_count: number;
}) {
    const route = useRoute();

    const summaryCards = [
        {
            title: "Subjects",
            count: subject_count,
            description: "Active learning areas",
            href: route("subject.index"),
            accent: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
        },
        {
            title: "Grade",
            count: grade_count,
            description: "Classes and academic levels",
            href: route("grade.index"),
            accent: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
        },
        {
            title: "Student",
            count: student_count,
            description: "Enrolled learners",
            href: route("student.index"),
            accent: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
        },
    ];

    const quickStats = [
        { label: "Attendance", value: "94%", tone: "bg-emerald-500" },
        { label: "Assignments", value: "76%", tone: "bg-sky-500" },
        { label: "Performance", value: "88%", tone: "bg-violet-500" },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="mx-10 mb-6 flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Overview
                    </p>
                    <h1 className="mt-2 text-2xl font-semibold">Dashboard</h1>
                </div>

                <Link
                    href={route("student.index")}
                    className="rounded-md border bg-primary  px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 transition hover:bg-emerald-500"
                >
                    View students
                </Link>
            </div>

            <div className="w-full px-12 pb-12">
                <div className="grid gap-5 md:grid-cols-3">
                    {summaryCards.map((card) => (
                        <Card
                            key={card.title}
                            className="group relative overflow-hidden border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <CardTitle className="flex items-center justify-between px-5 pt-5">
                                <span className="text-lg font-semibold text-slate-800 dark:text-white">
                                    {card.title}
                                </span>
                                <span
                                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${card.accent}`}
                                >
                                    {card.count}
                                </span>
                            </CardTitle>

                            <CardContent className="px-5 pb-0 pt-4">
                                <p className="text-sm text-slate-600 dark:text-white">{card.description}</p>

                                <div className="mt-6 rounded-xl bg-slate-50 dark:bg-slate-950 p-3">
                                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-200">
                                        <span>Progress</span>
                                        <span>{Math.min(92, Number(card.count) * 6)}%</span>
                                    </div>
                                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className={`h-full rounded-full ${card.accent.split(" ")[0] === "bg-sky-100" ? "bg-sky-500" : card.accent.split(" ")[0] === "bg-violet-100" ? "bg-violet-500" : "bg-emerald-500"}`}
                                            style={{
                                                width: `${Math.min(92, Number(card.count) * 6)}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="border-t border-slate-200 px-5 py-4">
                                <Link
                                    href={card.href}
                                    className="text-sm font-medium text-slate-700 dark:text-slate-400 transition group-hover:text-slate-900 dark:group-hover:text-white"
                                >
                                    Open {card.title.toLowerCase()} →
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
                    <Card className="shadow-sm">
                        <CardTitle className="px-5 pt-5 text-xl font-semibold">
                            School overview
                        </CardTitle>

                        <CardContent className="px-5 pb-5 pt-4">
                            <div className="grid gap-4 sm:grid-cols-3">
                                {quickStats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="rounded-xl border border-slate-200 dark:border-slate-600 p-4"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`h-2.5 w-2.5 rounded-full ${stat.tone}`}
                                            />
                                            <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-300">
                                                {stat.label}
                                            </span>
                                        </div>
                                        <p className="mt-4 text-2xl font-bold text-slate-800 dark:text-slate-100">
                                            {stat.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-600 p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                        Enrollment status
                                    </p>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                        84%
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        { label: "Primary", value: 88, color: "bg-sky-500" },
                                        { label: "Middle", value: 82, color: "bg-violet-500" },
                                        { label: "Senior", value: 76, color: "bg-emerald-500" },
                                    ].map((item) => (
                                        <div key={item.label}>
                                            <div className="mb-1 flex justify-between text-xs text-slate-600 dark:text-slate-200">
                                                <span>{item.label}</span>
                                                <span>{item.value}%</span>
                                            </div>
                                            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                                                <div
                                                    className={`h-full rounded-full ${item.color}`}
                                                    style={{ width: `${item.value}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardTitle className="px-5 pt-5 text-xl font-semibold">
                            Quick actions
                        </CardTitle>

                        <CardContent className="space-y-3 px-5 pb-5 pt-4">
                            <Link
                                href={route("subject.index")}
                                className="flex items-center justify-between rounded-xl border bg-primary px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-emerald-500"
                            >
                                <span>Manage subjects</span>
                                <span>→</span>
                            </Link>

                            <Link
                                href={route("grade.index")}
                                className="flex items-center justify-between rounded-xl border bg-primary px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-emerald-500"
                            >
                                <span>Manage grades</span>
                                <span>→</span>
                            </Link>

                            <Link
                                href={route("student.index")}
                                className="flex items-center justify-between rounded-xl border bg-primary px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-emerald-500"
                            >
                                <span>Manage students</span>
                                <span>→</span>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}