import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";
import { getImagesByCategory, type ProductImage } from "../components/getImages";
import { deleteImage } from "../components/DeleteImage";

const Products = () => {
  const [images, setImages] = useState<ProductImage[]>([]);
  const { showLoader, hideLoader } = useLoader();
  const location = useLocation();

  const category = location.state?.category;

  useEffect(() => {
    if (!category) return;

    const loadImages = async () => {
      try {
        showLoader();
        const data = await getImagesByCategory(category);
        setImages(data);
      } catch (error) {
        console.error(error);
      } finally {
        hideLoader();
      }
    };

    loadImages();
  }, [category]);

  const handleDelete = async (img: ProductImage) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      showLoader();
      await deleteImage(img.id, img.storagePath);
      setImages((prev) => prev.filter((i) => i.id !== img.id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    console.log("IMAGES STATE:", images);
  }, [images]);

  return (
    <>
      <h3 className="mb-4 text-center">{category}</h3>

      <div className="row">
        {images.map((img) => (
          <div key={img.id} className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card h-100 shadow-sm position-relative cursor-pointer">

              {/* DELETE ICON TOP RIGHT */}
              <button
                className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 30, height: 30, padding: 0, zIndex: 2 }}
                onClick={() => handleDelete(img)}
              >
                ✕
              </button>

              <img
                src={img.url}
                className="card-img-top"
                alt="product"
                loading="lazy"
              />

              <div className="card-body text-center">
                <h6 className="card-title mb-1">{img.category}</h6>
                <small className="">{img.model}</small>
              </div>

            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default Products;
