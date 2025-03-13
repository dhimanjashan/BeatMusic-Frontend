import React, { useEffect } from "react";
import Footer from "./Footer";

const Help = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  })

  return (
    <>

      <div className="helpContainer2">
        <div className="helpContainer3">
          <h1 className="helpHeading2">Frequently asked</h1>
          <h2 className="questions">questions</h2>
          <h2 className="helpHeading3">
            Do you need some help with something or do you have questions on
            some features?
          </h2>
          <div className="faq-container">
            <div className="faq-item">
              <label className="faq-question" htmlFor="faq1">
                What is BeatMusic?
              </label>
              <input type="checkbox" id="faq1" />
              <div className="faq-answer">
                BeatMusic is an online platform that allows users to listen
                music. You can enjoy high-quality music anytime, anywhere.
              </div>
            </div>
            <div className="faq-item">
              <label className="faq-question" htmlFor="faq2">
                Is BeatMusic free to use?
              </label>
              <input type="checkbox" id="faq2" />
              <div className="faq-answer">
                Yes, BeatMusic offers a free version. We also provide premium
                plans with additional features such as offline playback, no ads,
                and high-quality streaming as the time changes.
              </div>
            </div>
            <div className="faq-item">
              <label className="faq-question" htmlFor="faq3">
                How do I play a song on BeatMusic?
              </label>
              <input type="checkbox" id="faq3" />
              <div className="faq-answer">
                Simply click on the play button to start streaming instantly.
              </div>
            </div>
            <div className="faq-item">
              <label className="faq-question" htmlFor="faq4">
                {" "}
                What should I do if BeatMusic is not working properly?
              </label>
              <input type="checkbox" id="faq4" />
              <div className="faq-answer">
                Try refreshing the page, checking your internet connection, or
                logging out and logging back in. If the issue persists, contact
                our support team.
              </div>
            </div>
            <div className="faq-item">
              <label className="faq-question" htmlFor="faq5">
                {" "}
                Does BeatMusic work on all devices and browsers?
              </label>
              <input type="checkbox" id="faq5" />
              <div className="faq-answer">
                Yes, BeatMusic is compatible with most modern browsers and
                available as a mobile app for iOS and Android.
              </div>
            </div>
            <div className="faq-item">
              <label className="faq-question" htmlFor="faq6">
                How do I contact customer support?
              </label>
              <input type="checkbox" id="faq6" />
              <div className="faq-answer">
                Email us at support@BeatMusic.com for assistance.
              </div>
            </div>
            <div className="faq-item">
              <label className="faq-question" htmlFor="faq7">
                Is my personal data safe on BeatMusic?
              </label>
              <input type="checkbox" id="faq7" />
              <div className="faq-answer">
                Yes, we prioritize user privacy and security. Your data is
                encrypted and protected according to our Privacy Policy.
              </div>
            </div>
            <div className="faq-item">
              <label className="faq-question" htmlFor="faq8">
                How do I delete my account permanently?
              </label>
              <input type="checkbox" id="faq8" />
              <div className="faq-answer">
                Go to Settings &gt; Account &gt; Delete Account. Once deleted,
                your data cannot be recovered.
              </div>
            </div>
            <div className="faq-item">
              <label className="faq-question" htmlFor="faq9">
                How do I organize my music library?
              </label>
              <input type="checkbox" id="faq9" />
              <div className="faq-answer">You can mark songs as favorites.</div>
            </div>
            <div className="faq-item">
              <label className="faq-question" htmlFor="faq10">
                Why is my music buffering or not playing?
              </label>
              <input type="checkbox" id="faq10" />
              <div className="faq-answer">
                This could be due to a slow internet connection or server
                issues. Try refreshing the page, checking your internet
                connection, or clearing your browser cache.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Help;
