'use client';

import PopularCategorySlider from '@/components/pages/home/popularCategorySlider'
import { useEffect, useState } from 'react';

type ICategory = {
    id: string;
    title: string;
    isActive?: boolean;
}

const categoriesData: ICategory[] = [
    {
        id: "1",
        title: "Women Clothing",
        // isActive: true;
    },
    {
        id: "2",
        title: "Men Clothing"
    },
    {
        id: "3",
        title: "Electronics"
    },
    {
        id: "4",
        title: "Beauty & Personal Care"
    }
]




export default function FilterProduct() {
    const [categories, setCategories] = useState<ICategory[]>([]);


    useEffect(() => {


        setCategories(categoriesData.map((data, index) => {
            if (index == 0) {
                return {
                    ...data,
                    isActive: true,
                }
            }

            return {
                ...data,
                isActive: false,
            }
        }))

    }, []);

    const handleClick = (id: string) => {
        setCategories(categories.map(category => {
            if (category.id == id) {
                return {
                    ...category,
                    isActive: true
                }
            }

            return {
                ...category,
                isActive: false
            }
        }))
    }

    const activeCategoryId = () => {
        if (categories.length == 0) {
            return null;
        };

        const activeCategory = categories.find(cat => cat.isActive);

        if (!activeCategory) {
            return null;
        }

        return activeCategory.id;

    }

    return (
        <>
            <div className="my-container mt-12">
                <div className="flex items-end border-b-2 border-gray-200">

                    <div className="mr-auto">
                        <div className="flex gap-x-5 -mb-0.5">
                            {categories.map((category) => {
                                if (category.isActive) {
                                    return (
                                        <span onClick={() => handleClick(category.id)} key={category.id} className="block py-2 h-full font-semibold border-b-2 border-primary duration-300 text-primary cursor-pointer hover:decoration-transparent rounded-none hover:text-primary"  >{category.title}</span>
                                    )
                                } else {
                                    return (
                                        <span onClick={() => handleClick(category.id)} key={category.id} className="block py-2 font-semibold text-black/70 border-b-2 border-transparent duration-300 hover:border-primary cursor-pointer hover:decoration-transparent rounded-none"  >{category.title}</span>
                                    )
                                }
                            })}

                        </div>
                    </div>




                </div>
            </div>

            <PopularCategorySlider categoryId={activeCategoryId()} />

        </>
    )
}
