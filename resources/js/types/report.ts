import type{ Paginated } from "./paginated";

export type Report = {
    id: number;
    name: string;
    marks: Mark[];
    total: number;
    average: number;
    rank: number;
}

export type Reports = Paginated<Report>

export type Mark = {
    subject: string;
    subject_id: number;
    weight: number;
    value: number;
}

export type ReportYear = {
    id: number;
    name: string;
    rank: number;
    terms: number[];
    year_average: number;
}


export type ReportYears = Paginated<ReportYear>;