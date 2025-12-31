import { create } from 'zustand'

type ICategoryStore = {
    preview: "grid" | "list";
    setPreview: (value: "grid" | "list") => void;
}

export const useProductPreviewStore = create<ICategoryStore>((set) => ({
    preview: "grid",
    setPreview: (value) => set({ preview: value }),
}));