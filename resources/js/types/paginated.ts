export type Paginated<T> = {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

export type Link = {
    active: boolean;
    label: string;
    page: number;
    url: string;
}