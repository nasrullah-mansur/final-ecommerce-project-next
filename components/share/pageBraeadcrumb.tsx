import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { IBraeadcrumb } from '@/type/type'
import { House } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function PageBraeadcrumb({ pages }: { pages: IBraeadcrumb[] }) {
    return (
        <div className="bg-white py-3 border-b border-t">
            <div className="my-container">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link className="flex items-center gap-x-1" href="/"><House size={16} /> Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />

                        {pages.map((page, index) => {

                            if (index == pages.length - 1) {
                                return (
                                    <BreadcrumbItem key={index}>
                                        <BreadcrumbPage>{page.label}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                )
                            }


                            return (
                                <React.Fragment key={index}>
                                    <BreadcrumbItem >
                                        <BreadcrumbLink asChild>
                                            <Link href={page.href ? page.href : "/"}>{page.label}</Link>
                                        </BreadcrumbLink>

                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                </React.Fragment>
                            )

                        })}



                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    )
}
