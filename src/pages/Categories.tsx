import { useNavigate } from "react-router-dom";
import img1 from "../assets/product_image_1.jpg";
import "../App.css";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, title: "Tops", image: img1 },
    { id: 2, title: "Dresses", image: img1 },
    { id: 3, title: "Jeans", image: img1 },
  ];

  const handleNavigate = (category: string) => {
    navigate("/products", {
      state: { category },
    });
  };

  return (
    <div className="row">
      {categories.map((category) => (
        <div
          key={category.id}
          className="col-12 col-sm-6 col-md-4 mb-4"
        >
          <div
            className="card cursor-pointer h-100"
            onClick={() => handleNavigate(category.title)}
          >
            <img
              src={category.image}
              className="card-img-top"
              alt={category.title}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{category.title}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
