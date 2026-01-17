export function slugify(title: string) {
    return title
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-')   // Replace spaces & non-word chars with -
        .replace(/^-+|-+$/g, '');   // Remove leading/trailing hyphens
}
