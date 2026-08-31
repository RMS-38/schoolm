import type { User } from "@/types"
import { ProfileForm } from "./profile-form"
export const UserEmail = ({ user }: { user: User }) => { 
    return (
        <>
            <ProfileForm
                title="Email"
                label="Email"
                name="email"
                routeName="setting.email"
                userId={user.id}
                defaultValue={user.email}
                verifyEmail={user.email_verified_at === null}
            />
        </>
    )
}