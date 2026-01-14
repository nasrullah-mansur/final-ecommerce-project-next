import { UserTable } from "@/components/dashboard/user/userTable";
import PageTitle from "@/components/share/dashboard/pageTitle";

export default async function Users() {

    const data = await fetch("http://localhost:3000/api/user");
    const json = await data.json();

    return (
        <>
            <PageTitle
                title="System User"
            />

            <UserTable data={json.data} />
        </>
    )
}
