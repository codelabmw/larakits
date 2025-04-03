import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// Custom types
interface Tag {
    slug: string;
    name: string;
}

interface Stack {
    slug: string;
    name: string;
}

interface Author {
    name?: string;
    email?: string;
    role?: string
}

interface Kit {
    slug: string;
    name: string;
    vendor: string;
    description: string;
    stars: number;
    downloads: number;
    tags: Tag[];
    stacks: Stack[];
    maintainers: Array<{
        name: string;
        avatar_url: string;
    }>;
    authors: Author[];
    licenses: string[];
}

export type Paginator<T> = {
    data: Array<T>;
    from: number;
    links: Array<Link>;
    path: string;
    to: number;
    total: number;

    current_page: number;
    first_page_url: string;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    per_page: number;
    prev_page_url: string | null;
};

export type PaginatorLink = {
    url: string | null;
    label: string;
    active: boolean;
}
