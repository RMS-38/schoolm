import { Link } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";

interface item{
    title: string;
    routeName: string;
    params?: number;
    currentPage?:boolean
}

interface Props{
    items: item[]
}
export const BreadCrumb = ({ items }: Props) => {
    const route = useRoute();
    const normalizedItems = items.map((item) => ({
        ...item,
        currentPage: item.currentPage ?? false
    }))
    
    return (
        <Breadcrumb>
            <BreadcrumbList>
                
                {normalizedItems.map((item, i) => {

                    return (
                    <div key={i} className="flex items-center gap-1">
                        <BreadcrumbItem>
                            {item.currentPage
                                ? <BreadcrumbPage>{ item.title }</BreadcrumbPage>
                                :<><BreadcrumbLink render={
                                        <Link
                                            href={item.params
                                                ? route(item.routeName, item.params)
                                                :route(item.routeName)}
                                        >
                                            {item.title}
                                        </Link>
                                    }
                                    />
                                    
                                </>
                            }
                        </BreadcrumbItem>
                        {!item.currentPage&&<BreadcrumbSeparator />}
                    </div>)
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}