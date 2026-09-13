import { Form } from "@inertiajs/react"
import type { User } from "@/types"
import { useRoute } from "ziggy-js"
import { InputField } from "../inputField"
import { SubmitBtn } from "../submit-btn"
import { Card, CardContent, CardTitle } from "../ui/card"





export const UserPassword = ({user}:{user:User}) => {
    const route = useRoute();

    return (
        <Card className="w-full p-2">
            <CardTitle
                className="text-center font-bold text-xl"
            >
                Password
            </CardTitle>
            <CardContent>
                <Form
                    action={route('setting.password')}
                    method="patch"
                    className="my-3 space-y-3"
                    setDefaultsOnSuccess
                    resetOnSuccess
                    resetOnError
                >
                    {({processing, errors})=>(<>
                        <InputField
                            label="Current Password"
                            name="current_password"
                            type="password"
                            error={errors.current_password}
                        />
                        <InputField
                            label="New Password"
                            name="password"
                            type="password"
                            error={errors.password}
                        />
                        <InputField
                            label="Password confirmation"
                            name="password_confirmation"
                            type="password"
                        />
                        <div
                            className="flex justify-start"
                        >
                            <SubmitBtn
                                processing={processing}
                                className="w-17.5"
                            >
                                Save
                            </SubmitBtn>
                            
                        </div>
                    </>)}
                </Form>

            </CardContent>
        </Card>
    )
}