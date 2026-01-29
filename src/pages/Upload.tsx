import { useEffect, useState } from "react";
import { uploadImage } from "../components/UploadImage";
import { useLoader } from "../context/LoaderContext";

const Upload = () => {
  const [category, setCategory] = useState("");
  const [model, setModel] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { showLoader, hideLoader } = useLoader();

  const [dropDownData, setDropDownData] = useState([
    { Category: "Tops", models: [{ model: "Tops Model 1" }, { model: "Tops Model 2" }] },
    { Category: "Dresses", models: [{ model: "Dresses Model 1" }, { model: "Dresses Model 2" }] },
    { Category: "Jeans", models: [{ model: "Jeans Model 1" }, { model: "Jeans Model 2" }] },
  ]);

  const handleUpload = async () => {
    if (!file || !category) {
      alert("Please select category and image");
      return;
    }

    try {
      showLoader();
      await uploadImage(file, category, model);
      alert("Image uploaded successfully!");

      // reset
      setFile(null);
      setCategory("");
      setModel("");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    console.log("Selected Category:", category);
    console.log("Selected Model:", model, setDropDownData);
  }, []);

  return (
    <div className="container mt-4" style={{ maxWidth: 420 }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-4 text-center">Upload Product Image</h4>
          <select onChange={(e) => setCategory(e.target.value)} className="form-select mb-3">
            <option value="">Select Category</option>
            {dropDownData.map((data, index) => (
              <option key={index} value={data.Category}>{data.Category}</option>
            ))}
          </select>

          <select onChange={(e) => setModel(e.target.value)} className="form-select mb-3">
            <option value="">Select Model</option>
            {dropDownData.filter((data) => data.Category === category).map((data, _) => (
              data.models.map((modelData, modelIndex) => (
                <option key={modelIndex} value={modelData.model}>{modelData.model}</option>
              ))
            ))}
          </select>

          {/* FILE INPUT */}
          <input
            type="file"
            accept="image/*"
            className="form-control mb-3"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          {/* UPLOAD BUTTON */}
          <button
            className="btn btn-primary w-100"
            onClick={handleUpload}
            disabled={!file || !category || !model}
          >
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
