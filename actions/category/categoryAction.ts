"use server";

import apiUrl from "@/lib/apiUrl";

export const getCategories = async () => {
    const res = await fetch(apiUrl('/category'));
    const json = await res.json();

    return json;
}