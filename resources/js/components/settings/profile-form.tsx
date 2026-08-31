import { Form, router } from "@inertiajs/react"
import { useRoute } from "ziggy-js"
import { InputField } from "../inputField"
import { SubmitBtn } from "../submit-btn"
import { Button } from "../ui/button"
import { Card, CardContent, CardTitle } from "../ui/card"


type ProfilePropsForm = {
    title: string;
    label: string;
    name: string;
    userId: number;
    defaultValue?: string;
    routeName: string,
    verifyEmail?:boolean
}

export const ProfileForm = (
    { title, label, name, userId, defaultValue, routeName, verifyEmail }
        : ProfilePropsForm) => {
    const route = useRoute();

    const sendEmailVerification = () => {
        router.post(route('verification.send'));
    }

    return (
        <Card className="w-full p-2">
            <CardTitle
                className="text-center font-bold text-xl"
            >
                {title}
            </CardTitle>
            <CardContent>
                <Form
                    action={route(routeName, userId)}
                    method="patch"
                    className="my-3 space-y-3"
                    setDefaultsOnSuccess
                >
                    {({processing, errors, isDirty})=>(<>
                        <InputField
                            label={label}
                            name={name}
                            defaultValue={defaultValue}
                            error={errors[name]}
                        />
                        <div
                            className="flex justify-start gap-2"
                        >
                            <SubmitBtn
                                processing={processing}
                                isDirty={isDirty}
                                className="w-[70px]"
                            >
                                Save
                            </SubmitBtn>
                            {name === 'email' && verifyEmail && <Button
                                type="button"
                                onClick={sendEmailVerification}
                            >
                                Verify your email
                            </Button>}
                        </div>
                    </>)}
                </Form>

            </CardContent>
        </Card>
    )
}