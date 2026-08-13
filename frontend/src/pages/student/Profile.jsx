import { useEffect, useState } from "react";
import ProfileCard from "../../components/profile/ProfileCard";
import API from "../../api/axios";

function Profile() {
  const [profileData, setProfileData] = useState({
    stats: {
      reports: 0,
      claims: 0,
      itemsReturned: 0,
      reputation: 4.9,
    },
    activities: [],
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await API.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Profile Data:", data);

        setProfileData({
          stats: data.stats || {
            reports: 0,
            claims: 0,
            itemsReturned: 0,
            reputation: 4.9,
          },
          activities: data.activities || [],
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="space-y-8">

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">
          Profile
        </h1>

        <p className="mt-2 text-base text-[#64748B]">
          Manage your personal information and account activity.
        </p>
      </div>

      {/* Profile */}
      <ProfileCard />

      {/* Statistics */}
      <div className="overflow-hidden rounded-3xl border border-[#E8DCCA] bg-white shadow-sm">
        <div className="grid grid-cols-4">

          {/* Reports */}
          <div className="flex flex-col items-center justify-center py-7">
            <p className="text-sm text-[#64748B]">
              Reports
            </p>

            <h2 className="mt-2 text-4xl font-bold text-[#111827]">
              {profileData.stats.reports}
            </h2>
          </div>

          {/* Claims */}
          <div className="flex flex-col items-center justify-center border-l border-[#E8DCCA] py-7">
            <p className="text-sm text-[#64748B]">
              Claims
            </p>

            <h2 className="mt-2 text-4xl font-bold text-[#1E3A8A]">
              {profileData.stats.claims}
            </h2>
          </div>

          {/* Items Returned */}
          <div className="flex flex-col items-center justify-center border-l border-[#E8DCCA] py-7">
            <p className="text-sm text-[#64748B]">
              Items Returned
            </p>

            <h2 className="mt-2 text-4xl font-bold text-green-600">
              {profileData.stats.itemsReturned}
            </h2>
          </div>

          {/* Reputation */}
          <div className="flex flex-col items-center justify-center border-l border-[#E8DCCA] py-7">
            <p className="text-sm text-[#64748B]">
              Reputation
            </p>

            <h2 className="mt-2 text-4xl font-bold text-yellow-500">
              ⭐ {profileData.stats.reputation}
            </h2>
          </div>

        </div>
      </div>

      {/* Recent Activity */}
      <div>

        <h2 className="mb-6 text-xl font-semibold text-[#111827]">
          Recent Activity
        </h2>

        {profileData.activities.length > 0 ? (

          <div className="space-y-5">

            {profileData.activities.map((activity, index) => (

              <div
                key={activity._id || index}
                className="rounded-3xl border border-[#E8DCCA] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="flex items-center justify-between">

                  <div>
                    <h3 className="text-lg font-semibold text-[#111827]">
                      {activity.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#64748B]">
                      {activity.date
                        ? new Date(activity.date).toLocaleDateString()
                        : ""}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      activity.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : activity.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : activity.status === "Returned"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {activity.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="rounded-3xl border border-[#E8DCCA] bg-white p-8 text-center text-[#64748B] shadow-sm">
            No recent activity yet.
          </div>

        )}

      </div>

    </div>
  );
}

export default Profile;