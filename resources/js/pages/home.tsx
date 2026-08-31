import { Head, Link, usePage } from '@inertiajs/react';
import { UserKey, UserPlus } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import HomeLayout from '@/layouts/home-layout';
import type { AuthProps } from '@/types';
import { useRoute } from 'ziggy-js';
// import bgImage from '/images/font-home.png';

export default function Home() {
    const route = useRoute();
    const { props } = usePage<AuthProps>();

    return (
        <div
            className='min-w-screen min-h-screen bg-emerald-950/90 flex flex-col p-10 
            items-center justify-start space-y-3 md:space-y-6 lg:space-y-10'
        >
            <Head title="Home" />
            <h1
                className='font-bold  text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-10 text-emerald-100'
            >
                Welcome to StudentManager
            </h1>
            <p className='font-medium text-white text-xl md:text-2xl  lg:text-3xl'>
                A simple and efficient platform to manage your students, classes, and grades.
            </p>
            <p className='text-sm md:text-xl lg:text-2xl text-white font-medium'>Log in to start organizing your school today.</p>
            {props.auth.user
                ?<Link
                    href={route('grade.index')}
                    className={`${buttonVariants({ size: 'lg' })} flex gap-2`}
                >
                    Dashboard
                </Link>
                :
                <div className='space-x-3 font-bold'>
                <Link
                    href={route('login')}
                    className={`${buttonVariants({ size: 'lg' })} flex gap-2`}
                >
                    <span className='font-bold'>Sign in</span>
                    <UserKey />
                </Link>
                <Link
                    href={route('register')}
                    className={`${buttonVariants({ variant: "secondary", size: "lg" })} flex gap-2`}
                >
                    <span className='font-bold'> Sign up</span>
                    <UserPlus />
                </Link>
            </div>}
        </div>
    );
}

Home.layout = (page:any) => <HomeLayout>{page}</HomeLayout>