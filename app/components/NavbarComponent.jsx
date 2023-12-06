import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import {Logo} from "./Logo";
import {auth, UserButton} from "@clerk/nextjs";
import Link from "next/link";

function NavbarComponent() {
    const {userId} = auth();
    return (
        <>
            <Navbar isBordered className={"bg-gray-50 border-1"}>
                <NavbarBrand>
                    <Logo />
                    <p className="font-bold text-inherit">TimeTable Gen</p>
                </NavbarBrand>
                <NavbarContent justify="end">
                    {userId ? (<NavbarItem>
                        <UserButton afterSignOutUrl={"/"}/>
                    </NavbarItem>) : (
                        <>
                            <NavbarItem className="hidden lg:flex">
                                <Link href="/sign-in">
                                    <Button color="primary" variant="light">
                                        Sign In
                                    </Button>
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link href="/sign-up">
                                    <Button color="primary" variant="flat">
                                        Sign Up
                                    </Button>
                                </Link>
                            </NavbarItem>
                        </>
                    )}
                </NavbarContent>
            </Navbar>
        </>
    );
}

export default NavbarComponent;