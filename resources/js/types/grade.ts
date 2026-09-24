import type{ User } from "./auth";
import type{ Paginated } from "./paginated";

export type Grade = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    user?: User;
}

export type Grades = Paginated<Grade>;

