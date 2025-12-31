import PublicMainMenu from "@/components/public/mainMenu";
import Navbar from "@/components/public/Navbar";
import { MapPin } from "lucide-react";
import Link from "next/link";

function PublicHeader() {
    return (
        <>
            <div className="bg-primary py-2">
                <div className="my-container">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <Link className="flex text-white" href={"/"}>
                            <MapPin color="white" />
                            Track order
                        </Link>
                        <div className="flex gap-x-3 text-white">
                            <a className="border-r pr-3" href="tel:01728619733">01728619733</a>
                            <Link href={"/"}>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
            <PublicMainMenu />
            <Navbar />
        </>
    );
}

export default PublicHeader;