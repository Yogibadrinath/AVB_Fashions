import React, { useEffect, useState } from "react";
import { getTopImages, type ProductImage } from "../components/GetImages";
import { useLoader } from "../context/LoaderContext";
import useScrollAnimation from "../hooks/useScrollAnimation";

const Dashboard = () => {
    const [images, setImages] = useState<ProductImage[]>([]);
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

    const { showLoader, hideLoader } = useLoader();

    const animations = [
        "fadeInUp",
        "fadeInLeft",
        "fadeInRight",
        "bounceIn",
        "fadeInDown",
    ];

    //----------------------------------------
    // Detect when ALL images are loaded
    //----------------------------------------
    const imagesReady =
        images.length > 0 && loadedImages.size === images.length;

    useScrollAnimation(imagesReady);

    //----------------------------------------
    // Fetch Images
    //----------------------------------------
    const fetchImages = async () => {
        showLoader();

        try {
            const data = await getTopImages();
            setImages(data);
        } catch (err) {
            console.error("Failed to load images", err);
            hideLoader();
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    //----------------------------------------
    // Reset loaded tracker when images change
    //----------------------------------------
    useEffect(() => {
        setLoadedImages(new Set());
    }, [images]);

    //----------------------------------------
    // Hide loader ONLY after images fully load
    //----------------------------------------
    useEffect(() => {
        if (imagesReady) {
            hideLoader();
        }
    }, [imagesReady]);

    return (
        <>
            <h2 className="mb-4 text-center">
                Welcome to AVB Fashions
            </h2>

            <div className="row">
                {images.map((img, index) => (
                    <div
                        key={img.id}
                        className="col-12 col-sm-6 col-md-4 mb-4"
                    >
                        <div
                            className={`card shadow-sm h-100 cursor-pointer animatable ${animations[index % animations.length]
                                }`}
                            style={{
                                animationDelay: `${index * 0.12}s`,
                            }}
                        >
                            {/* Image Wrapper prevents ALT flash */}
                            <div className="image-wrapper">
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
                                <small>{img.model}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Dashboard;
