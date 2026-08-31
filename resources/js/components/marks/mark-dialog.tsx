import { Form } from "@inertiajs/react"
import type { Report } from "@/types/report";
import type { Subject } from "@/types/subject"
import { useRoute } from "ziggy-js"
import { SubmitBtn } from "../submit-btn";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SelectTerm } from "../select-term";


interface Props {
    subjects: Subject[];
    report: Report
}

export const MarkDialog = ({subjects, report}:Props) => {
    const route = useRoute()
    
    return (
        <Dialog>
            <DialogTrigger render={<button className="absolute inset-0"></button>}/>
            <DialogContent>
                <Form
                    method="post"
                    action={route('mark.store',report.id)}
                    setDefaultsOnSuccess
                >
                    
                    {({processing, isDirty, errors}) => (<>
                        
                        
                            <DialogHeader>
                            <DialogTitle
                                className="text-xl md:text-2xl"
                            >
                                    {report.name}
                                </DialogTitle>
                            </DialogHeader>
                        <FieldGroup
                            className="overflow-y-scroll"
                        >
                            <div
                                className="flex justify-end items-center"
                            >
                                <SelectTerm name="term"/>
                                {errors.term && <span className="text-red-500 text-xs">{ errors.term }</span>}
                            </div>
                                <div className="flex justify-between mr-12">
                                    <div className="flex gap-12">
                                        <h3>Subject</h3>
                                        <h3>Weight</h3>
                                    </div>
                                    <h3 className="text-left">Value</h3>
                                </div>
                                {subjects.map(subject => (<>
                                    <Field
                                        key={subject.id}
                                        className="flex flex-row"
                                    >
                                        <Label
                                            htmlFor={subject.id.toString()}
                                            className="flex gap-12"
                                        >
                                            <div className="w-1/3 overflow-hidden"><span>{subject.name}</span></div>
                                            <span>{subject.coefficient}</span>
                                        </Label>
                                        <input type="number" value={subject.coefficient} name={`weights[${subject.id}]`} hidden/>
                                        <Input
                                            type="number"
                                            name={`marks[${subject.id}]`}
                                            id={subject.id.toString()}
                                            step="any"
                                        />
                                        
                                    </Field>
                                    {errors?.[`marks.${subject.id}`] && (
                                            <span
                                                className="text-red-500 text-sm text-right"
                                            >
                                                {errors[`marks.${subject.id}`]}
                                            </span>
                                        )}
                                </>))}
                            </FieldGroup>
                        <DialogFooter
                            className="mt-2"
                        >
                                <DialogClose render={<Button variant="outline">Cancel</Button>}/>
                                <div>
                                    <SubmitBtn
                                        processing={processing}
                                        isDirty={isDirty}
                                    >Save</SubmitBtn>
                                </div>
                            </DialogFooter>
                        
                    </>)}
                    </Form>
                </DialogContent>
        </Dialog>
    )
}