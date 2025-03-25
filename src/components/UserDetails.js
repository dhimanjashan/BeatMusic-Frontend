import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../state/authSlice";
import { pauseAudio } from "../state/audioSlice";
import AlertModal from "./AlertModal";

const UserDetails = ({ setActiveLink }) => {
  const [userData, setUserData] = useState(null);
  const userID = useSelector((state) => state.user.userID);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const { audioElement } = useSelector((state) => state.audio);

  useEffect(
    (event) => {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `https://beatmusic-backend.onrender.com/api/users/${userID}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const fetchedData = await response.json();
          setUserData(fetchedData);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      if (userID) {
        fetchUserData();
      }
    },
    [userID]
  );
  const handleAccount = () => {
    navigate("/createAccount");
  };
  const handleLogout = () => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    setTimeout(() => {
      dispatch(pauseAudio());
      dispatch(logout());
      setUserData(null);
      navigate("/login");
    }, 100);
  };
  const handleFavoriteDelete = async (userID) => {
    try {
      const response = await fetch(
        "https://beatmusic-backend.onrender.com/api/favsongs/remove",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
      } else {
        console.log("Favorite songs can not deleted successfully");
      }
    } catch (error) {
      console.error("Error to delete the songs:", error);
    }
  };
  const handleDeleteClick = () => {
    setShowModal(true);
  };
  const handleDelete = async () => {
    if (!userID) {
      return;
    }
    try {
      const response = await fetch(
        `https://beatmusic-backend.onrender.com/api/users/jashan/${userID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        handleFavoriteDelete(userID);
        setTimeout(() => {
          setActiveLink("/createAccount");
          dispatch(pauseAudio());
          dispatch(logout());
          setUserData(null);
          setUserData(null);
          handleAccount();
        }, 100);
      } else {
        setTimeout(() => {}, 3000);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };
  const handleCancelDelete = () => {
    setShowModal(false);
  };
  return (
    <>
      <div class="userProfile-container">
        <div class="userProfile-card">
          <div class="userProfile-header"></div>
          <img src="user.png" alt="User Image" class="userProfile-img" />
          <h2 class="user-name">{userData?.name || "Unknown User"}</h2>
          <p class="user-email">{userData?.email || "No Email Available"}</p>
          <div class="button-group">
            <button class="logout-btn" onClick={handleLogout}>
              Logout
            </button>
            <button class="delete-btn" onClick={() => handleDeleteClick()}>
              Delete Account
            </button>
          </div>
        </div>
        {showModal && (
          <AlertModal
            title="Confirm Account Deletion"
            message="Deleting your account is a permanent action. Are you absolutely sure you want to proceed? Your data will be lost forever."
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={handleDelete}
            onCancel={handleCancelDelete}
            type="warning"
          />
        )}
      </div>
    </>
  );
};

export default UserDetails;
