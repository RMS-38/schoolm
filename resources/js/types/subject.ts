import type{ Paginated } from "./paginated";

export type Subject = {
    id: number;
    name: string;
    weight: number;
    desc: string;
    created_at: string
    updated_at: string
}

export type Subjects = Paginated<Subject>;