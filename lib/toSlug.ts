/**
 * Convert a string into a URL-friendly slug
 *
 * @example
 * slugify("Hello World!") // "hello-world"
 * slugify("  Déjà Vu  ")  // "deja-vu"
 */
export function slugify(
    text: string,
    options?: {
        lower?: boolean
        strict?: boolean
        replacement?: string
    }
): string {
    const {
        lower = true,
        strict = true,
        replacement = '-',
    } = options || {}

    const slug = text
        .normalize('NFKD')                 // normalize accented characters
        .replace(/[\u0300-\u036f]/g, '')   // remove diacritics
        .replace(/[^a-zA-Z0-9\s-]/g, strict ? '' : '$&')
        .trim()
        .replace(/\s+/g, replacement)
        .replace(new RegExp(`${replacement}{2,}`, 'g'), replacement)

    return lower ? slug.toLowerCase() : slug
}
