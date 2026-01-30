/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import apiUrl from "@/lib/apiUrl";

export const getSlider = async () => {
    try {
        const res = await fetch(apiUrl("/slider"));
        const json = await res.json();
        return json;
    } catch (error) {
        return false;
    }
}