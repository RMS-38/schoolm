import { Form, Link } from "@inertiajs/react";
import { InputField } from "@/components/InputField";
import { Logo } from "@/components/logo";
import { SubmitBtn } from "@/components/submit-btn";
import { TextLink } from "@/components/text-link";
import { useRoute } from "ziggy-js";


export default function Register() {
    const route = useRoute();

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col items-center gap-4 p-4 md:p-10">
                
                <Logo width={20}/>

                <div className="flex flex-col w-3/4 items-center justify-center gap-1">
                    <h1 className="font-bold text-xl md:text-2xl text-center">Create your account</h1>
                    <p className="text-sm text-muted-foreground">
                        Fill in the form below to create your account
                    </p>

                    <Form
                        action={route('register')}
                        method="post"
                        className="w-full space-y-5"
                        resetOnSuccess
                        resetOnError={['password', 'password_confirmation']}
                    >
                        {({processing, errors, isDirty}) => (<>
                            <InputField
                                label="Full name"
                                name="name"
                                placeholder="Your name"
                                error={errors.name}
                            />
                            <InputField
                                label="Email"
                                type="email"
                                name="email"
                                placeholder="youremail@example.com"
                                error={errors.email}
                            />
                            <InputField
                                label="Password"
                                type="password"
                                name="password"
                                error={errors.password}
                            />
                            <InputField
                                label="Confirm your password"
                                type="password"
                                name="password_confirmation"
                            />
                            
                            <div className="text-center mt-3">
                                <SubmitBtn
                                    processing={processing}
                                    isDirty={isDirty}
                                >
                                    Create a account
                                </SubmitBtn>
                            </div>

                            <p className="flex">
                                Already have an account? 
                                <Link href={route('login')}>
                                    <TextLink>Sign in</TextLink>
                                </Link>
                            </p>
                            
                            
                        </>)}
                    </Form>
                </div>
            </div>
            <div
                style={{ backgroundImage: "url('/images/font-home.png')" }}
            ></div>
        </div>
    )
}

Register.layout = null;