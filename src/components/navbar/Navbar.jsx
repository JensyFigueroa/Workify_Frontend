import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useEffect, useState } from 'react'
import SearchBar from '../searchBar/SearchBar';

import { BsFillPersonLinesFill } from "react-icons/bs";

const Navbar = () => {
  const [clickBurguer, setClickBurguer] = useState(false);

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });

  if (screenSize.width > 1023 & clickBurguer) {
    setClickBurguer(false)
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    setClickBurguer(!clickBurguer)
  }
  return (
    <>
      <nav className={styles.container}>
        <div>
          <h1>Logo</h1>
        </div>

        <div>
          <SearchBar />
        </div>

        <div className={`${styles.links} ${clickBurguer ? styles.show : ''} `}>

          <NavLink to='/about' className={({ isActive }) => (isActive ? styles.active : styles.link)} onClick={handleClick}>About</NavLink>

        </div>

        <div className="btn-group btn" role="group" >
          <button type="button" className={`${styles.btn} btn btn-primary dropdown-toggle`} style={{color:'black'}} data-bs-toggle="dropdown" aria-expanded="false">
            <BsFillPersonLinesFill style={{color:'black'}}/>
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Login</a></li>
            <li><a className="dropdown-item" href="#">Log Out</a></li>
          </ul>
        </div>

        <div className={`${styles.btnBurguer} ${styles.navIcon} ${clickBurguer ? styles.open : ''}`} onClick={handleClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`${styles.curtain} ${clickBurguer ? styles.showCurtain : ''}`}></div>

      </nav>
    </>


  );
};

export default Navbar;
