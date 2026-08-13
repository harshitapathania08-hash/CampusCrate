import { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
} from "react-icons/fa";
import API from "../../api/axios";

function ProfileCard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await API.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data.user);
        setFullName(data.user.fullName);
        setEmail(data.user.email);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!fullName.trim() || !email.trim()) {
      alert("Name and email are required.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const { data } = await API.put(
        "/auth/profile",
        {
          fullName,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(data.user);
      setFullName(data.user.fullName);
      setEmail(data.user.email);
      setEditing(false);

      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-[#E8DCCA] bg-white p-8 shadow-sm">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-3xl border border-[#E8DCCA] bg-white p-8 shadow-sm text-red-500">
        Unable to load profile.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[#E8DCCA] bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-6">

          <FaUserCircle className="text-[100px] text-[#1E3A8A]" />

          <div>

            {editing ? (
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="rounded-xl border border-[#E8DCCA] px-4 py-2 text-2xl font-bold outline-none focus:border-[#1E3A8A]"
              />
            ) : (
              <h2 className="text-3xl font-bold text-[#111827]">
                {user.fullName}
              </h2>
            )}

            <p className="mt-2 text-[#64748B]">
              {user.role === "admin"
                ? "Administrator"
                : "Student • CampusCrate"}
            </p>

          </div>

        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="rounded-2xl bg-[#1E3A8A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#17317A]"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">

            <button
              onClick={() => {
                setEditing(false);
                setFullName(user.fullName);
                setEmail(user.email);
              }}
              className="rounded-2xl border border-[#E8DCCA] px-6 py-3 text-sm font-medium text-[#64748B] transition hover:bg-[#F7F4EE]"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-2xl bg-[#1E3A8A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#17317A] disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>
        )}

      </div>

      {/* Details */}

      <div className="mt-8 grid grid-cols-2 gap-6">

        <div className="flex items-center gap-3 text-[#64748B]">

          <FaEnvelope className="text-[#1E3A8A]" />

          {editing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl border border-[#E8DCCA] px-4 py-2 outline-none focus:border-[#1E3A8A]"
            />
          ) : (
            <span>{user.email}</span>
          )}

        </div>

      </div>

    </div>
  );
}

export default ProfileCard;