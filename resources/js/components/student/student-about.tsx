import {
    Calendar,
    CalendarDays,
    LayersPlus,
    Mail,
    MapPin,
    MapPinned,
    Phone,
    Transgender
} from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type{ Grade } from "@/types/grade"
import type{ Student } from "@/types/student"
import CalculateAge from "@/utils/calcul-age"



type StudentWithGrade = Student & {
    grade: Grade
}

interface Props{
    student: StudentWithGrade
}

export const StudentAbout = ({ student }: Props) => {

    return (
        <>
            <Card className="m-4 md:m-7 p-6 md:p-10">
                <CardHeader>
                    <CardTitle
                        className="text-2xl md:text-3xl"
                    >
                        About {student.name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                <Accordion defaultValue={["address"]}>
                    <AccordionItem className="accent-green-100">
                            <AccordionTrigger
                                className="text-lg font-medium"
                            >
                                Age
                            </AccordionTrigger>
                        <AccordionContent className='flex gap-4'>
                            <Calendar />
                            <p>{ CalculateAge(student.dob) } years old</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className="grade">
                            <AccordionTrigger
                                className="text-lg font-medium"
                            >
                                Grade
                            </AccordionTrigger>
                        <AccordionContent className='flex gap-4'>
                            <LayersPlus/>
                            <p>{ student.grade.name }</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className="address">
                            <AccordionTrigger
                                className="text-lg font-medium"
                            >
                                Address
                            </AccordionTrigger>
                        <AccordionContent className="flex gap-4">
                            <MapPin/>
                            <p>{ student.address }</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="email">
                            <AccordionTrigger
                                className="text-lg font-medium"
                            >
                                Email
                            </AccordionTrigger>
                        <AccordionContent className="flex gap-4">
                            <Mail/>
                            <p>{ student.email }</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="phone">
                            <AccordionTrigger
                                className="text-lg font-medium"
                            >
                                Phone number
                            </AccordionTrigger>
                        <AccordionContent className="flex gap-4">
                            <Phone/>
                            <p>{ student.phone }</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="gender">
                            <AccordionTrigger
                                className="text-lg font-medium"
                            >
                                Gender
                            </AccordionTrigger>
                        <AccordionContent className="flex gap-4">
                            <Transgender />
                            <p>{ student.gender }</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className="pob">
                            <AccordionTrigger
                                className="text-lg font-medium"
                            >
                                Place of birth
                            </AccordionTrigger>
                        <AccordionContent className="flex gap-4">
                            <MapPinned />
                            <p>{ student.pob }</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="dob">
                            <AccordionTrigger
                                className="text-lg font-medium"
                            >
                                Date of birth
                            </AccordionTrigger>
                        <AccordionContent className="flex gap-4">
                            <CalendarDays />
                            <p>{ student.dob }</p>
                        </AccordionContent>
                    </AccordionItem>
                    </Accordion>
                    </CardContent>
            </Card>
        </>
    )
 }