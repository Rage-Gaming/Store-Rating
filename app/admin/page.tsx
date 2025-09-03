'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "../../components/NavBar/NavBar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import DrawerDemo from "../../components/Drawer/Drawer";

const mockUsersData = [
    {
        id: 1,
        userName: "John Doe",
        email: "john@example.com",
        address: "123 Main St",
        role: "owner",
        roleLabel: "Store Owner"
    },
    {
        id: 2,
        userName: "Jane Smith",
        email: "jane@example.com",
        address: "456 Elm St",
        role: "user",
        roleLabel: "Normal User"
    },
    {
        id: 3,
        userName: "Alice Johnson",
        email: "alice@example.com",
        address: "789 Oak St",
        role: "admin",
        roleLabel: "System Administrator"
    },
    {
        id: 4,
        userName: "Bob Brown",
        email: "bob@example.com",
        address: "123 Pine St",
        role: "user",
        roleLabel: "Normal User"
    },
    {
        id: 5,
        userName: "Charlie Green",
        email: "charlie@example.com",
        address: "456 Elm St",
        role: "user",
        roleLabel: "Normal User"
    },
    {
        id: 6,
        userName: "David Wilson",
        email: "david@example.com",
        address: "789 Oak St",
        role: "user",
        roleLabel: "Normal User"
    }
];

const mockStoreData = [
    {
        id: 1,
        name: "Store A",
        owner: "John Doe",
        address: "123 Main St",
        rating: 4.5
    },
    {
        id: 2,
        name: "Store B",
        owner: "Jane Smith",
        address: "456 Elm St",
        rating: 4.0
    },
    {
        id: 3,
        name: "Store C",
        owner: "Alice Johnson",
        address: "789 Oak St",
        rating: 3.5
    },
    {
        id: 4,
        name: "Store D",
        owner: "Bob Brown",
        address: "123 Pine St",
        rating: 4.2
    },
    {
        id: 5,
        name: "Store E",
        owner: "Charlie Green",
        address: "456 Elm St",
        rating: 4.8
    },
    {
        id: 6,
        name: "Store F",
        owner: "David Wilson",
        address: "789 Oak St",
        rating: 3.9
    }
]

export default function AdminPage() {
    const [activeSection, setActiveSection] = useState("Dashboard");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("any");
    const [drawer, setDrawer] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        address:"",
        password: "",
        role: ""
    });

    const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
    };

    const filteredUsers = mockUsersData.filter((user) => {
        return (
            user.userName.toLowerCase().includes(name.toLowerCase()) &&
            user.email.toLowerCase().includes(email.toLowerCase()) &&
            user.address.toLowerCase().includes(address.toLowerCase()) &&
            (role === "any" || user.role.toLowerCase() === role)
        );
    });

    const filteredStores = mockStoreData.filter((store) => {
        return (
            store.name.toLowerCase().includes(name.toLowerCase()) &&
            store.owner.toLowerCase().includes(email.toLowerCase()) &&
            store.address.toLowerCase().includes(address.toLowerCase())
        );
    });

    const menuItems = ["Dashboard", "Users", "Stores"];

    return (
        <div className="min-h-screen flex flex-col">
            {/* <div className="bg-red-600 text-white"> */}
            <Navbar name="Rage" title="System Administrator"/>
            {/* </div> */}

            <div className="flex flex-1">
                <aside className="w-64 bg-black border-r">
                    <nav className="flex flex-col p-2 space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => setActiveSection(item)}
                                className={`px-4 py-2 rounded-md text-left cursor-pointer ${activeSection === item
                                    ? "bg-white text-black font-medium"
                                    : "text-white hover:bg-gray-700"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </nav>
                </aside>

                <main className="flex-1 p-6 bg-black">
                    {activeSection === "Dashboard" && (
                        <div className="p-6">
                            {/* Top stats section */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 bg-zinc-900 rounded-lg shadow-sm border">
                                    <h2 className="text-xl font-bold mb-8">Total Users</h2>
                                    <h1 className="mt-2 text-gray-400 font-extrabold text-3xl">100</h1>
                                </div>

                                <div className="p-6 bg-zinc-900 rounded-lg shadow-sm border">
                                    <h2 className="text-xl font-bold mb-8">Total Stores</h2>
                                    <h1 className="mt-2 text-gray-400 font-extrabold text-3xl">50</h1>
                                </div>

                                <div className="p-6 bg-zinc-900 rounded-lg shadow-sm border">
                                    <h2 className="text-xl font-bold mb-8">Submitted Ratings</h2>
                                    <h1 className="mt-2 text-gray-400 font-extrabold text-3xl">12</h1>
                                </div>
                            </div>

                            {/* Heading */}
                            <h1 className="text-center font-extrabold text-4xl my-10">
                                Add Users and Stores
                            </h1>
                            <span className="block w-full h-0.5 bg-[#c9c8c854] rounded" />

                            {/* Forms Section */}
                            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Add User */}
                                <div className="border p-5 rounded-lg border-[#d6d5d58e]">
                                    <h3 className="text-center font-bold text-lg">Add User</h3>
                                    <form className="mt-4" onSubmit={handleAddUser}>
                                        <Label htmlFor="user-name" className="mb-2">
                                            Name
                                        </Label>
                                        <Input
                                            onChange={(e) =>
                                                setNewUser({ ...newUser, username: e.target.value })
                                            }
                                            id="user-name"
                                            type="text"
                                            placeholder="Enter user name"
                                            className="border p-2 rounded-lg w-full mb-4"
                                        />

                                        <Label htmlFor="user-email" className="mb-2">
                                            Email
                                        </Label>
                                        <Input
                                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                            id="user-email"
                                            type="text"
                                            placeholder="Enter your email"
                                            className="border p-2 rounded-lg w-full mb-4"
                                        />

                                        <Label htmlFor="user-password" className="mb-2">
                                            Password
                                        </Label>
                                        <Input
                                            onChange={(e) =>
                                                setNewUser({ ...newUser, password: e.target.value })
                                            }
                                            id="user-password"
                                            type="password"
                                            placeholder="Enter your password"
                                            className="border p-2 rounded-lg w-full mb-4"
                                        />

                                        <Label htmlFor="user-address" className="mb-2">
                                            Address
                                        </Label>
                                        <Input
                                            onChange={(e) =>
                                                setNewUser({ ...newUser, address: e.target.value })
                                            }
                                            id="user-address"
                                            type="text"
                                            placeholder="Enter your address"
                                            className="border p-2 rounded-lg w-full mb-4"
                                        />

                                        <Select
                                            onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                                        >
                                            <SelectTrigger className="w-full mb-4">
                                                <SelectValue placeholder="Select Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">System Administrator</SelectItem>
                                                <SelectItem value="user">Normal User</SelectItem>
                                                <SelectItem value="owner">Store Owner</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Button variant="outline" className="w-full">
                                            Add User
                                        </Button>
                                    </form>
                                </div>

                                {/* Add Store */}
                                <div className="border p-5 rounded-lg border-[#d6d5d58e]">
                                    <h3 className="text-center font-bold text-lg">Add Store</h3>
                                    <form className="mt-4">
                                        <Label htmlFor="store-name" className="mb-2">
                                            Name
                                        </Label>
                                        <Input
                                            id="store-name"
                                            type="text"
                                            placeholder="Enter store name"
                                            className="border p-2 rounded-lg w-full mb-4"
                                        />

                                        <Label htmlFor="store-email" className="mb-2">
                                            Email
                                        </Label>
                                        <Input
                                            id="store-email"
                                            type="text"
                                            placeholder="Enter your email"
                                            className="border p-2 rounded-lg w-full mb-4"
                                        />

                                        <Label htmlFor="store-address" className="mb-2">
                                            Address
                                        </Label>
                                        <Input
                                            id="store-address"
                                            type="text"
                                            placeholder="Enter your address"
                                            className="border p-2 rounded-lg w-full mb-4"
                                        />

                                        <Button variant="outline" className="w-full">
                                            Add Store
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    )}  {activeSection === "Users" && (
                        <>
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4">Users</h2>
                                <div className="border border-white p-6 m-5 rounded-lg flex justify-evenly gap-10">
                                    <div className="w-1/3">
                                        <Label htmlFor="user-search" className="mb-2">Name</Label>
                                        <Input
                                            id="user-search"
                                            type="text"
                                            placeholder="Search name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="border p-2 rounded-lg w-full mb-4"
                                        />
                                    </div>

                                    <div className="w-1/3">
                                        <Label htmlFor="user-email-search" className="mb-2">Email</Label>
                                        <Input
                                            id="user-email-search"
                                            type="text"
                                            placeholder="Search email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="border p-2 rounded-lg w-full mb-4"
                                        />
                                    </div>

                                    <div className="w-1/3">
                                        <Label htmlFor="user-address-search" className="mb-2">Address</Label>
                                        <Input
                                            id="user-address-search"
                                            type="text"
                                            placeholder="Search address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="border p-2 rounded-lg w-full mb-4"
                                        />
                                    </div>

                                    <div className="w-1/4">
                                        <Label htmlFor="user-role-search" className="mb-2">Role</Label>
                                        <Select value={role} onValueChange={setRole}>
                                            <SelectTrigger className="w-[180px] mb-4">
                                                <SelectValue placeholder="Select Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="any">Any</SelectItem>
                                                <SelectItem value="admin">System Administrator</SelectItem>
                                                <SelectItem value="user">Normal User</SelectItem>
                                                <SelectItem value="owner">Store Owner</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="border border-zinc-700 rounded-lg mt-10 overflow-hidden m-4">
                                    <div className="max-h-80 overflow-y-auto">
                                        <table className="w-full border-collapse">
                                            <thead className="bg-zinc-800 text-white sticky top-0 z-10">
                                                <tr>
                                                    <th className="px-4 py-3 text-center text-sm font-semibold">User</th>
                                                    <th className="px-4 py-3 text-center text-sm font-semibold">Email</th>
                                                    <th className="px-4 py-3 text-center text-sm font-semibold">Address</th>
                                                    <th className="px-4 py-3 text-center text-sm font-semibold">Role</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-700">
                                                {filteredUsers.map((user) => (
                                                    <tr key={user.id} className="hover:bg-zinc-800/60 transition-colors" onClick={() => {
                                                        setDrawer(true)
                                                        setSelectedUser(user)
                                                    }}>
                                                        <td className="px-4 py-3 text-center text-gray-200">{user.userName}</td>
                                                        <td className="px-4 py-3 text-center text-gray-200">{user.email}</td>
                                                        <td className="px-4 py-3 text-center text-gray-200">{user.address}</td>
                                                        <td className="px-4 py-3 text-center font-medium text-white">{user.roleLabel}</td>
                                                    </tr>
                                                ))}
                                                {filteredUsers.length === 0 && (
                                                    <tr>
                                                        <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                                                            No users found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {drawer && <DrawerDemo show={drawer} onClose={() => { setDrawer(false); setSelectedUser([]); }} data={selectedUser} />}
                        </>
                    )} {activeSection === "Stores" && (
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">Stores</h2>
                            <div className="border border-white p-6 m-5 rounded-lg flex justify-evenly gap-10">
                                <div className="w-1/3">
                                    <Label htmlFor="user-search" className="mb-2">Name</Label>
                                    <Input
                                        id="user-search"
                                        type="text"
                                        placeholder="Search name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="border p-2 rounded-lg w-full mb-4"
                                    />
                                </div>

                                <div className="w-1/3">
                                    <Label htmlFor="user-email-search" className="mb-2">Email</Label>
                                    <Input
                                        id="user-email-search"
                                        type="text"
                                        placeholder="Search email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="border p-2 rounded-lg w-full mb-4"
                                    />
                                </div>

                                <div className="w-1/3">
                                    <Label htmlFor="user-address-search" className="mb-2">Address</Label>
                                    <Input
                                        id="user-address-search"
                                        type="text"
                                        placeholder="Search address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="border p-2 rounded-lg w-full mb-4"
                                    />
                                </div>

                            </div>


                            <div className="border border-zinc-700 rounded-lg mt-10 overflow-hidden m-4">
                                <div className="max-h-80 overflow-y-auto">
                                    <table className="w-full border-collapse">
                                        <thead className="bg-zinc-800 text-white sticky top-0 z-10">
                                            <tr>
                                                <th className="px-4 py-3 text-center text-sm font-semibold">Name</th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold">Email</th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold">Address</th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold">Rating</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-700">
                                            {filteredStores.map((store) => (
                                                <tr key={store.id} className="hover:bg-zinc-800/60 transition-colors">
                                                    <td className="px-4 py-3 text-center text-gray-200">{store.name}</td>
                                                    <td className="px-4 py-3 text-center text-gray-200">{store.owner}</td>
                                                    <td className="px-4 py-3 text-center text-gray-200">{store.address}</td>
                                                    <td className="px-4 py-3 text-center text-gray-200">{store.rating}</td>

                                                </tr>
                                            ))}
                                            {filteredStores.length === 0 && (
                                                <tr>
                                                    <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                                                        No stores found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
