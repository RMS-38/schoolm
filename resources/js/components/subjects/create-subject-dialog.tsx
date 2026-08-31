import { Form } from "@inertiajs/react"
import { useRoute } from "ziggy-js"
import { InputField } from "../inputField"
import { SubmitBtn } from "../submit-btn"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog"
import { Field, FieldGroup } from "../ui/field"


export const CreateSubjectDialog = () => {
    const route = useRoute();
    
    return (
        <Dialog>
            <DialogTrigger render={<Button type="button">New Subject</Button>} />
            <DialogContent
                className="sm:max-w-sm"
            >
                <Form
                    action={route('subject.store')}
                    method="post"
                    setDefaultsOnSuccess
                    resetOnError
                    resetOnSuccess
                >
                    {({processing, errors}) => (<>
                        <DialogHeader>Create a new Subject</DialogHeader>
                        <FieldGroup>
                            <Field>
                                <InputField
                                    name="name"
                                    label="Name"
                                    placeholder="Math"
                                    error={errors.name}
                                />
                            </Field>
                            <Field>
                                <InputField
                                    name="weight"
                                    label="Weight"
                                    placeholder="2"
                                    error={errors.weight}
                                />
                            </Field>
                            <Field>
                                <InputField
                                    name="desc"
                                    label="Description"
                                    placeholder="Subject for grade..."
                                    error={errors.desc}
                                />
                            </Field>
                        </FieldGroup>
                        <DialogFooter
                            className="mt-2"
                        >
                            <DialogClose render={<Button type="button" variant={"outline"}>Cancel</Button>} />
                            <div>
                                <SubmitBtn
                                    processing={processing}
                                    isDirty={true}
                                >
                                    Create
                                </SubmitBtn>
                            </div>
                        </DialogFooter>
                    </>)}
                </Form>
            </DialogContent>
        </Dialog>
    )
} 