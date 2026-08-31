import { Form, Head } from "@inertiajs/react";
import { useEffect} from "react";
import type{  ReactNode } from 'react'
import { toast } from "sonner";
import { InputField } from "@/components/inputField";
import { SubmitBtn } from "@/components/submit-btn";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HomeLayout from "@/layouts/home-layout";
import { useRoute } from "ziggy-js";


export default function ForgotPassword({
    status,
    success,
    flashId
}: {
    status: string,
    success: boolean,
    flashId:string
}) {
    const route = useRoute();

    useEffect(() => {
        if (status) {
            if (success) {
                toast.success(status,{position: 'top-right'});
            } else {
                toast.error(status,{position: 'top-right',})
            }
        }
        
    },[status, success, flashId])
    
    return (
        <div className="min-w-screen min-h-screen flex items-center justify-center">
            <Head title="Forgot password" />
            
            <Card className="w-full mx-3 sm:mx-0 sm:w-5/6 md:w-2/3 lg:w-1/3">
                <CardHeader>
                    <CardTitle
                        className="text-emerald-600 font-bold text-xl"
                    >
                        Forgot Password
                    </CardTitle>
                    <CardDescription
                        className="text-balance"
                    >
                        Enter your registered email address, and we’ll
                        send you a secure link to create a new password.
                        For your protection, this link will expire after
                        a short period, so be sure to complete the reset
                        promptly. Once updated, you’ll be able to log in
                        with your new credentials and continue using your
                        account without interruption.
                    </CardDescription>
                    <CardContent>
                        <Form
                            action={route('password.email')}
                            method="post"
                            resetOnSuccess
                            resetOnError
                            className="space-y-3"
                        >
                            {({ processing, errors, isDirty }) => (<>
                                <InputField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    error={errors.email}
                                />
                                <SubmitBtn
                                    processing={processing}
                                    isDirty={isDirty}
                                >
                                    Send reset link
                                </SubmitBtn>
                            </>)}
                        </Form>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    )
}

ForgotPassword.layout = (page:ReactNode) => <HomeLayout>{ page }</HomeLayout>;