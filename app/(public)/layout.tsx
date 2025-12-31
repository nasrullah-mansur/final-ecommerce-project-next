import PublicMainLayout from "@/components/layout/public/mainLayout";
import { ReactNode } from "react";

function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <PublicMainLayout>
            {children}
        </PublicMainLayout>
    );
}

export default PublicLayout;