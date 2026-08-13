import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
function ItemDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await API.get(`/items/${id}`);
        setItem(data.item);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) {
    return <h2 className="p-10 text-xl">Loading...</h2>;
  }
  const handleClaim = async () => {
    try {
      setLoading(true);
  
      const token = localStorage.getItem("token");
  
      await API.post(
        "/claims",
        {
          itemId: item._id,
          message: "I would like to claim this item.",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert("Claim submitted successfully!");
  
      navigate("/claims");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to submit claim.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold text-[#111827]">
        Item Details
      </h1>

      <div className="grid gap-10 lg:grid-cols-2">

        <div className="overflow-hidden rounded-3xl border border-[#E8DCCA] bg-white">

          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="h-[420px] w-full object-cover"
            />
          ) : (
            <div className="flex h-[420px] items-center justify-center text-[#94A3B8]">
              No Image Available
            </div>
          )}

        </div>

        <div className="rounded-3xl border border-[#E8DCCA] bg-white p-8 shadow-sm">

          <h2 className="text-3xl font-bold">
            {item.title}
          </h2>

          <div className="mt-8 space-y-4 text-lg">

            <p>
              <strong>Category:</strong> {item.category}
            </p>

            <p>
              <strong>Type:</strong> {item.type}
            </p>

            <p>
              <strong>Status:</strong> {item.status}
            </p>

            <p>
              <strong>Location:</strong> {item.location}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(item.date).toLocaleDateString()}
            </p>

            <p>
              <strong>Description:</strong>
            </p>

            <p className="text-[#64748B]">
              {item.description}
            </p>

          </div>

          <button
  onClick={handleClaim}
  disabled={loading}
  className="mt-10 w-full rounded-2xl bg-[#1E3A8A] py-4 font-semibold text-white hover:bg-[#17317A] disabled:opacity-60"
>
  {loading ? "Submitting..." : "Claim this Item"}
</button>

        </div>

      </div>

    </div>
  );
}

export default ItemDetails;