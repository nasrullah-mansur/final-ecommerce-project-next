import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigationStore } from '@/store/navigation.store'
import { ChevronDown, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react';

const categoriesData = [
    {
        id: "1",
        title: "Women clothing",
        link: "/women-clothing",
        image: "/images/categories/women.jpg",
        isActive: false,
        children: [
            {
                id: "23",
                title: "2 Outerwear & Jackets",
                link: "/men-clothing/outerwear-jackets",
                image: "/images/categories/outerwear.jpg",
                isActive: false,
                children: [
                    {
                        id: "24",
                        title: "2 Outerwear & Jackets",
                        link: "/men-clothing/outerwear-jackets/outerwear-jackets",
                        image: "/images/categories/outerwear.jpg",
                        isActive: false,
                        children: []
                    },
                    {
                        id: "25",
                        title: "2 Bottoms",
                        link: "/men-clothing/outerwear-jackets/bottoms",
                        image: "/images/categories/bottoms.jpg",
                        isActive: false,
                        children: []
                    },
                    {
                        id: "26",
                        title: "2 Underwear",
                        link: "/men-clothing/outerwear-jackets/underwear",
                        image: "/images/categories/underwear.jpg",
                        isActive: false,
                        children: []
                    },
                    {
                        id: "27",
                        title: "2 Accessories",
                        link: "/men-clothing/outerwear-jackets/accessories",
                        image: "/images/categories/accessories.jpg",
                        isActive: false,
                        children: []
                    }
                ]
            },
            {
                id: "8",
                title: "Bottoms",
                link: "/men-clothing/bottoms",
                image: "/images/categories/bottoms.jpg",
                isActive: false,
                children: []
            },
            {
                id: "9",
                title: "Underwear",
                link: "/men-clothing/underwear",
                image: "/images/categories/underwear.jpg",
                isActive: false,
                children: []
            },
            {
                id: "10",
                title: "Accessories",
                link: "/men-clothing/accessories",
                image: "/images/categories/accessories.jpg",
                isActive: false,
                children: []
            }
        ]
    },
    {
        id: "2",
        title: "Men clothing",
        link: "/men-clothing",
        image: "/images/categories/men.jpg",
        isActive: false,
        children: [
            {
                id: "3",
                title: "Outerwear & Jackets",
                link: "/men-clothing/outerwear-jackets",
                image: "/images/categories/outerwear.jpg",
                isActive: false,
                children: [
                    {
                        id: "4",
                        title: "Outerwear & Jackets",
                        link: "/men-clothing/outerwear-jackets/outerwear-jackets",
                        image: "/images/categories/outerwear.jpg",
                        isActive: false,
                        children: []
                    },
                    {
                        id: "5",
                        title: "Bottoms",
                        link: "/men-clothing/outerwear-jackets/bottoms",
                        image: "/images/categories/bottoms.jpg",
                        isActive: false,
                        children: []
                    },
                    {
                        id: "6",
                        title: "Underwear",
                        link: "/men-clothing/outerwear-jackets/underwear",
                        image: "/images/categories/underwear.jpg",
                        isActive: false,
                        children: []
                    },
                    {
                        id: "7",
                        title: "Accessories",
                        link: "/men-clothing/outerwear-jackets/accessories",
                        image: "/images/categories/accessories.jpg",
                        isActive: false,
                        children: []
                    }
                ]
            },
            {
                id: "8",
                title: "Bottoms",
                link: "/men-clothing/bottoms",
                image: "/images/categories/bottoms.jpg",
                isActive: false,
                children: []
            },
            {
                id: "9",
                title: "Underwear",
                link: "/men-clothing/underwear",
                image: "/images/categories/underwear.jpg",
                isActive: false,
                children: []
            },
            {
                id: "10",
                title: "Accessories",
                link: "/men-clothing/accessories",
                image: "/images/categories/accessories.jpg",
                isActive: false,
                children: []
            }
        ]
    },
    {
        id: "11",
        title: "Children",
        link: "/children",
        image: "/images/categories/children.jpg",
        isActive: false,
        children: []
    },
    {
        id: "12",
        title: "Electronics",
        link: "/electronics",
        image: "/images/categories/electronics.jpg",
        isActive: false,
        children: []
    }
];


export default function MobileNavigation() {

    const { isActive, updateActive, categories, updateCategories } = useNavigationStore();




    useEffect(() => {
        // fetching data from database;
        updateCategories(categoriesData)
    }, [updateCategories])

    const updateCollapse = (id: string) => {
        const updateCategoriesData = categories.map(cat => {
            if (cat.id == id) {
                return {
                    ...cat,
                    isActive: !cat.isActive
                }
            } else {
                return cat;
            }
        })

        updateCategories(updateCategoriesData)
    }


    return (
        <>
            {isActive &&
                <div className="w-[260px] shadow-xl fixed top-0 left-0 h-screen z-3 bg-white lg:hidden">
                    <div className="bg-primary h-10 flex items-center justify-between">
                        <h2 className="text-white pl-2 text-xl">Navigation</h2>
                        <X onClick={() => updateActive(false)} className="text-white mr-2 cursor-pointer" />
                    </div>
                    <div>
                        <Tabs defaultValue="menu" className="w-full">
                            <TabsList className="w-full rounded-none">
                                <TabsTrigger className="rounded-[5px]" value="menu">Menu</TabsTrigger>
                                <TabsTrigger className="rounded-[5px]" value="category">Category</TabsTrigger>
                            </TabsList>
                            <TabsContent value="menu">
                                <div>
                                    <ul className="pl-5 ">
                                        <li>
                                            <Link className="flex pr-3 items-center hover:text-primary" href={"/"}>Home</Link>
                                        </li>
                                        <li>
                                            <Link className="flex pr-3 items-center hover:text-primary" href={"/"}>Shop</Link>
                                        </li>
                                        <li>
                                            <Link className="flex pr-3 items-center hover:text-primary" href={"/"}>Campaign</Link>
                                        </li>
                                        <li>
                                            <Link className="flex pr-3 items-center hover:text-primary" href={"/"}>Blog</Link>
                                        </li>
                                        <li>
                                            <Link className="flex pr-3 items-center hover:text-primary" href={"/"}>
                                                Page
                                                <ChevronDown className="w-4 mt-1.5" />
                                            </Link>

                                            <ul className="bg-white p-3 shadow-lg border-t-3 border-t-primary mr-4 mb-2">
                                                <li>
                                                    <Link className="flex items-center gap-x-0.5 hover:text-primary" href={"/"}><ChevronRight width={20} />About us</Link>
                                                </li>
                                                <li>
                                                    <Link className="flex items-center gap-x-0.5 hover:text-primary" href={"/"}><ChevronRight width={20} />About us</Link>
                                                </li>
                                                <li>
                                                    <Link className="flex items-center gap-x-0.5 hover:text-primary" href={"/"}><ChevronRight width={20} />About us</Link>
                                                </li>
                                                <li>
                                                    <Link className="flex items-center gap-x-0.5 hover:text-primary" href={"/"}><ChevronRight width={20} />About us</Link>
                                                </li>
                                                <li>
                                                    <Link className="flex items-center gap-x-0.5 hover:text-primary" href={"/"}><ChevronRight width={20} />About us</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link className="flex pr-3 items-center hover:text-primary" href={"/"}>Contact</Link>
                                        </li>
                                    </ul>
                                </div>
                            </TabsContent>
                            <TabsContent value="category">
                                <div className="p-3 overflow-y-scroll h-[calc(100vh-100px)]">
                                    <ul>
                                        {categories.map(category => (
                                            <li key={category.id} className="flex flex-wrap justify-between group my-1">
                                                <Link className="flex group-hover:text-primary" href={"/"}><ChevronRight width={20} /> {category.title}</Link>
                                                {category.children.length > 0 &&
                                                    <>
                                                        <span onClick={() => updateCollapse(category.id)} className="w-6 h-6 bg-gray-200 flex justify-center items-center hover:bg-primary cursor-pointer">
                                                            <ChevronDown className="group-hover:text-primary hover:text-white" size={20} />
                                                        </span>

                                                        {category.isActive &&
                                                            <ul className="w-full border-l ml-5 pl-4">
                                                                {category.children.map(sub1 => (
                                                                    <li key={sub1.id} className="my-1 relative before:absolute before:w-2 before:border-t before:-left-4 before:opacity-40 before:top-3.5">
                                                                        <Link className="hover:text-primary" href={"/"}>{sub1.title}</Link>

                                                                        {sub1.children.length > 0 &&
                                                                            <ul className="w-full border-l pl-4">
                                                                                {sub1.children.map(sub2 => (
                                                                                    <li key={sub2.id} className="my-1 relative before:absolute before:w-2 before:border-t before:-left-4 before:opacity-40 before:top-3.5">
                                                                                        <Link className="hover:text-primary" href={"/"}>{sub2.title}</Link>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        }
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        }
                                                    </>
                                                }
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            }
        </>
    )
}
