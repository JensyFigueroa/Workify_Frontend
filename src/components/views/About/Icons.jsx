import React from 'react';
import styles from "./Icons.module.css";
import { RiInstagramLine, RiTwitterLine, RiLinkedinLine, RiGithubLine } from 'react-icons/ri';

function Icons() {
  return (
    <div className={styles.icons}>
      <a href="https://www.instagram.com/gonzaleguizaa/" className={styles.instagram}>
        <RiInstagramLine />
        
      </a>
      <a href="https://www.linkedin.com/in/gonzalo-leguiza-75b155200/" className={styles.twitter}>
        <RiTwitterLine />
      </a>
      <a href="#" className={styles.linkedin}>
        <RiLinkedinLine />
      </a>
      <a href="https://github.com/GonzaloLeguiza" className={styles.github}>
        <RiGithubLine />
      </a>
    </div>
  );
}

export default Icons;
