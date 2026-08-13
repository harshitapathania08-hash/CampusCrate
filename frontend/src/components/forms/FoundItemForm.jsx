import { FaCloudUploadAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/axios";

function FoundItemForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
  });

  const [image, setImage] = useState(null);

  // Fetch existing item when editing
  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      try {
        const { data } = await API.get(`/items/${id}`);

        setFormData({
          title: data.item.title,
          description: data.item.description,
          category: data.item.category,
          location: data.item.location,
          date: data.item.date.split("T")[0],
        });
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.location ||
      !formData.date
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("type", "Found");
      data.append("location", formData.location);
      data.append("date", formData.date);

      if (image) {
        data.append("image", image);
      }

      if (id) {
        await API.put(`/items/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Report updated successfully!");
      } else {
        await API.post("/items", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Report submitted successfully!");
      }

      navigate("/my-reports");
    } catch (error) {
      console.error("Submit Error:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative pb-24">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-[#111827]">
        {id ? "Edit Found Item" : "Report Found Item"}
      </h1>

      <p className="mt-1 text-[#64748B]">
        Fill in the details below to report an item you found.
      </p>

      {/* Upload Image */}
      <div className="mt-6">
        <label className="mb-2 block text-lg font-semibold text-[#111827]">
          Upload Item Image
        </label>

        <label className="flex h-60 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#E8DCCA] bg-[#F7F4EE] transition hover:border-[#1E3A8A]">
          <FaCloudUploadAlt className="text-5xl text-[#1E3A8A]" />

          <p className="mt-3 text-lg font-semibold text-[#111827]">
            {image ? image.name : "Click to Upload"}
          </p>

          <p className="mt-1 text-sm text-[#64748B]">
            JPG, PNG or JPEG (Max 5 MB)
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />
        </label>
      </div>

      {/* Form Fields */}
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Item Name */}
        <div>
          <label className="mb-2 block font-medium text-[#111827]">
            Item Name
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter item name"
            className="w-full rounded-2xl border border-[#E8DCCA] px-5 py-3.5 text-lg outline-none transition focus:border-[#1E3A8A]"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block font-medium text-[#111827]">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-2xl border border-[#E8DCCA] bg-white px-5 py-3.5 text-lg outline-none transition focus:border-[#1E3A8A]"
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Clothing">Clothing</option>
            <option value="ID Card">ID Card</option>
            <option value="Keys">Keys</option>
            <option value="Wallet">Wallet</option>
            <option value="Bottle">Bottle</option>
            <option value="Bag">Bag</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block font-medium text-[#111827]">
            Found Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Where did you find it?"
            className="w-full rounded-2xl border border-[#E8DCCA] px-5 py-3.5 text-lg outline-none transition focus:border-[#1E3A8A]"
          />
        </div>

        {/* Date */}
        <div>
          <label className="mb-2 block font-medium text-[#111827]">
            Date Found
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-2xl border border-[#E8DCCA] px-5 py-3.5 text-lg outline-none transition focus:border-[#1E3A8A]"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mt-5">
        <label className="mb-2 block font-medium text-[#111827]">
          Description
        </label>

        <textarea
          rows="4"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the found item and where you discovered it."
          className="w-full rounded-2xl border border-[#E8DCCA] p-5 text-lg outline-none transition focus:border-[#1E3A8A]"
        />
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 right-0 z-30 flex w-[calc(100%-273px)] justify-end gap-4 border-t border-[#E8DCCA] bg-[#FFFCF8] px-8 py-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-2xl border border-[#E8DCCA] bg-white px-8 py-3 font-medium transition hover:bg-[#F7F4EE]"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-2xl bg-[#1E3A8A] px-8 py-3 font-semibold text-white transition hover:bg-[#17317A] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? id
              ? "Updating..."
              : "Submitting..."
            : id
            ? "Update Report"
            : "Submit Report"}
        </button>
      </div>
    </div>
  );
}

export default FoundItemForm;