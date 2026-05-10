export type Category = { _id: string; name: string; slug: string; imageUrl?: string; order: number; createdAt?: string; updatedAt?: string; };
export type SubCategory = { _id: string; name: string; slug: string; categoryId: string | Category; order: number; createdAt?: string; updatedAt?: string; };
export type Product = { _id: string; title: string; slug: string; price?: number; shortDescription: string; description: string; imageUrl: string; categoryId: string | Category; subCategoryId?: string | SubCategory; specs?: { key: string; value: string }[]; createdAt?: string; updatedAt?: string; };
export type Banner = { _id: string; title: string; subtitle?: string; imageUrl: string; link?: string; order: number; createdAt?: string; updatedAt?: string; };
export type ApiResponse<T> = { data: T } | { error: string };
