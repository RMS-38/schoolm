import { Form, Link } from "@inertiajs/react";
import { InputField } from "@/components/InputField";
import { Logo } from "@/components/logo";
import { SubmitBtn } from "@/components/submit-btn";
import { TextLink } from "@/components/text-link";
import { useRoute } from "ziggy-js";


export default function Login() {
    const route = useRoute();

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col items-center gap-4 p-6 md:p-10">
                
                <Logo width={15}/>

                <div className="flex flex-col w-3/4 items-center justify-center gap-1">
                    <h1 className="font-bold text-xl md:text-2xl text-center"
                    >
                        Login to your account
                    </h1>
                    <p
                        className="text-muted-foreground text-xs lg:text-sm text-balance text-center"
                    >
                        Enter your email below to login to your account
                    </p>

                    <Form
                        action={route('login')}
                        method="post"
                        className="w-full space-y-5"
                        resetOnSuccess
                        resetOnError={['password', 'password_confirmation']}
                    >
                        {({processing, errors, isDirty}) => (<>
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
                            
                            <div className="text-center mt-3">
                                <SubmitBtn
                                    type="submit"
                                    processing={processing}
                                    isDirty={isDirty}
                                >
                                    Login
                                </SubmitBtn>
                            </div>

                            <div className="flex text-sm w-full justify-between items-center">
                                
                                <p className="flex">
                                    Don't have an account?  
                                    <Link href={route('register')}>
                                        <TextLink>Sign up</TextLink>
                                    </Link>
                                </p>

                                <p>
                                    <Link href={route('password.request')}>
                                        <TextLink>Forgot your password?</TextLink>
                                    </Link>
                                </p>
                            </div>
                            
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

Login.layout = null;