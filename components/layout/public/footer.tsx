

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ChevronRight, Facebook, Linkedin, MailIcon, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function PublicFooter() {
    return (
        <div className="bg-white pt-16">
            <div className="my-container">
                <div className="grid md:grid-cols-3 gap-x-5">
                    <div>
                        <h4 className="text-lg font-semibold">Get In Touch</h4>
                        <span className="block h-0.5 bg-gray-200 mt-2 mb-5">
                            <span className="block w-20 h-0.5 bg-primary"></span>
                        </span>

                        <p className="mb-2">Address: 514 S. Magnolia St. Orlando, FL 32806, USA</p>

                        <p><strong>Phone:</strong> 453876234</p>
                        <p><strong>Email:</strong> demoemail123@gmail.com</p>
                        <p>Saturday-Sunday :: 9:27 PM - 9:27 PM</p>

                        <ul className="py-5 flex gap-x-2">
                            <li>
                                <a href="#" className="w-9 h-9 bg-primary rounded flex justify-center items-center btn-animate">
                                    <Facebook className="text-white w-5" />
                                </a>
                            </li>

                            <li>
                                <a href="#" className="w-9 h-9 bg-primary rounded flex justify-center items-center btn-animate">
                                    <Twitter className="text-white w-5" />
                                </a>
                            </li>

                            <li>
                                <a href="#" className="w-9 h-9 bg-primary rounded flex justify-center items-center btn-animate">
                                    <Youtube className="text-white w-5" />
                                </a>
                            </li>

                            <li>
                                <a href="#" className="w-9 h-9 bg-primary rounded flex justify-center items-center btn-animate">
                                    <Linkedin className="text-white w-5" />
                                </a>
                            </li>
                        </ul>

                    </div>

                    <div>
                        <h4 className="text-lg font-semibold">Useful Links</h4>
                        <span className="block h-0.5 bg-gray-200 mt-2 mb-5">
                            <span className="block w-20 h-0.5 bg-primary"></span>
                        </span>

                        <ul className="flex flex-col gap-y-1.5">
                            <li>
                                <Link className="flex hover:text-primary" href={"/"}><ChevronRight className="mt-1" size={18} /> Faq</Link>
                            </li>
                            <li>
                                <Link className="flex hover:text-primary" href={"/"}><ChevronRight className="mt-1" size={18} /> About Us</Link>
                            </li>
                            <li>
                                <Link className="flex hover:text-primary" href={"/"}><ChevronRight className="mt-1" size={18} /> Privacy Policy</Link>
                            </li>
                            <li>
                                <Link className="flex hover:text-primary" href={"/"}><ChevronRight className="mt-1" size={18} /> Terms & Service</Link>
                            </li>
                            <li>
                                <Link className="flex hover:text-primary" href={"/"}><ChevronRight className="mt-1" size={18} /> Return Policy</Link>
                            </li>
                            <li>
                                <Link className="flex hover:text-primary" href={"/"}><ChevronRight className="mt-1" size={18} /> How It Works</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold">Newsletter</h4>
                        <span className="block h-0.5 bg-gray-200 mt-2 mb-5">
                            <span className="block w-20 h-0.5 bg-primary"></span>
                        </span>

                        <form>
                            <InputGroup className="rounded-none">
                                <Input
                                    className="border-0 focus:outline-0 focus:border-0 focus:shadow-none"
                                />
                                <InputGroupAddon>
                                    <MailIcon />
                                </InputGroupAddon>

                            </InputGroup>

                            <Button className="w-full mt-3 rounded-sm cursor-pointer btn-animate">Subscribe</Button>
                        </form>

                        <p className="py-4">Subscribe to our Newsletter to receive early discount offers, latest news, sales and promo information.</p>

                        <Image
                            src={"/cards.png"}
                            alt="card image"
                            width={300}
                            height={50}
                        />
                    </div>

                </div>

                <p className="py-6 border-t text-center">
                    OmniMart © All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default PublicFooter;