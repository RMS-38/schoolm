import type{ Grade } from "./grade";
import type{ Paginated } from "./paginated";

export type Student = {
    id: number;
    grade_id: number;
    name: string;
    gender: string;
    dob: string;
    pob: string;
    address: string;
    email: string;
    phone: string;
    photo?: string;
    created_at: string;
    updated_at: string
}

export type Students = Paginated<Student>;

export type StudentWithGrade = Student & { grade: Grade };
export type StudentsWithGrade = Paginated<StudentWithGrade>;