import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";



const User = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef(null);
  const userID = useSelector((state) => state.user.userID);
  const [userData, setUserData] = useState(null);

  const toggleProfile = async(event) => {
    event.stopPropagation(); // Prevents the immediate closing of the modal
    setIsModalVisible((prev) => !prev);
    try {
        const response = await fetch(`http://172.20.10.4:5000/api/users/${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            const fetchedData = await response.json();
            setUserData(fetchedData);
            console.log(fetchedData); 
      } catch (error) {
        console.error("Error:", error);
      }
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
        <div className="profile-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
          <div className="user-info">
          <img class="userImg" src="user.png" alt="User"/>
          <h3>{userData?.name || "Unknown User"}</h3>
          <p>{userData?.email || "No Email Available"}</p>
          </div>
          <div className="btn-container">
            <button className="userBtn" id="logout" onClick={() => setIsModalVisible(false)}>Logout</button>
            <button className="userBtn" id="delete" onClick={() => setIsModalVisible(false)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
