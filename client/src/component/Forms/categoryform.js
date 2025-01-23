import React, { useState } from "react";

const CategoryForm = () => {
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("New Category:", newCategory);
    // Reset the input field after submission
    setNewCategory("");
  };

  return (
    <div class="mb-6">
      <label
        for="success"
        class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
      >
        Your name
      </label>
      <input
        type="text"
        id="success"
        class="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
        placeholder="Success input"
        disabled
      />
      <p class="mt-2 text-sm text-green-600 dark:text-green-500">
        <span class="font-medium">Well done!</span> Some success message.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3 w-75">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2 mx-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
