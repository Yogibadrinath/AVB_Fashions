import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";
import { getImagesByCategory, type ProductImage } from "../components/GetImages";
import { deleteImage } from "../components/DeleteImage";
import { useAuth } from "../components/AuthContext";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "../components/NotificationAlert";
import useScrollAnimation from "../hooks/useScrollAnimation";

const Products = () => {
  const [images, setImages] = useState<ProductImage[]>([]);
  const { showLoader, hideLoader } = useLoader();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const animations = [
    "fadeInUp",
    "fadeInLeft",
    "fadeInRight",
    "bounceIn",
    "fadeInDown",
  ];

  const imagesReady =
    images.length > 0 && loadedImages.size === images.length;

  useScrollAnimation(imagesReady);

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
        // hideLoader();
      }
    };

    loadImages();
  }, [category]);

  const handleDelete = (img: ProductImage) => {
    ConfirmAlert(async (isConfirmed) => {
      if (isConfirmed) {
        try {
          showLoader();
          await deleteImage(img.id, img.storagePath);

          setImages((prev) => prev.filter((i) => i.id !== img.id));

          SuccessAlert("Image deleted successfully!");
        } catch (err) {
          console.error(err);
          ErrorAlert("Unable to Delete Image!!!");
        } finally {
          hideLoader();
        }
      }
    });
  };

  useEffect(() => {
    setLoadedImages(new Set());
  }, [images]);

  useEffect(() => {
    if (imagesReady) {
      hideLoader();
    }
  }, [imagesReady]);

  return (
    <>
      <h3 className="mb-4 text-center">{category}</h3>

      <div className="row">
        {images.map((img, index) => (
          <div
            key={img.id}
            className="col-12 col-sm-6 col-md-4 mb-4"
          >
            <div
              className={`card shadow-sm h-100 cursor-pointer animatable ${animations[index % animations.length]
                }`}
            // style={{
            //   animationDelay: `${index * 0.12}s`,
            // }}
            >
              {/* Image Wrapper prevents ALT flash */}
              <div className="image-wrapper">
                {/* DELETE ICON TOP RIGHT */}
                {isAuthenticated &&
                  <button
                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 30, height: 30, padding: 0, zIndex: 2 }}
                    onClick={() => handleDelete(img)}
                  >
                    ✕
                  </button>
                }
                <img
                  src={img.url}
                  alt="" // prevent visual alt flash
                  className={`card-img-top ${loadedImages.has(img.id)
                    ? "image-visible"
                    : "image-hidden"
                    }`}
                  onLoad={() => {
                    setLoadedImages(prev => {
                      const updated = new Set(prev);
                      updated.add(img.id);
                      return updated;
                    });
                  }}
                />
              </div>

              <div className="card-body text-center p-2">
                <small className="fw-bold d-block">
                  {img.category}
                </small>
                <small>{img.model} - ₹{img.cost}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default Products;
