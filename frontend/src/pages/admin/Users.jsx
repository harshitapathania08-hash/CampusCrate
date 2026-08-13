import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";

const users = [
  { id: 1, name: "Harshita", email: "harshita@college.edu", role: "Student" },
  { id: 2, name: "Rahul", email: "rahul@college.edu", role: "Student" },
  { id: 3, name: "Admin", email: "admin@college.edu", role: "Admin" },
];

function Users() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Users"
        subtitle="Manage registered users."
      />

      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-slate-500">{user.email}</p>
              </div>

              <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm">
                {user.role}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Users;