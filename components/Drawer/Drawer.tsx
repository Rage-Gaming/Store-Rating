import * as React from "react"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

type DrawerDemoProps = {
    show: boolean
    onClose?: () => void
    data: any
}

export default function DrawerDemo({ show, onClose, data }: DrawerDemoProps) {

    return (
        <Drawer
            defaultOpen
            onOpenChange={(open) => {
                if (!open && onClose) {
                    onClose()
                }
            }}
        >
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>User Details</DrawerTitle>
                        <DrawerDescription>
                            You can view user details here.
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="p-8 pb-0">
                        <h1>Name : {data.username}</h1>
                        <h1>Email : {data.email}</h1>
                        <h1>Address : {data.address}</h1>
                        <h1>Role : {data.roleLabel}</h1>
                        {data.stores && (
                            <h1>
                                Stores : {JSON.parse(data.stores).join(", ")}
                            </h1>
                        )}

                    </div>

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
