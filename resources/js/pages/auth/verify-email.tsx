import { Head, router } from "@inertiajs/react";
import { useEffect, useState} from "react";
import type{  ReactNode } from 'react'
import { toast } from "sonner";
import { SubmitBtn } from "@/components/submit-btn";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HomeLayout from "@/layouts/home-layout";
import { useRoute } from "ziggy-js";


export default function VerifyEmail({
    status,
    success,
    flashId
}: {
    status: string,
    success: boolean,
    flashId:string
    }) {
    const [processing, setProcessing] = useState<boolean>(false);
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
    
    const resend = () => {
        router.visit(route('verification.send'), {
            method:'post',
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false)
        });
    }

    return (
        <div className="min-w-screen min-h-screen flex items-center justify-center">
            <Head title="Email verification" />
            
            <Card className="w-full mx-3 sm:mx-0 sm:w-5/6 md:w-2/3 lg:w-1/3">
                <CardHeader>
                    <CardTitle
                        className="text-emerald-600 font-bold text-xl"
                    >
                        Verification email sent!  
                    </CardTitle>
                    <CardDescription
                        className="text-balance"
                    >
                        We’ve sent a confirmation link to your email address.
                        Please check your inbox and click the link to verify your account.
                        If you didn’t receive the email, you can click the button below to resend the verification
                    </CardDescription>
                    <CardContent>
                        <SubmitBtn
                            type="button"
                            processing={processing}
                            onClick={resend}
                        >
                            Resend verification email
                        </SubmitBtn>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    )
}

VerifyEmail.layout = (page:ReactNode) => <HomeLayout>{ page }</HomeLayout>;