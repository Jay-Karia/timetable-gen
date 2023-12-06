import {Link} from "@nextui-org/react";

function Footer() {
    return (
        <div className={"absolute border-2 p-3 bottom-0 w-full"}>
                <h3 className="text-md float-right">
                    developed by{' '}
                    <Link underline={"hover"} target={"_blank"} href="https://github.com/Jay-Karia" className="text-md">
                        Jay Karia
                    </Link>
                </h3>
        </div>
    );
}

export default Footer;