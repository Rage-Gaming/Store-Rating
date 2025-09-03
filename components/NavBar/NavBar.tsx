'use client'

import DropdownMenuComponent from "@/components/Dropdown/dropdown";
import DialogInputBox from "@/components/Dialog/dialogInputBox";
import { useUser } from "@/app/context/UserContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { redirect } from 'next/navigation';
import { useState } from "react";
import Loader from "../Loader/loader";

type NavBarProps = {
    name: string | null;
    title: string;
};

export default function Navbar({ name, title }: NavBarProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");
    const { email } = useUser();
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!currentPassword || !newPassword || !repeatNewPassword) {
            setError("All fields are required");
            return false;
        }
        if (newPassword !== repeatNewPassword) {
            setError("Passwords do not match");
            return false;
        }

        const response = await fetch("/api/update-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                currentPassword,
                newPassword,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message || "Failed to update password");
            return false;
        }
        setError(null);
        setCurrentPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
        return true;
    };

    return (
        <div className="h-20 bg-zinc-900 flex items-center justify-between shadow-md px-21">
            {loading && <Loader show={loading} />}
            <h1 className="text-white text-3xl text-center font-bold">{title}</h1>
            <DropdownMenuComponent
                buttonName={name ?? "User"}
                items={[
                    {
                        label: "Update password",
                        onSelect: () => {
                            setOpenDialog(true)
                        },
                    },
                    {
                        label: "Logout",
                        onSelect: async () => {
                            setLoading(true);
                            await fetch("/api/logout", {
                                method: "POST",
                                credentials: "include",
                            });
                            setLoading(false);
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
                onSave={handleSave}
            >
                {error && <h1 className="text-[#e40202] ">{error}</h1>}

                <div className="grid gap-3 mt-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                        placeholder="Enter current password"
                        id="current-password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>

                <div className="grid gap-3 mt-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                        placeholder="Enter new password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div className="grid gap-3 mt-2">
                    <Label htmlFor="repeat-password">Repeat New Password</Label>
                    <Input
                        placeholder="Repeat new password"
                        id="repeat-password"
                        value={repeatNewPassword}
                        onChange={(e) => setRepeatNewPassword(e.target.value)}
                    />
                </div>
            </DialogInputBox>

        </div>
    )
}