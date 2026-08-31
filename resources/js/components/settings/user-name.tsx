import type { User } from "@/types"
import { ProfileForm } from "./profile-form"
export const UserName = ({ user }: { user: User }) => { 
    return (
        <>
            <ProfileForm
                title="Name"
                label="Name"
                name="name"
                routeName="setting.name"
                userId={user.id}
                defaultValue={user.name}
            />
        </>
    )
}