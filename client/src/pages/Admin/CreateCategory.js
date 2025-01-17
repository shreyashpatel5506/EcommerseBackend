import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import Layout from "../../component/layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryForm from "../../component/categoryform";
import { Modal } from "antd";
import { useAuth } from "../../Context/auth";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [auth] = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = auth.token;
    if (!token) {
      toast.error("No token found, please login again.");
      return;
    }
    console.log(auth.token);

    try {
      const { data } = await axios.post(
        "http://localhost:5020/api/category/create-category",
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllcategories();
      } else {
        toast.error("Something went wrong in input form");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Something went wrong in input form");
    }
  };
  const getAllcategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5020/api/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log("error" + error);
    }
  };
  const hanndleUpdate = async (e) => {
    e.preventDefault();
    try {
      // const data
      const { data } = await axios.put(
        `http://localhost:5020/api/category/update-category/${selected._id}`,
        { name: updatedName },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setModalOpen(false);
        getAllcategories();
      }
    } catch (error) {
      console.log("some error in find update");
    }
  };
  const handdleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5020/api/category/delete-category/${pid}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (data?.success) {
        toast.success("deleted successfully");
        getAllcategories();
      } else {
        toast.error("some error find in my code");
      }
    } catch (error) {
      console.error("Getting some error:-" + error);
      toast.error("error in deleting proccess");
    }
  };
  useEffect(() => {
    getAllcategories();
  }, []);
  return (
    <div>
      <Layout>
        <div className="container-fluid m-3 p-3 mx-0">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h3>Create Category</h3>
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
              <h3>Manage Categories</h3>
              <table className="table table-striped w-75">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c, index) => (
                    <tr key={c._id}>
                      <td>{index + 1}</td>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary mr-2 mx-3"
                          onClick={() => {
                            setModalOpen(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger mx-3 ms-2"
                          onClick={() => {
                            handdleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => {
                setModalOpen(false);
              }}
              footer={null}
              visible={modalOpen}
            >
              <CategoryForm
                handleSubmit={hanndleUpdate}
                value={updatedName}
                setValue={setUpdatedName}
              />
            </Modal>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CreateCategory;
