import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../component/layout/Layout";
import UserMenu from "./UserMenu";
import { useAuth } from "../../Context/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Profile.css"; // Import custom CSS for additional styling

const Profile = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    name: "",
    termsAccepted: false,
  });

  useEffect(() => {
    if (auth?.user) {
      setFormData((prevState) => ({
        ...prevState,
        email: auth.user.email || "",
        name: auth.user.name || "",
        phone: auth.user.phone || "",
        address: auth.user.address || "",
      }));
    }
  }, [auth?.user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("All fields are required!");
      return;
    }
    try {
      const { data } = await axios.put(
        "http://localhost:5020/api/auth/update-profile",
        JSON.stringify({
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (data.success) {
        toast.success("Profile updated successfully");
        setAuth({ ...auth, user: data.user });
        localStorage.setItem(
          "auth",
          JSON.stringify({ ...auth, user: data.user })
        );
        setShowModal(false);
      } else {
        toast.error(data.message || "Update failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while updating. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="container-fluid profile-container">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card profile-card">
              <div className="card-body text-center">
                <h5 className="card-title profile-title">User Profile</h5>
                <div className="profile-info">
                  <p>
                    <strong>Name:</strong> {formData.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {formData.address}
                  </p>
                </div>
                <button
                  className="btn btn-primary edit-profile-btn"
                  onClick={() => setShowModal(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header flex-row justify-content-between">
                  <h5 className="modal-title">Update Profile</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setShowModal(false)}
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={formData.email}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        pattern="^[0-9]{10}$"
                      />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <textarea
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-success">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
