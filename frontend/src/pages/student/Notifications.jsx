function Notifications() {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">
          Notifications
        </h1>
  
        <p className="mt-2 text-base text-[#64748B]">
          Stay updated with your lost and found activity.
        </p>
  
        <div className="mt-8 space-y-4">
  
          <div className="rounded-2xl border border-[#E8DCCA] bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-[#111827]">
              New claim submitted
            </h3>
            <p className="mt-1 text-sm text-[#64748B]">
              Someone has submitted a claim for an item you reported.
            </p>
          </div>
  
          <div className="rounded-2xl border border-[#E8DCCA] bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-[#111827]">
              Item status updated
            </h3>
            <p className="mt-1 text-sm text-[#64748B]">
              One of your reported items has been updated.
            </p>
          </div>
  
        </div>
      </div>
    );
  }
  
  export default Notifications;