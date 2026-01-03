import { UserTable } from "@/components/dashboard/user/userTable";
import PageTitle from "@/components/share/dashboard/pageTitle";

export default function Users() {
    return (
        <>
            <PageTitle
                title="System User"
            />

            <UserTable />
        </>
    )
}
