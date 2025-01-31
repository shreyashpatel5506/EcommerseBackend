import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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
    <>
      <style>
        {`
          .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;  /* Chrome, Safari and Opera */
          }
        `}
      </style>

      <div className="w-full sticky top-16 z-40 bg-gray-800 border-b border-gray-700 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide items-center space-x-6 py-3">
            {categories.map((cat) => (
              <div
                key={cat._id}
                onClick={() => navigate(`/category/${cat._id}`)}
                className="group relative flex-shrink-0 cursor-pointer hover:text-white"
              >
                <span className="text-gray-300 group-hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  {cat.name}
                </span>
                {/* Animated bottom border */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-200 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
