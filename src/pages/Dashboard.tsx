import React, { useEffect, useState } from "react";
import { getTopImages, type ProductImage } from "../components/getImages";
import { useLoader } from "../context/LoaderContext";

const Dashboard = () => {
    const [images, setImages] = useState<ProductImage[]>([]);
    const { showLoader, hideLoader } = useLoader();

    const fetchImages = async () => {
            showLoader();
            const data = await getTopImages();
            setImages(data);
            hideLoader();
    }

    useEffect(() => {


        fetchImages();
    }, []);

    return (
        <>
            <h2 className="mb-4 text-center">
                Welcome to AVB Fashions
            </h2>

            <div className="row">
                {images.map((img) => (
                    <div key={img.id} className="col-12 col-sm-6 col-md-4 mb-4">
                        <div className="card shadow-sm h-100 cursor-pointer">
                            <img
                                src={img.url}
                                className="card-img-top"
                                alt={img.model}
                                loading="lazy"
                            />

                            <div className="card-body text-center p-2">
                                <small className="fw-bold d-block">
                                    {img.category}
                                </small>
                                <small className="">
                                    {img.model}
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Dashboard;
