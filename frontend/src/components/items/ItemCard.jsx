function ItemCard({
    title,
    category,
    location,
    date,
    status,
  }) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
  
        <div className="flex items-center justify-between">
  
          <h3 className="text-lg font-semibold text-slate-900">
            {title}
          </h3>
  
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              status === "Lost"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {status}
          </span>
  
        </div>
  
        <div className="mt-5 space-y-2 text-sm text-slate-600">
  
          <p>
            <span className="font-medium">Category:</span> {category}
          </p>
  
          <p>
            <span className="font-medium">Location:</span> {location}
          </p>
  
          <p>
            <span className="font-medium">Date:</span> {date}
          </p>
  
        </div>
  
        <button className="mt-6 w-full rounded-lg border border-slate-300 py-2 text-sm font-medium transition hover:bg-slate-100">
          View Details
        </button>
  
      </div>
    );
  }
  
  export default ItemCard;