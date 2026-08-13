import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";

const reports = [
  {
    id: 1,
    title: "Lost Wallet",
    status: "Pending",
  },
  {
    id: 2,
    title: "Found ID Card",
    status: "Approved",
  },
];

function Reports() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Reports"
        subtitle="Review item reports."
      />

      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{report.title}</h3>
              <span>{report.status}</span>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Reports;