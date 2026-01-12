export default function apiUrl(url: string) {
    return process.env.NEXT_PUBLIC_API_URL + url;
}