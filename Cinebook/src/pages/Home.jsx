import { Link } from 'react-router-dom'
import logo from '../images/CinebookLogo-removebg-preview.png'
import styles from '../pages/Home.module.css'
import { useEffect, useState } from 'react'

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("✅ You have been logged out from the site");
    // ❌ no navigation, stays on Home
  };

  return (
    <>
      <div className={styles.logo}>
        <a href="/"><img src={logo} alt="Cinebook Logo" /></a>
        <h1>Cinebook</h1>
      </div>

      <nav className={styles.navbar}>
        <Link to="/"><button>Home</button></Link>
        <Link to="/about"><button>About</button></Link>

        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register"><button>Register</button></Link>
          </>
        )}
      </nav>

      <div className={styles.panel}>
        <h1>Cinebook helps you to find Movies 🎬</h1>
        <a href="/movie"><button>Click to Search for the Movie</button></a>
      </div>
    </>
  )
}

export default Home;
