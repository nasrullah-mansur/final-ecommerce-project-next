import PublicFooter from "@/components/layout/public/footer";
import PublicHeader from "@/components/layout/public/header";
import { ReactNode } from "react";

function PublicMainLayout({ children }: { children: ReactNode }) {

    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <div className="flex-1 bg-gray-100">
                {children}
            </div>
            <PublicFooter />
        </div>
    );
}

export default PublicMainLayout;