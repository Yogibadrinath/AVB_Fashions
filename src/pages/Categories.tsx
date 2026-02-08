import { useNavigate } from "react-router-dom";
import { useState } from "react";
import img1 from "../assets/product_image_1.jpg";
import useScrollAnimation from "../hooks/useScrollAnimation";
import "../App.css";

const Categories = () => {
  const navigate = useNavigate();

  //----------------------------------
  // Animation List
  //----------------------------------
  const animations = [
    "fadeInUp",
    "fadeInLeft",
    "fadeInRight",
    "fadeInDown",
    "bounceIn",
  ];

  //----------------------------------
  // Categories
  //----------------------------------
  const categories = [
    { id: 1, title: "Chudihar Big", image: img1 },
    { id: 2, title: "Tops", image: img1 },
    { id: 3, title: "Boys Sets", image: img1 },
    { id: 4, title: "Girls Pants", image: img1 },
    { id: 5, title: "Girls Small", image: img1 },
    { id: 6, title: "Ladies Inners", image: img1 },
    { id: 7, title: "Gents Inners", image: img1 },
    { id: 8, title: "Kids Inners", image: img1 },
  ];

  //----------------------------------
  // Run animation immediately
  //----------------------------------
  useScrollAnimation(true);

  const handleNavigate = (category: string) => {
    navigate("/products", {
      state: { category },
    });
  };

  return (
    <div className="row">
      {categories.map((category, index) => (
        <div
          key={category.id}
          className="col-12 col-sm-6 col-md-4 mb-4"
        >
          <div
            className={`card cursor-pointer h-100 animatable ${
              animations[index % animations.length]
            }`}
            style={{
              animationDelay: `${index * 0.15}s`,
            }}
            onClick={() => handleNavigate(category.title)}
          >
            <img
              src={category.image}
              className="card-img-top"
              alt="" // prevents alt flash
            />

            <div className="card-body text-center">
              <h5 className="card-title">
                {category.title}
              </h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
