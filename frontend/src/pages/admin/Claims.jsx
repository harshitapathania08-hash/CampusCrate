import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";

const claims = [
  {
    id: 1,
    item: "Wallet",
    claimant: "Harshita",
    status: "Pending",
  },
  {
    id: 2,
    item: "Calculator",
    claimant: "Rahul",
    status: "Approved",
  },
];

function Claims() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Claims"
        subtitle="Review submitted claims."
      />

      <div className="space-y-4">
        {claims.map((claim) => (
          <Card key={claim.id}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{claim.item}</h3>
                <p className="text-slate-500">{claim.claimant}</p>
              </div>

              <span>{claim.status}</span>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Claims;