import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export class HeroSectionModel {
  id: string | null = "";
  title: string = "";
  subtitle: string = "";
  price: string = "";
  image: string = "";
}

export function HeroSectionAdmin() {
  const [dataArray, setDataArray] = useState<HeroSectionModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<HeroSectionModel>({
    defaultValues: new HeroSectionModel(),
  });

  useEffect(() => {
    const saveData = localStorage.getItem("heroData");
    if (saveData) {
      setDataArray(JSON.parse(saveData));
    }
  }, []);

  // Save form submission
  const onSubmit = (formData: HeroSectionModel) => {
    const newEntry: HeroSectionModel = {
      ...formData,
      id: Date.now().toString(),
    };

    const updatedData = [...dataArray, newEntry];
    setDataArray(updatedData);
    localStorage.setItem("heroData", JSON.stringify(updatedData));
    reset();
    setIsModalOpen(false); // Close modal after saving
  };

  const handleDelete = (id: string | null) => {
    const updated = dataArray.filter((item) => item.id !== id);
    setDataArray(updated);
    localStorage.setItem("heroData", JSON.stringify(updated));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset(); // Reset form when closing
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-48">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Hero Section Manager</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add Hero Section</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Title</label>
                <input
                  {...register("title", { required: "Title is required" })}
                  className="border p-2 w-full rounded"
                  placeholder="Enter title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Subtitle</label>
                <input
                  type="text"
                  {...register("subtitle", { required: "Subtitle is required" })}
                  className="border p-2 w-full rounded"
                  placeholder="Enter Subtitle"
                />
                {errors.subtitle && (
                  <p className="text-red-500 text-sm mt-1">{errors.subtitle.message}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Price</label>
                <input
                  {...register("price", { required: "Price is required" })}
                  className="border p-2 w-full rounded"
                  placeholder="Enter price"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Image URL</label>
                <input
                  {...register("image", { required: "Image URL is required" })}
                  className="border p-2 w-full rounded"
                  placeholder="Enter image URL"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List of saved hero sections */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Saved Hero Data</h3>
        {dataArray.length === 0 && (
          <p className="text-gray-500">No hero data saved yet. Click "Create New" to add one.</p>
        )}
        <ul className="space-y-3">
          {dataArray.map((item) => (
            <li
              key={item.id}
              className="border p-4 rounded shadow-sm flex justify-between items-center hover:bg-gray-50"
            >
              <div>
                <p className="font-medium text-lg">{item.title}</p>
                <p className="text-sm text-gray-600">{item.subtitle}</p>
                <p className="text-sm font-semibold text-green-600 mt-1">{item.price}</p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}