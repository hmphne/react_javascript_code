import { useEffect, useRef, useState } from "react";
import styles from "../Layout.module.css";

const Layout = () => {
  const refContainer = useRef();
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const mainContentWidth = entries[0].contentRect.width;
      setIsVertical(mainContentWidth <= 500);
    });

    resizeObserver.observe(refContainer.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`${styles.container} ${
        isVertical ? styles.vertical : styles.horizontal
      }`}
    >
      <div className={`${styles.sidebar} ${isVertical ? "w-full" : ""}`}>
        Sidebar content
      </div>
      <div className={styles.main} ref={refContainer}>
        Main content
      </div>
    </div>
  );
};

export default Layout;
