import React, { useEffect, useState } from "react";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import {
  ADD_PROFILE_IMAGE_ROUTE,
  HOST,
  UPDATE_PROFILE_ROUTE,
  ADD_PROFILE_BANNER_ROUTE,
} from "@/utils/constants";
import axios from "axios";
const phoneRegex = /^\+?\d{4,16}$/;

const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [oldPass, setOldpass] = useState("");
  const [newPass, setNewpass] = useState("");
  const [passwordCancel, setPasswordCancel] = useState(false);
  const [editingData, setEditingData] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [about, setAbout] = useState("");
  const [noOfFriends, setNoOfFriends] = useState(0);
  const [BlockList, setBlockList] = useState(0);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8747/api/auth/user-info",
          {
            withCredentials: true,
          }
        );

        setFullName(response.data.fullName);
        setUserName(response.data.userName);
        setPhone(response.data.phone);
        setAbout(response.data.about);
        setNoOfFriends(response.data.noOffriends);
        setBlockList(response.data.BlockListSize);
        console.log("edditing");
      } catch (error) {
        console.error("Failed to fetch user info", error);
        toast.error("Failed to fetch user info");
      }
    };

    fetchUserInfo();
  }, [editingData]);

  const validateProfile = () => {
    if (!fullName) {
      toast.error("Full Name required");
      return false;
    }
    if (!userName) {
      toast.error("User Name required");
      return false;
    }

    if (phone) {
      if (!phoneRegex.test(phone)) {
        toast.error("this cant be a phone number");
        return false;
      }
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { fullName, userName, about, phone },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data) {
          toast.success("Profile Updated successfully");
          setEditingData(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to update profile");
      }
    }
  };

  const changePassword = async () => {
    if (!oldPass) {
      return toast.error("Old Password is required");
    }
    if (!newPass) {
      return toast.error("New Password is required");
    }

    try {
      const response = await axios.post(
        "http://localhost:8747/api/auth/change-password",
        { oldPass, newPass },
        { withCredentials: true }
      );

      if (response.status === 200 && response.data) {
        toast.success("Password changed successfully");
        setOldpass("");
        setNewpass("");
        setEditingPassword(false);
      }
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return toast.error("Old Password is incorrect");
      }
      console.log(error);
      toast.error("Failed to update Password");
    }
  };

  const handleImageChange = () => {
    // Create an input element to upload the image
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    // When a file is selected, handle the image change and update local storage
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        // Update the image in the server first
        const formData = new FormData();
        formData.append("profile-image", file);
        try {
          const response = await apiClient.post(
            ADD_PROFILE_IMAGE_ROUTE,
            formData,
            {
              withCredentials: true,
            }
          );

          if (response.status === 200 && response.data.image) {
            // Convert image to base64
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64Image = reader.result;
              // Store the base64 image in localStorage
              localStorage.setItem("image", base64Image);
              // Update the userInfo in your store
              setUserInfo({ ...userInfo, image: response.data.image });
              toast.success("Image Updated Successfully");
            };
            reader.readAsDataURL(file); // Read file as base64
          }
        } catch (error) {
          toast.error("Failed to upload image");
        }
      }
    };
    fileInput.click();
  };

  const handleBannerClick = () => {
    // Create an input element for file selection
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    // Handle file selection
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        // Send the selected file to the server
        const formData = new FormData();
        formData.append("banner-image", file);
        try {
          const response = await apiClient.post(
            ADD_PROFILE_BANNER_ROUTE,
            formData,
            {
              withCredentials: true,
            }
          );

          if (response.status === 200 && response.data.banner) {
            // Convert banner image to base64
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64Banner = reader.result;
              // Store the base64 banner in localStorage
              localStorage.setItem("banner", base64Banner);
              // Update the userInfo with the new banner image
              setUserInfo({ ...userInfo, banner: response.data.banner });
              toast.success("Banner Updated Successfully");
            };
            reader.readAsDataURL(file); // Convert file to base64
          }
        } catch (error) {
          toast.error("Failed to upload banner image");
        }
      }
    };

    // Trigger the file input click to open the explorer
    fileInput.click();
  };

  return (
    <div className="profile">
      <div className="banner">
        <img
          src={localStorage.getItem("banner")}
          alt="Banner"
          className="bannerimage"
        />
        <div className="triangle" />
        <svg
          onClick={handleBannerClick}
          style={{ zIndex: "5" }}
          className="editbannericon"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.0376 5.16208L26.7979 9.87704M1 31L1.07986 30.4462C1.36246 28.487 1.50377 27.5073 1.82517 26.5926C2.11038 25.781 2.49999 25.0092 2.9844 24.2964C3.53029 23.4929 4.23679 22.7931 5.64979 21.3936L25.2537 1.9765C26.5683 0.6745 28.6995 0.6745 30.0142 1.9765C31.3286 3.2785 31.3286 5.38946 30.0142 6.69146L10.0504 26.4648C8.76853 27.7345 8.1276 28.3693 7.39755 28.8741C6.74955 29.3222 6.05067 29.6934 5.31527 29.9801C4.48676 30.3032 3.59818 30.4807 1.8212 30.8358L1 31Z"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
        </svg>
      </div>
      <div className="profileinfo">
        <header>
          <div className="imagediv">
            <img
              src={localStorage.getItem("image")}
              alt=""
              className="pfpimage"
            />
            <div className="halfcircle" />
            <svg
              onClick={handleImageChange}
              style={{ zIndex: "5" }}
              className="editpfpicon"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.0376 5.16208L26.7979 9.87704M1 31L1.07986 30.4462C1.36246 28.487 1.50377 27.5073 1.82517 26.5926C2.11038 25.781 2.49999 25.0092 2.9844 24.2964C3.53029 23.4929 4.23679 22.7931 5.64979 21.3936L25.2537 1.9765C26.5683 0.6745 28.6995 0.6745 30.0142 1.9765C31.3286 3.2785 31.3286 5.38946 30.0142 6.69146L10.0504 26.4648C8.76853 27.7345 8.1276 28.3693 7.39755 28.8741C6.74955 29.3222 6.05067 29.6934 5.31527 29.9801C4.48676 30.3032 3.59818 30.4807 1.8212 30.8358L1 31Z"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="nameabout">
            <h2>{userName}</h2>
            <div>
              <label htmlFor="aboutlable" className="aboutlable">
                About
              </label>
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className={editingData ? "aboutinput" : "aboutinput disabled"}
              />
            </div>
          </div>
          <div className="id">
            <label htmlFor="idlable">ID</label>
            <h3>{userInfo.id}</h3>
          </div>
        </header>
        <div className="stats">
          <div className="data">
            <h2 className="accountdetails">Account Details</h2>
            <div className="option">
              <label htmlFor="Fname">FullName</label>
              <input
                type="text"
                id="Fname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={editingData ? "" : "disabled"}
              />
            </div>
            <div className="option">
              <label htmlFor="Lname">UserName</label>
              <input
                type="text"
                id="Lname"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className={editingData ? "" : "disabled"}
              />
            </div>
            <div className="option">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                id="Email"
                value={userInfo.email}
                className="disabled"
              />
            </div>
            <div className="option">
              <label htmlFor="Phone">Phone</label>
              <input
                type="text"
                id="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={editingData ? "" : "disabled"}
              />
            </div>
            <button
              className="btn"
              onClick={editingData ? saveChanges : () => setEditingData(true)}
            >
              {editingData ? "Save Changes" : "Edit Data"}
            </button>

            {editingData ? (
              <button
                className="btn"
                style={{ backgroundColor: "rgb(148 38 38)" }}
                onClick={() => {
                  setEditingData(false);
                }}
              >
                Cancel
              </button>
            ) : (
              ""
            )}

            <h2 className="changepass">Change Password</h2>
            <div className="option">
              <label htmlFor="Cpass">Current Password</label>
              <input
                type="password"
                id="Cpass"
                value={oldPass}
                onChange={(e) => setOldpass(e.target.value)}
                className={editingPassword ? "" : "disabled"}
              />
            </div>
            <div className="option">
              <label htmlFor="Npass">New Password</label>
              <input
                type="password"
                id="Npass"
                value={newPass}
                onChange={(e) => setNewpass(e.target.value)}
                className={editingPassword ? "" : "disabled"}
              />
            </div>
            <button
              className="btn"
              onClick={
                editingPassword
                  ? changePassword
                  : () => setEditingPassword(true)
              }
            >
              {editingPassword ? "Save Changes" : "Change password"}
            </button>

            {editingPassword ? (
              <button
                className="btn"
                style={{ backgroundColor: "rgb(148 38 38)" }}
                onClick={() => {
                  setEditingPassword(false);
                  setOldpass("");
                  setNewpass("");
                }}
              >
                Cancel
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="settings">
            <div className="groups g1">
              <div className="row">
                <h4>Friends</h4>
                <p>{noOfFriends}</p>
              </div>
              <div className="row">
                <h4>Block List</h4>
                <p>{BlockList}</p>
              </div>
            </div>
            <div className="groups g2">
              <div className="row">
                <h4>Notification</h4>
                <p>data</p>
              </div>
              <div className="row">
                <h4>Hide account</h4>
                <p>data</p>
              </div>
              <div className="row">
                <h4>Dark Mode</h4>
                <p>data</p>
              </div>
            </div>
            <div className="groups g3">
              <h3>Media Sent</h3>
              <div className="row">
                <h4>Photos</h4>
                <p>42</p>
              </div>
              <div className="row">
                <h4>Videos</h4>
                <p>32</p>
              </div>
              <div className="row">
                <h4>Documents</h4>
                <p>75</p>
              </div>
            </div>
            <button className="deletebtn">Delete account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
