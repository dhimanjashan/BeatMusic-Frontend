import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { playAudio, pauseAudio } from "../state/audioSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = ({ setActiveLink, isNavOpen }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(4);
  const dispatch = useDispatch();
  const SET_HEADING = "SET_HEADING";
  const [isLoading, setIsLoading] = useState(false);
  const { isPlaying, currentSong, audioElement } = useSelector(
    (state) => state.audio
  );

  const changeHeading = (newHeading) => {
    dispatch({ type: "SET_HEADING", payload: newHeading });
    localStorage.setItem("heading", newHeading);
  };

  const changeImage = (newImage) => {
    dispatch({ type: "SET_IMAGE", payload: newImage });
    localStorage.setItem("image", newImage);
  };

  useEffect(() => {
    const storedHeading = localStorage.getItem("heading");
    if (storedHeading) {
      dispatch({ type: SET_HEADING, payload: storedHeading });
    }
  }, [dispatch]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (
        e.code === "Space" &&
        e.target.tagName !== "INPUT" &&
        e.target.tagName !== "TEXTAREA"
      ) {
        e.preventDefault(); // Prevent page scroll
        if (currentSong && audioElement) {
          if (isPlaying) {
            audioElement.pause();
            dispatch(pauseAudio());
          } else {
            audioElement.play();
            dispatch(
              playAudio({ songUrl: audioElement.src, song: currentSong })
            );
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [dispatch, isPlaying, currentSong, audioElement]);

  const handleNavigation = (link) => {
    setActiveLink(link);
  };

  const handleArtistClick = (path, setheading, artistImage) => {
    console.log(path);
    console.log(setheading);
    navigate(path);
    changeHeading(setheading);
    changeImage(artistImage);
  };

  const featuredArtists = [
    {
      name: "Jordan Sandhu",
      image: "jordan sandhu5.jpg",
      artistImage: "jordan-sandhu.jpg",
      path: "/musiclist",
      description: "Rising star in Punjabi music industry",
      setheading: "Hanji Sohneyo Suniye Song Jordan Sandhu De 🎵",
    },
    {
      name: "Nimrat Khaira",
      image: "nimrat-khaira.jpg",
      artistImage: "Nimrat Khaira.jpg",
      path: "/musiclist",
      description: "Voice that touches hearts",
      setheading: "Hanji Sohneyo Suniye Song Nimrat Khaira De 🎵",
    },
    {
      name: "Arjan Dhillon",
      image: "arjan-dhillon.jpg",
      artistImage: "arjan dhillon.jpg",
      path: "/musiclist",
      description: "The powerful voice of Punjab",
      setheading: "Hanji Sohneyo Suniye Song Arjan Dhillon De 🎵",
    },
    {
      name: "Sunanda Sharma",
      image: "sunanda-sharma.jpg",
      artistImage: "Sunanda Sharma.jpg",
      path: "/musiclist",
      description: "Queen of Punjabi pop music",
      setheading: "Hanji Sohneyo Suniye Song Sunanda Sharma De 🎵",
    },
    {
      name: "Amrinder Gill",
      image: "amrinder-gill.jpg",
      artistImage: "Amrinder Gill.jpg",
      path: "/musiclist",
      description: "Known for his soulful songs",
      setheading: "Hanji Sohneyo Suniye Song Amrinder Gill De 🎵",
    },
    // Add more artists here
  ];

  // Calculate number of pages based on visible slides
  const [totalPages, setTotalPages] = useState(
    Math.ceil(featuredArtists.length / visibleSlides)
  );

  useEffect(() => {
    setTotalPages(Math.ceil(featuredArtists.length / visibleSlides) || 1);
  }, [featuredArtists.length, visibleSlides]);
  const newReleases = [
    {
      title: "Latest Punjabi Hits",
      image: "path_to_image",
      path: "/newmusic",
      description: "Fresh beats from Punjab",
    },
    {
      title: "Trending Now",
      image: "path_to_image",
      path: "/punjabimusic",
      description: "What's hot in Punjabi music",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setVisibleSlides(1);
      } else if (window.innerWidth <= 768) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(4);
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    // Auto-slide
    let slideInterval;
    if (window.innerWidth > 700) {
      // Auto-slide only for large screens
      slideInterval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalPages);
      }, 3000);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(slideInterval);
    };
  }, [totalPages]);

  // Add trending songs data
  const trendingSongs = [
    {
      title: "Defender",
      artist: "Harf cheema",
      plays: "20M+ plays",
      image: "Harf cheema.jpg",
      songID: "Defender_DJJOhAL.Com_a6cio1",
    },
    {
      title: "Fomo",
      artist: "Jordan Sandhu",
      plays: "10M+ plays",
      image: "jordan sandhu.jpg",
      songID: "Fomo_1_ohz3qx",
    },
    {
      title: "Ammi Wargiye Ni",
      artist: "Shree Brar",
      plays: "4M+ plays",
      image: "shree brar.jpg",
      songID: "Ammi_Wargiye_Ni_-_Shree_Brar_rq59b9",
    },
    // Add more songs
  ];

  const handleClick = async (songIndex) => {
    if (isLoading) return;
    setIsLoading(true);

    const song = trendingSongs[songIndex];
    const API_URL = "https://beatmusic-backend.onrender.com";
    try {
      // Fix the song ID key to match the backend expectation
      const response = await fetch(`${API_URL}/api/songs/${song.songID}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      const songUrl = data.file_path; // ✅ Use file_path from response
      console.log("Fetched Song URL:", songUrl);

      if (!songUrl) {
        console.error("Invalid file path received:", songUrl);
        return;
      }

      // Stop current playback
      audioElement.pause();
      audioElement.src = songUrl;
      audioElement.load();

      audioElement.oncanplaythrough = async () => {
        try {
          await audioElement.play();
          dispatch(
            playAudio({
              songUrl: songUrl,
              song: {
                ...song,
                id: song.songID,
              },
            })
          );
        } catch (error) {
          console.error("Error playing audio:", error);
        } finally {
          setIsLoading(false);
        }
      };

      audioElement.onerror = () => {
        console.error("Audio element error");
        setIsLoading(false);
      };
    } catch (error) {
      console.error("Error fetching song:", error);
      setIsLoading(false);
    }
  };

  const handlePlayPause = (index) => {
    const song = trendingSongs[index];

    if (isPlaying && currentSong && currentSong.id === song.songID) {
      audioElement.pause();
      dispatch(pauseAudio());
    } else {
      handleClick(index);
    }
  };

  const handleCategories = (path) => {
    navigate(path);
  };
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      touchEndX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const swipeDistance = touchStartX - touchEndX;

      if (swipeDistance > 50) {
        setCurrentSlide((prev) => (prev + 1 < totalPages ? prev + 1 : 0));
      } else if (swipeDistance < -50) {
        setCurrentSlide((prev) => (prev - 1 >= 0 ? prev - 1 : totalPages - 1));
      }
    };

    const carousel = document.querySelector(".carousel-container");

    if (carousel) {
      carousel.addEventListener("touchstart", handleTouchStart);
      carousel.addEventListener("touchmove", handleTouchMove);
      carousel.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("touchstart", handleTouchStart);
        carousel.removeEventListener("touchmove", handleTouchMove);
        carousel.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [totalPages]);

  return (
    <div
      className={
        isNavOpen ? "home-container blur-background" : "home-container"
      }
    >
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Welcome to Punjabi Music Hub</h1>
        <p className="hero-subtitle">Discover the Best of Punjabi Music</p>
      </section>

      {/* Featured Artists Carousel */}
      <section className="featured-artists">
        <h2>Featured Artists</h2>
        <div className="carousel-container">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${
                currentSlide * (100 / visibleSlides)
              }%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {featuredArtists.map((artist, index) => (
              <Link
                to={artist.path}
                key={index}
                className="artist-card"
                onClick={() =>
                  handleArtistClick(
                    artist.path,
                    artist.setheading,
                    artist.artistImage
                  )
                }
                style={{
                  flex: `0 0 ${90 / visibleSlides}%`,
                  transform: `translateX(-${currentSlide * 0}%)`,
                }}
              >
                <div className="artist-image-container">
                  <img src={artist.image} alt={artist.name} />
                </div>
                <h3>{artist.name}</h3>
                <p>{artist.description}</p>
              </Link>
            ))}
          </div>
          <div className="carousel-dots">
            {[...Array(totalPages)].map((_, index) => (
              <span
                key={index}
                className={`dot ${currentSlide === index ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Releases Section */}
      <section className="new-releases">
        <h2>New Releases</h2>
        <div className="releases-grid">
          {newReleases.map((release, index) => (
            <Link
              to={release.path}
              key={index}
              className="release-card"
              onClick={() => handleNavigation(release.path)}
            >
              <div className="release-content">
                <h3>{release.title}</h3>
                <p>{release.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links">
        <h2>Quick Access</h2>
        <div className="links-grid">
          <Link
            to="/favourite"
            className="quick-link-card"
            onClick={() => handleNavigation("/favourite")}
          >
            <i className="fas fa-heart"></i>
            <span>Your Favorites</span>
          </Link>
          <Link to="/punjabimusic" className="quick-link-card">
            <i className="fas fa-music"></i>
            <span>All Songs</span>
          </Link>
          <Link
            to="/newmusic"
            className="quick-link-card"
            onClick={() => handleNavigation("/newmusic")}
          >
            <i className="fas fa-compact-disc"></i>
            <span>New Releases</span>
          </Link>
        </div>
      </section>

      {/* Trending Section */}
      <section className="trending-section">
        <h2>Trending This Week</h2>
        <div className="trending-grid">
          {trendingSongs.map((song, index) => (
            <div key={index} className="trending-card">
              <div className="trending-image">
                <img src={song.image} alt={song.title} loading="lazy" />
                <div
                  className="play-overlay"
                  onClick={() => handlePlayPause(index)}
                  style={{ cursor: "pointer" }}
                >
                  <i className={isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
                </div>
              </div>
              <div className="trending-info">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
                <span className="plays">{song.plays}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Browse Categories</h2>
        <div className="categories-grid">
          <div
            className="category-card romantic"
            onClick={() => handleCategories("/roadSongs")}
          >
            <i className="fas fa-car"></i>
            <h3>Driving & Road Trip</h3>
          </div>
          <div
            className="category-card party"
            onClick={() => handleCategories("/partySongs")}
          >
            <i className="fas fa-music"></i>
            <h3>Party</h3>
          </div>
          <div
            className="category-card devotional"
            onClick={() => handleCategories("/gamingSongs")}
          >
            <i className="fas fa-gamepad"></i>
            <h3>Gaming Mode</h3>
          </div>
          <div
            className="category-card workout"
            onClick={() => handleCategories("/weddingSongs")}
          >
            <i className="fas fa-users"></i>
            <h3>Wedding</h3>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Your ultimate destination for Punjabi music</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/newmusic">New Releases</Link>
              </li>
              <li>
                <Link to="/punjabimusic">Top Charts</Link>
              </li>
              <li>
                <Link to="/showFavourite">Your Favorites</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/jashandeep-singh-50826833a/"
                target="blank"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://www.instagram.com/codingwithhappiness/"
                target="blank"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://x.com/Jashan5909" target="blank">
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.youtube.com/@codingwith_happiness06/videos"
                target="blank"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; www.<span>Beat</span>Music.com. All rights reserved. Designed
            by Jashan
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
