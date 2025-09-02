'use client'

import DropdownMenuComponent from "@/components/Dropdown/dropdown";
import DialogInputBox from "@/components/Dialog/dialogInputBox";
import { useState } from "react";
import { redirect } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type NavBarProps = {
    name: string;
    title: string;
};

export default function Navbar({ name, title }: NavBarProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");

    const handleSave = () => {
        if (!currentPassword || !newPassword || !repeatNewPassword) {
            setError("All fields are required");
            return;
        }
        if (newPassword !== repeatNewPassword) {
            setError("Passwords do not match");
            return;
        }
        setError(null);
    };

    return(
        <div className="h-20 bg-zinc-900 flex items-center justify-between shadow-md px-21">
            <h1 className="text-white text-3xl text-center font-bold">{title}</h1>
            <DropdownMenuComponent
                buttonName={name}
                items={[
                    {
                        label: "Update password",
                        onSelect: () => {
                            setOpenDialog(true)
                        },
                    },
                    {
                        label: "Logout",
                        onSelect: () => {
                            redirect('/login')
                        },
                    },
                ]}
            />
            <DialogInputBox
                open={openDialog}
                onOpenChange={setOpenDialog}
                title="Update Password"
                description="This will update your account password."
                onSave={() => handleSave()}
            >
                {error && <h1 className="text-[#e40202]">{error}</h1>}
                <div className="grid gap-3">
                    <Label htmlFor="name" defaultValue={currentPassword}>Current Password</Label>
                    <Input placeholder="Enter current password" id="name" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="username" defaultValue={newPassword}>New Password</Label>
                    <Input placeholder="Enter new password" id="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="username" defaultValue={repeatNewPassword}>Repeat New Password</Label>
                    <Input placeholder="Repeat new password" id="password_repeat" value={repeatNewPassword} onChange={(e) => setRepeatNewPassword(e.target.value)} />
                </div>

            </DialogInputBox>
        </div>
    )
}