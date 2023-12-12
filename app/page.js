import {Button} from '@nextui-org/react';
import Link from 'next/link';

export default function Page() {
    return (
        <div className={"m-4"}>
            <Link href={"/dashboard"}>
                <Button color={"primary"} variant={"solid"}>Go to Dashboard</Button>
            </Link>
        </div>
    )
}