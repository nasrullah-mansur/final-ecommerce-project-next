import { create } from 'zustand'

type ICategory = {
    id: string;
    title: string;
    link: string;
    image: string;
    isActive: boolean;
    children: ICategory[]
}

type ICategoryStore = {
    isActive: boolean;
    categories: ICategory[],
    updateActive: (value: boolean) => void;
    updateCategories: (data: ICategory[]) => void;
}

export const useNavigationStore = create<ICategoryStore>((set) => ({
    isActive: false,
    categories: [],
    updateActive: (value) => set({ isActive: value }),
    updateCategories: (data) => set({ categories: data })
}));