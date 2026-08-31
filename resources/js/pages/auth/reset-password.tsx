import { Form, Head, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import { InputField } from "@/components/inputField";
import { SubmitBtn } from "@/components/submit-btn";
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card";
import HomeLayout from "@/layouts/home-layout";
import { useRoute } from "ziggy-js";


export default function ResetPassword({
    token,
    email,
}: {
    token: string,
    email: string
}) {
    const route = useRoute();
    const { props } = usePage();
    const error = props.errors.email;

    if (error) {
        toast.error(error,{position: 'top-right',})
    }
    
    return (
        <div className="min-w-screen min-h-screen flex items-center justify-center">
            <Head title="Reset password"/>
            <Card className="w-full mx-3 sm:mx-0 sm:w-5/6 md:w-2/3 lg:w-1/3">
                <CardHeader>
                    <CardTitle
                        className="text-emerald-600 font-bold text-xl"
                    >
                        Reset password
                    </CardTitle>
                    
                    <CardContent>
                        <Form
                            action={route('password.update')}
                            method="post"
                            resetOnSuccess={['password', 'password_confirmation']}
                            resetOnError={['password', 'password_confirmation']}
                            className="space-y-3"
                        >
                            {({ processing, errors,isDirty }) => (<>
                                
                                <input type="text" name="token" value={token} hidden/>
                                <input type="email" name="email" value={email} hidden/>
                                <InputField
                                    label="Email"
                                    name="email"
                                    value={email}
                                    disabled
                                />
                                <InputField
                                    label="New password"
                                    name="password"
                                    type="password"
                                    error={errors.password}
                                />
                                <InputField
                                    label="Confirm password"
                                    name="password_confirmation"
                                    type="password"
                                />
                                <SubmitBtn
                                    processing={processing}
                                    isDirty={isDirty}
                                >
                                    Reset
                                </SubmitBtn>
                            </>)}
                        </Form>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    )
}

ResetPassword.layout = (page:any) => <HomeLayout>{ page }</HomeLayout>;