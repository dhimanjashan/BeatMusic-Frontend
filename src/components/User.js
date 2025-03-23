import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../state/userSlice";
import { logout } from "../state/authSlice";
import AlertModal from "./AlertModal";
import { pauseAudio } from "../state/audioSlice";
import { useNavigate } from "react-router-dom";

const User = ({ setIsNavOpen }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleMobile, setIsModalVisibleMobile] = useState(false);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector((state) => state.user.userID);
  const userDataFromRedux = useSelector((state) => state.user.userData);
  const [userData, setUserDataState] = useState(userDataFromRedux || null);
  const [alertMessage, setAlertMessage] = useState("");
  const { audioElement } = useSelector((state) => state.audio);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1160);

  const toggleProfile = async (event) => {
    event.stopPropagation();
    setIsModalVisible((prev) => !prev);
    setIsModalVisibleMobile((prev) => !prev);
    if (isMobile) {
      setIsNavOpen(false);
      navigate("/userDetails");
      return;
    }
    const API_URL = "http://localhost:5000";
    try {
      const response = await fetch(`${API_URL}/api/users/${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const fetchedData = await response.json();
      if (response.ok) {
        setUserDataState(fetchedData);
        dispatch(setUserData(fetchedData));
        localStorage.setItem("userData", JSON.stringify(fetchedData));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    setTimeout(() => {
      localStorage.removeItem("auth-token");
      dispatch(pauseAudio());
      dispatch(logout());
      setUserDataState(null);
      setIsModalVisible(false);
      setIsModalVisibleMobile(false);
      setAlertMessage(" ");
    }, 100);
  };

  const handleFavoriteDelete = async (userID) => {
    try {
      const response = await fetch(
        "http://172.20.10.4:5000/api/favsongs/remove",
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
        console.log("Favorite songs cannot be deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting the songs:", error);
    }
  };

  const handleDeleteClick = () => {
    localStorage.removeItem("auth-token");
    setAlertMessage("");
    setShowModal(true);
  };

  const handleDelete = async () => {
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
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (alertMessage) {
      console.log("Alert Message Updated:", alertMessage);
    }
  }, [alertMessage]);

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalVisible(false);
        setIsModalVisibleMobile(false);
      }
    };

    if (isModalVisible) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isModalVisible]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1160);
      console.log("isMobile:", window.innerWidth <= 1160);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!userDataFromRedux) {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        setUserDataState(parsedData);
        dispatch(setUserData(parsedData));
      }
    }
  }, [userDataFromRedux, dispatch]);

  return (
    <div className="profile-container">
      <div className="user-icon" onClick={toggleProfile}>
        <i className="fa-solid fa-user"></i>
      </div>
      {isModalVisible && !isMobile && (
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
            <button className="userBtn" id="logout" onClick={handleLogout}>
              Logout
            </button>
            <button className="userBtn" id="delete" onClick={handleDeleteClick}>
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
          type="warning"
        />
      )}
    </div>
  );
};

export default User;
