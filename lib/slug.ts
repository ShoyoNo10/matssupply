export function slugify(input: string): string {
  return input.trim().toLowerCase().replace(/ө/g,"u").replace(/ү/g,"u").replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"");
}
