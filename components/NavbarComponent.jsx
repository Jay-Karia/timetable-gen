import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import {Logo} from "./Logo";
import Link from "next/link";

function NavbarComponent() {
    return (
        <>
            <Navbar isBordered className={"bg-gray-50 border-1"}>
                <NavbarBrand>
                    <Logo />
                    <p className="font-bold text-inherit">TimeTable Gen</p>
                </NavbarBrand>
                <NavbarContent justify="end">
                </NavbarContent>
            </Navbar>
        </>
    );
}

export default NavbarComponent;