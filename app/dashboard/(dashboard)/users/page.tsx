import { UserTable } from "@/components/dashboard/user/userTable";
import PageTitle from "@/components/share/dashboard/pageTitle";

type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

// const data: Payment[] = [
//     {
//         id: "m5gr84i9",
//         amount: 316,
//         status: "success",
//         email: "ken99@example.com",
//     },
//     {
//         id: "3u1reuv4",
//         amount: 242,
//         status: "success",
//         email: "Abe45@example.com",
//     },
//     {
//         id: "derv1ws0",
//         amount: 837,
//         status: "processing",
//         email: "Monserrat44@example.com",
//     },
//     {
//         id: "5kma53ae",
//         amount: 874,
//         status: "success",
//         email: "Silas22@example.com",
//     },
//     {
//         id: "bhqecj4p",
//         amount: 721,
//         status: "failed",
//         email: "carmella@example.com",
//     },
// ]



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
