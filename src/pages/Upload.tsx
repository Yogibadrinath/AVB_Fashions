import { useEffect, useState } from "react";
import { uploadImage } from "../components/UploadImage";
import { useLoader } from "../context/LoaderContext";
import { ErrorAlert, SuccessAlert, WarningAlert } from "../components/NotificationAlert";

const Upload = () => {
  const [category, setCategory] = useState("");
  const [model, setModel] = useState("");
  const [cost, setCost] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { showLoader, hideLoader } = useLoader();
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const [dropDownData, setDropDownData] = useState([
    {
      Category: "Chudidhars Sets", models: [
        { model: "Palazo Suit" }, { model: "Patiala Suit" }, { model: "Floor Length Dress" }, { model: "Kurtha" },
        { model: "Lehanga with Coat Modal" },
        { model: "Aliya Cut Floor Length Dress" }
      ]
    },
    {
      Category: "Tops", models: [
        { model: "Aliya Cut" },
        { model: "Ambrala" },
        { model: "Belt" },
        { model: "Coat" },
        { model: "Western Tops" },
        { model: "Anarkali Tops" },
        { model: "Long Length Tops" },
        { model: "Short Length Tops" },
        { model: "Short Tops" },
        { model: "Jegines" },
      ]
    },
    {
      Category: "Kids Boys", models: [
        { model: "Sherwany" },
        { model: "Coat Set" },
        { model: "Jubha Set" },
        { model: "Short Pant Set" },
        { model: "Shirt Drawer Set" },
        { model: "Dhoti Set" },
        { model: "T-Shirts" },
        { model: "Shorts" },
        { model: "Vesti Shirt" },
        { model: "Coat Zip" },
        { model: "Shorts" },
        { model: "Jeans Pants" },
        { model: "Cargo Pants" },
        { model: "Cotton Cargo Pants" },
      ]
    },
    {
      Category: "Girls Pants", models: [
        { model: "Patiala" },
        { model: "Plazzo" },
        { model: "Jeans" },
        { model: "cigar" },
        { model: "Jaguars" },
      ]
    },
    {
      Category: "Kids Girls", models: [
        { model: "Frock" },
        { model: "Long Frock" },
        { model: "Patiala Set" },
        { model: "Palazzo Set" },
        { model: "Coat Frock" },
        { model: "Western" },
        { model: "Jeans Top Set" },
        { model: "Shirt Top Set" },
        { model: "Saree" },
        { model: "Pattu Paavada" },
        { model: "Pattu Saree" },
        { model: "Lehanga" },
        { model: "Cotton Frock" },
        { model: "Pattu Frock" },
        { model: "Middi Top" },
        { model: "Belt" },
        { model: "Chudihar" },
        { model: "Barbie Frock" },
      ]
    },
    {
      Category: "Ladies Inners", models: [
        { model: "Sports Bra" },
        { model: "Huke Bra" },
        { model: "Padded Bra" },
        { model: "Shimmy" },
        { model: "Bra Shimmy" },
      ]
    },
    {
      Category: "Gents Inners", models: [
        { model: "Cut Banians" },
        { model: "Full banians" },
        { model: "Full Pant" },
        { model: "Half Pant" },
      ]
    },
    {
      Category: "Kids Inners", models: [
        { model: "Cut Drawers" },
        { model: "Full Drawers" }
      ]
    },
    {
      Category: "Vesti & Lungi", models: [
        { model: "Vesti" },
        { model: "Lungi" },
      ]
    },
    {
      Category: "Towels & BedSheets", models: [
        { model: "Towels" },
        { model: "BedSheets" },
      ]
    },
    {
      Category: "Salwa", models: [
        { model: "Salwa" },
      ]
    },
  ]);

  const handleUpload = async () => {
    if (!file || !category || !model || !cost) {
      WarningAlert("Please select category, model, cost and image!!!");
      return;
    }

    try {
      showLoader();
      await uploadImage(file, category, model, cost);
      SuccessAlert("Image Uploaded Successfully!!!");

      // reset
      setFile(null);

      setModel("");
      setCategory("");
      setCost("");
      setFileInputKey(Date.now());
    } catch (err) {
      console.error(err);
      ErrorAlert("Upload failed!!!");
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
          <select onChange={(e) => { setCategory(e.target.value); setModel(""); }} value={category} className="form-select mb-3">
            <option value="">Select Category</option>
            {dropDownData.map((data, index) => (
              <option key={index} value={data.Category}>{data.Category}</option>
            ))}
          </select>

          <select onChange={(e) => { setModel(e.target.value); }} value={model} className="form-select mb-3">
            <option value="">Select Model</option>
            {dropDownData.filter((data) => data.Category === category).map((data, _) => (
              data.models.map((modelData, modelIndex) => (
                <option key={modelIndex} value={modelData.model}>{modelData.model}</option>
              ))
            ))}
          </select>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter Rupees (₹)"
            value={cost}
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setCost(value);
            }}
          />

          {/* FILE INPUT */}
          <input
            type="file"
            accept="image/*"
            className="form-control mb-3"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            key={fileInputKey}
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
