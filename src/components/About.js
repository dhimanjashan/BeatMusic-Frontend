import React from "react";
import Footer from "./Footer";

const About = () => {
  return (
    <>

      <div className="aboutcontainer1">
        <h1 className="aboutheading1">About Padlo Sohneyo</h1>
      </div>
      <hr className="aboutHr"></hr>
      <div className="aboutcontainer2">
        <div className="aboutcontainer3">
          <h1 className="aboutheading2">Introduction</h1>
          <p className="aboutparagraph1">
            Welcome to BeatMusic, your ultimate destination for discovering and
            enjoying great music. Whether you're looking to listen to the latest
            hits or explore new and upcoming artists, we have something for
            everyone. At BeatMusic, we believe in the power of music to connect
            people and inspire creativity. Our platform offers a wide variety of
            genres and playlists to suit every mood and occasion. Join our
            growing community of music lovers, share your favorite tracks, and
            find new favorites along the way. Let the music play and make every
            day a little more vibrant with BeatMusic!
          </p>
        </div>
        <div className="aboutcontainer4">
          <h1 className="aboutheading3">Features</h1>
          <p className="aboutparagraph2">
            BeatMusic offers a range of features designed to enhance your music
            experience. Our platform supports high-quality streaming, ensuring
            you enjoy every beat in crystal-clear sound. BeatMusic brings the
            world of music to your fingertips, making it easier than ever to
            explore, enjoy, and share your favorite tunes. User-friendly
            interface that makes finding and playing music a breeze. With a wide
            selection of songs and playlists, you can quickly find what you
            love. It's all about enjoying music, sharing it, and discovering new
            sounds.
          </p>
        </div>
        <div className="aboutcontainer5">
          <h1 className="aboutheading4">History</h1>
          <p className="aboutparagraph3">
            BeatMusic was founded with a simple mission: to connect people
            through the power of music. What started as a small platform for
            music lovers has now grown into a global community, offering a wide
            range of features for both listeners and artists. Over the years,
            BeatMusic has evolved, continuously improving its user experience,
            expanding its music library, and adding new tools for creators.
            Today, BeatMusic continues to innovate, bringing people closer to
            the music they love while supporting emerging artists from all over
            the world.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
