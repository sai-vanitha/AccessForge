import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import UserManagement from "../components/UserManagement";
import ProfileCard from "../components/ProfileCard";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
      toast.success("Users fetched successfully!");
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    if (user?.role !== "user") fetchUsers();
  }, [user]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden p-6">

      {/* Abstract background shapes */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-animatePulse"></div>
      <div className="absolute bottom-24 right-16 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-animatePulse animation-delay-1000"></div>

      <div className="relative z-10 max-w-5xl mx-auto bg-white bg-opacity-90 backdrop-blur-md rounded-3xl p-8 shadow-xl space-y-8">

        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              Welcome, {user.name}
            </h1>
            <p className="text-gray-700 mt-1">Role: <span className="font-semibold">{user.role}</span></p>
          </div>

          <button
            onClick={logout}
            className="mt-4 sm:mt-0 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold shadow-md"
          >
            Logout
          </button>
        </header>

        {/* Panels */}

        {(user.role === "admin" || user.role === "editor") && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
              {user.role === "admin" ? "Admin Panel" : "Editor Panel"}
            </h2>
            <p className="text-gray-600 mb-4">
              {user.role === "admin"
                ? "Full access to manage users."
                : "You can view and edit users (except Admins)."}
            </p>

            {/* <UserTable users={users} /> */}
            <div className="mt-6">
              <button
  onClick={() => setShowProfile(!showProfile)}
  className="mt-4 sm:mt-0 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold shadow-md ml-4"
>
  {showProfile ? "Hide Profile" : "View Profile"}
</button>

{showProfile && (
  <ProfileCard user={user} onUpdate={updateUser} />
)}

              {/* <ProfileCard user={user} onUpdate={updateUser} /> */}
              <UserManagement users={users} currentUser={user} onRefresh={fetchUsers} />
            </div>
          </section>
        )}

        {user.role === "user" && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
              User Dashboard
            </h2>
            <p className="text-gray-600 mb-6">
              You can view and update your own profile.
            </p>
                        <button
  onClick={() => setShowProfile(!showProfile)}
  className="mt-4 sm:mt-0 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold shadow-md ml-4"
>
  {showProfile ? "Hide Profile" : "View Profile"}
</button>

{showProfile && (
  <ProfileCard user={user} onUpdate={updateUser} />
)}

            {/* <ProfileCard user={user} onUpdate={updateUser} /> */}
          </section>
        )}
      </div>
    </div>
  );
};

const UserTable = ({ users }) => (
  <table className="w-full border-collapse border border-gray-200 text-left text-sm rounded-lg overflow-hidden shadow-sm">
    <thead className="bg-purple-100 text-purple-900 font-semibold">
      <tr>
        <th className="p-3 border-b border-gray-300">Name</th>
        <th className="p-3 border-b border-gray-300">Email</th>
        <th className="p-3 border-b border-gray-300">Role</th>
      </tr>
    </thead>
    <tbody>
      {users.map((u) => (
        <tr
          key={u._id}
          className="border-b border-gray-200 hover:bg-purple-50 transition"
        >
          <td className="p-3">{u.name}</td>
          <td className="p-3">{u.email}</td>
          <td className="p-3 capitalize">{u.role}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Dashboard;
