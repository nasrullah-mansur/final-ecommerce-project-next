import CommonFilter from '@/components/pages/shop/commonFilter';
import FilterByCategory from '@/components/pages/shop/filterByCategory';
import FilterByPrice from '@/components/pages/shop/filterByPrice';
import ProductFilterTop from '@/components/pages/shop/productFilterTop';
import ProductList from '@/components/pages/shop/productList';
import PageBraeadcrumb from '@/components/share/pageBraeadcrumb'
import { IBraeadcrumb } from '@/type/type';

export default async function ShopPage() {

    const pages: IBraeadcrumb[] = [
        {
            label: "Shop",
            href: "/shop"
        }
    ];

    return (
        <>
            <PageBraeadcrumb pages={pages} />
            <ProductFilterTop />

            <div className="grid grid-cols-4 gap-4 my-container">
                <div className="col-span-1">
                    <div className="bg-white p-4 mb-5">
                        <h3 className="font-semibold text-xl border-b-2 pb-2">Shop Categories</h3>

                        <FilterByCategory />
                    </div>

                    <div className="bg-white p-4 mb-5">
                        <h3 className="font-semibold text-xl border-b-2 pb-2">Filter by Price</h3>

                        <FilterByPrice />
                    </div>

                    <div className="bg-white p-4 mb-5">
                        <h3 className="font-semibold text-xl border-b-2 pb-2">Filter by Color</h3>

                        <CommonFilter
                            data={["red", "green", "blue"]}
                            param_text="filter_by_color"
                        />
                    </div>

                    <div className="bg-white p-4 mb-5">
                        <h3 className="font-semibold text-xl border-b-2 pb-2">Filter by Size</h3>

                        <CommonFilter
                            data={["M", "L", "XL"]}
                            param_text="filter_by_size"
                        />
                    </div>

                    <div className="bg-white p-4 mb-5">
                        <h3 className="font-semibold text-xl border-b-2 pb-2">Filter by Brand</h3>

                        <CommonFilter
                            data={[
                                "Adidas",
                                "Lavie",
                                "Skyart",
                                "Nike",
                                "Samsung",
                                "Yamaha",
                                "H.M",
                                "Loreal",
                                "Ascis",
                            ]}
                            param_text="filter_by_brand"
                        />


                    </div>
                </div>

                <div className="col-span-3">
                    <ProductList />
                </div>
            </div>
        </>
    )
}
