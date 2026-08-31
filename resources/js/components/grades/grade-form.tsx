
import { Form } from "@inertiajs/react";
import { InputField } from "@/components/inputField";
import { SubmitBtn } from "@/components/submit-btn";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Grade } from "@/types/grade"
import type { Subject } from "@/types/subject"
import { useRoute } from "ziggy-js";

type GradeWithSubjects = Grade & {
    subjects: Subject[]
}
type Props = {
    grade?: GradeWithSubjects;
    subjects: Subject[]
}
export const GradeForm = ({ grade, subjects }: Props) => {
    const route = useRoute();

    return (<>
        <div className="flex justify-center">
            <Form
                action={grade
                    ? route('grade.update', grade.id)
                    : route('grade.store')}
                method={grade
                    ? 'put'
                    : 'post'}
                
                resetOnSuccess
                resetOnError
                className="p-3 md:w-3/4 space-y-3"
            >
                {({ errors, processing, isDirty }) => (<>
                    <InputField
                        label="Name"
                        name="name"
                        placeholder="Grade"
                        defaultValue={grade? grade.name :""}
                        error={errors.name}
                    />
                    <h2>Subjects</h2>
                    {subjects.map(subject =>
                        <Label htmlFor={`subject-${subject.id}`} key={subject.id}>
                            <Checkbox
                                name="subjects[]"
                                id={`subject-${subject.id}`}
                                value={subject.id.toString()}
                                defaultChecked={grade?.subjects?.some(s=>s.id === subject.id)}
                            />
                            <h1>{subject.name}</h1>:
                            <span
                                className="text-muted-foreground"
                            >
                                {subject.desc}
                            </span>
                        </Label>)
                    }
                    <SubmitBtn
                        processing={processing}
                        isDirty={isDirty}
                    >
                        {grade? 'Update': 'Create'}
                    </SubmitBtn>
                </>)}
            </Form>
        </div>
    </>)
}