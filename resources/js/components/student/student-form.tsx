import { Form, Head } from "@inertiajs/react";
import { CalendarDays, Image, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";
import { InputField } from "@/components/inputField";
import { SubmitBtn } from "@/components/submit-btn";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type{ Grade } from "@/types/grade";
import type { Student } from "@/types/student";
import { useRoute } from "ziggy-js";
import { SelectGrade } from "../grades/select-grade";

type StudentWithGrade = Student & {
    grade: Grade
}

export const  StudentForm=({student}:{student?:StudentWithGrade})=> {
    const [open, setOpen] = useState(false);
    const [changePhoto, setChangePhoto] = useState(false);
    const [date, setDate] = useState<Date | undefined>(
        student ? new Date(student.dob) : undefined
    );
    const [photo, setPhoto] = useState(
        student?.photo
            ? student.photo
            :null
    ); 
    const photoInput = useRef<HTMLInputElement | null>(null);

    const route = useRoute();

    const handleCancel = () => {
        if (photoInput.current?.value) {
            photoInput.current.value = '';  
        }

        setPhoto(student?.photo
            ? student.photo
            : null
        );

        setChangePhoto(false);
        
    }

    return (
        <>
            <Head title={student ? `Modify ${student.name}`: 'Create Student'} />
            
            <div
                className="m-2 p-3 md:p-5"
            >
                
                <Form
                    action={student
                        ? route('student.update', student.id)
                        : route('student.store')
                    }
                    method={student
                        ? 'put'
                        : 'post'
                    }
                    resetOnError
                >
                    {({processing, errors})=>(
                        <>
                            <div
                                className="flex justify-end items-center py-1 px-3"
                            >
                                <SelectGrade grade_id={student?.grade.id}/>
                            </div>
                            <div
                                className="grid grid-cols-1 gap-3 md:grid-cols-2"
                            >
                                <div
                                    className="p-2"
                                >
                                    <Field>
                                        <FieldLabel
                                            htmlFor="photo"
                                            className="border w-80 h-80 overflow-hidden"
                                        >
                                            {photo
                                                ? <img
                                                    src={
                                                        changePhoto
                                                        ? photo
                                                        :`/storage/${photo}`
                                                    }
                                                    className="object-center object-cover"
                                                />
                                                :<Image
                                                    size={320}
                                                    strokeWidth={0.5}
                                                    className="w-500"
                                                />
                                            }
                                        </FieldLabel>
                                        <FieldDescription
                                            className="text-center"
                                        >
                                            {changePhoto
                                                ? <Button
                                                    variant={'ghost'}
                                                    onClick={handleCancel}
                                                >
                                                    <RotateCcw />
                                                </Button>
                                                : 'Select photo'
                                            }
                                        </FieldDescription>
                                        <Input
                                            type="file"
                                            id="photo"
                                            name="photo"
                                            ref={photoInput}
                                            hidden
                                            onChange={(e) => {
                                                setPhoto(URL.createObjectURL(e.target.files[0]))
                                                setChangePhoto(true)
                                            }}
                                        />
                                    </Field>
                                    <InputField
                                        label="Full name"
                                        name="name"
                                        placeholder="Your name"
                                        error={errors.name}
                                        defaultValue={ student?.name}
                                    />
                                </div>
                                <div
                                    className="p-2"
                                >

                                    <fieldset
                                        className="flex text-emerald-500 gap-6 p-3 rounded border"
                                    >
                                        <legend>Gender</legend>
                                        <div
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                type="radio"
                                                name="gender"
                                                id="boy"
                                                value='boy'
                                                defaultChecked={student ? student?.gender ==='boy' :true}
                                            />
                                            <Label htmlFor="boy">Boy</Label>
                                        </div>
                                        <div
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                type="radio"
                                                name="gender"
                                                id="girl"
                                                value='girl'
                                                defaultChecked={student?.gender ==='boy'}
                                            />
                                            <Label htmlFor="girl">Girl</Label>
                                        </div>
                                    </fieldset>
                                    <InputField
                                        label="Address"
                                        name="address"
                                        placeholder="Your address"
                                        error={errors.address}
                                        defaultValue={student?.address}
                                    />
                                    <InputField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        error={errors.email}
                                        defaultValue={student?.email}
                                    />
                                    <InputField
                                        label="Phone Number"
                                        name="phone"
                                        placeholder="+261 00 00 000 00"
                                        error={errors.phone}
                                        defaultValue={student?.phone}
                                    />
                                    <InputField
                                        label="Place of birth"
                                        name="pob"
                                        placeholder="city..."
                                        error={errors.pob}
                                        defaultValue={student?.dob}
                                    />

                                    <Field
                                        className="my-3 text-emerald-500"
                                    >
                                        <FieldLabel
                                            htmlFor="date"
                                        >
                                            Date of Birth
                                        </FieldLabel>
                                        <input
                                            type="text"
                                            name="dob"
                                            hidden
                                            value={date
                                                ? date.toISOString().split('T')
                                                :''
                                            }
                                        />
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger
                                                render={
                                                    <Button
                                                        variant={'outline'}
                                                        id="date"
                                                        className="w-32 font-normal justify-between"
                                                    >
                                                        {date
                                                            ? date.toDateString()
                                                            : 'Select Date'
                                                        }

                                                        <CalendarDays />
                                                    </Button>
                                                }
                                            />
                                            <PopoverContent
                                                className="w-auto overflow-hidden p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    defaultMonth={date}
                                                    captionLayout="dropdown"
                                                    onSelect={(date) => {
                                                        setDate(date);
                                                        setOpen(false)
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {errors.dob && <span className="text-sm text-red-500">{ errors.dob }</span>}
                                    </Field>

                                </div>
                            </div>
                            <div
                                className="w-full flex justify-end p-2"
                            >
                                <SubmitBtn
                                    processing={processing}
                                    className="w-fit"
                                >
                                    {student 
                                        ? 'Update'
                                        : 'Create'
                                    }
                                </SubmitBtn>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    )
}