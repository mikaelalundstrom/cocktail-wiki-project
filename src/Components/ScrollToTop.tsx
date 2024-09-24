import { useEffect, useState } from "react";
import ArrowUp from "../assets/arrow-up.svg";
import "./css/ScrollToTop.css";

function ScrollToTop() {
  const [showScrollTopBtn, setShowScrollTopBtn] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const handleScroll = () => {
    // check how far from top and display/hide scroll to top button
    if (document.documentElement.scrollTop > 20) {
      setShowScrollTopBtn(true);
    } else {
      setShowScrollTopBtn(false);
    }
  };
  // keep track of scroll position
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // clean up
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      {showScrollTopBtn ? (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <img src={ArrowUp} alt="To top" />
        </button>
      ) : null}
    </>
  );
}

export default ScrollToTop;
