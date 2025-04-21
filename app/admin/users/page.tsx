"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface User {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id: string) => {
    if (confirm("Are you sure you want to delete this user? 🚨")) {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("User deleted successfully 🚀");
        fetchUsers();
      } else {
        toast.error("Failed to delete user ❌");
      }
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-8">Manage Users</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gold-500 text-center">
            <thead className="bg-gold-500 text-black">
              <tr>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t border-gold-500">
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role || "-"}</td>
                  <td className="py-2 px-4">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
