import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { logout } from "../state/authSlice";
import { useDispatch } from "react-redux";
import AlertModal from "./AlertModal"; // Import custom alert
import { playAudio, pauseAudio } from "../state/audioSlice";

const User = ({ musicId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user.userID);
  const [userData, setUserData] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const { audioElement } = useSelector((state) => state.audio);
  const [showModal, setShowModal] = useState(false);

  const toggleProfile = async (event) => {
    event.stopPropagation(); // Prevents the immediate closing of the modal
    setIsModalVisible((prev) => !prev);

    try {
      const response = await fetch(
        `http://172.20.10.4:5000/api/users/${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const fetchedData = await response.json();
      setUserData(fetchedData);
      console.log(fetchedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0; // Reset progress bar to beginning
    }
    setTimeout(() => {
      dispatch(pauseAudio());
      dispatch(logout());
      setUserData(null);
      setIsModalVisible(false);
      setAlertMessage(" "); // Clear alert after a short delay
    }, 100);
  };

  const handleFavoriteDelete = async (userID) => {
    try {
      const response = await fetch('http://172.20.10.4:5000/api/favsongs/remove', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID })

      })
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
      }
      else {
        console.log("Favorite songs can not deleted successfully");
      }
    } catch (error) {
      console.error("Error to delete the songs:", error);
    }
  }

  const handleDeleteClick = () => {
    setAlertMessage("");
    setShowModal(true); // Show the modal when delete button is clicked
  };
  const handleDelete = async () => {
    console.log("Delete function executed");
    if (!userID) {
      setAlertMessage("User ID not found!");
      return;
    }
    try {
      const response = await fetch(
        `http://172.20.10.4:5000/api/users/jashan/${userID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log(alertMessage);
        handleFavoriteDelete(userID);
        setTimeout(() => {
          handleLogout();
          setShowModal(false);
        }, 100);
      } else {
        setTimeout(() => {
          setAlertMessage("Failed to delete account.");
        }, 3000);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setAlertMessage("Error deleting account!");
    } finally {
      setShowModal(false); // Hide modal regardless of outcome
    }
  };
  useEffect(() => {
    if (alertMessage) {
      console.log("Alert Message Updated:", alertMessage); // Debugging
    }
  }, [alertMessage]);
  const handleCancelDelete = () => {
    setShowModal(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalVisible(false);
      }
    };

    if (isModalVisible) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isModalVisible]);

  return (
    <div className="profile-container">
      <div className="user-icon" onClick={toggleProfile}>
        <i className="fa-solid fa-user"></i>
      </div>
      {isModalVisible && (
        <div
          className="profile-modal"
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="user-info">
            <img className="userImg" src="user.png" alt="User" />
            <h3>{userData?.name || "Unknown User"}</h3>
            <p>{userData?.email || "No Email Available"}</p>
          </div>
          <div className="btn-container">
            <button
              className="userBtn"
              id="logout"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button>
            <button
              className="userBtn"
              id="delete"
              onClick={() => handleDeleteClick()}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {showModal && (
        <AlertModal
          title="Confirm Account Deletion"
          message="Deleting your account is a permanent action. Are you absolutely sure you want to proceed? Your data will be lost forever."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default User;
