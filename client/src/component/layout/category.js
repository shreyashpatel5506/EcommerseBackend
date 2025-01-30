import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5020/api/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-blue-500 text-white text-center p-3 rounded-lg cursor-pointer transition hover:bg-blue-600"
            onClick={() => navigate(`/category/${cat._id}`)}
          >
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
