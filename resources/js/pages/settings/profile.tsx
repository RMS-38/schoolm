import { Head, router, usePage } from "@inertiajs/react";
import { Check, CircleUserRound, RotateCcw } from "lucide-react";
import {  useEffect, useRef, useState } from "react";
import type {SyntheticEvent} from "react";
import { toast } from "sonner";
import { UserEmail } from "@/components/settings/user-email";
import { UserName } from "@/components/settings/user-name";
import { UserPassword } from "@/components/settings/user-password";
import { UserTheme } from "@/components/settings/user-theme";

import { Card } from "@/components/ui/card";
import {  useRoute } from "ziggy-js";

export default function ProfileSetting() {
    const { props,flash } = usePage();
    const route = useRoute();
    
    const user = props.auth.user
    const currentImage = user.avatar ? user.avatar : null;
    
    const [avatar, setAvatar] = useState(currentImage);
    const [showAvatarBtn, setShowAvatarBtn] = useState(false);
    const avatarInput = useRef<HTMLInputElement|null>(null)

    if (flash.status) {
        toast.success(flash.status, { position: 'top-right' });
    }

    const selectImage = (e: SyntheticEvent<HTMLInputElement>) => {
        const target = e.currentTarget;

        if (target.files && target.files[0]){
            setAvatar(URL.createObjectURL(target.files[0]));
            setShowAvatarBtn(true);
        }
    }
    const cancelImage = () => {
        setAvatar(currentImage);
        setShowAvatarBtn(false);

        if (avatarInput.current) {
            avatarInput.current.value = "";
        }
    }

    const saveImage = () => {

        if (avatarInput.current?.files?.[0]) {
            const formData = new FormData();
            formData.append('avatar', avatarInput.current.files[0]);
            router.patch(route('setting.avatar'), formData, {
                forceFormData: true,
                onSuccess: () => {
                    setShowAvatarBtn(false);
                }
            });
        }
    }

    useEffect(() => {
    return () => {
        if (avatar) {
            URL.revokeObjectURL(avatar);
        }
    };
}, [avatar]);

    
    return (
        <>
            <Head title="Settings" />
            <h1 className="mx-10 mb-4 -mt-7.5 text-2xl">Settings</h1>
            <Card className="flex gap-3 px-9 rounded-none border-none shadow-lg dark:shadow-zinc-800 
            w-full flex-col md:flex-row items-center justify-center">
                <div>
                    <div className="rounded-full overflow-hidden flex-none">
                        <label
                            htmlFor="avatar"
                            className="cursor-pointer relative"
                        >
                            {avatar ? <img
                                src={avatar}
                                alt={user.name}
                                className="w-30 h-30 object-cover object-center"
                            />: <CircleUserRound className="w-30 h-auto" />
                            }
                        </label>
                        <input
                            type="file"
                            id="avatar"
                            onChange={selectImage}
                            ref={avatarInput}
                            hidden
                        />
                    </div>
                    {showAvatarBtn &&<div
                        className="flex gap-3 justify-center items-center
                        rounded-full"
                    >
                        <button
                            onClick={cancelImage}
                            className="text-red-400 p-1 hover:bg-zinc-900/35 rounded-full "
                        >
                            <RotateCcw />
                        </button>
                        <button
                            onClick={saveImage}
                            className="text-green-400 p-1 hover:bg-zinc-900/35 rounded-full"
                        >
                            <Check />
                        </button>
                    </div>}
                </div>
                <div className="w-full flex-1 mx-5 space-y-4">
                    <h1 className="font-medium text-2xl">{user.name}</h1>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
            </Card>

            <div
                className="w-full h-auto p-4 grid grid-cols-1 gap-3 md:grid-cols-2 mt-3"
            >
                <UserTheme userTheme={ user.theme } />
                <UserName user={ user } />
                
                <div><UserEmail user={ user } /></div>
                <UserPassword user={user} />
            </div>
        </>
    )
}