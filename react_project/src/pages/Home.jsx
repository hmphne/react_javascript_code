import { Link } from "react-router-dom";
import styles from "../App.module.css";
import react_logo from "../assets/react_logo.png";

const Home = () => {
  return (
    <main className={styles.main}>
      <img src={react_logo} />
      <h1>Project Template</h1>
      <div className={styles.instructions}>
        <div>
          <p>Installed: React Router, React Query</p>
          <p>
            Add any additional packages you need to the json file when
            installing.
          </p>
        </div>
      </div>
        <div className={styles.routes}>
          <Link className="underline" to="/layout">Layout</Link>
          <Link className="underline" to="/table">Table</Link>
          <Link className="underline" to="/searchbar">Search bar</Link>
        </div>
    </main>
  );
};

export default Home;
