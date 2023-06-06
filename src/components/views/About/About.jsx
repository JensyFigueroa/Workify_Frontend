import React from "react";
import styles from "./About.module.css";
import Icons from "./Icons";

import imgGonza from "./img/gonza.png";
import imgDiame from "./img/diame.png";
import imgDani from "./img/dani.png";
import imgCarlos from "./img/carlos.png";
import imgCarlosSerpiente from "./img/charliSerpiente.png";

const About = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Our team of developers</h2>
      <h5 className={styles.subtitle}>
        meet our diverse team of world-class creators, designers, and problem
        solvers
      </h5>
      <div className={styles.teamGrid}>
        <div className={styles.teamMember}>
          <img
            src={imgGonza}
            alt="Team Member"
            className={styles.memberImage}
          />
          <h3 className={styles.memberName}>Gonzalo </h3>
          <p className={styles.memberRole}>Front-end Developer</p>
          <Icons/>
        </div>
        <div className={styles.teamMember}>
          <img
            src={imgDiame}
            alt="Team Member"
            className={styles.memberImage}
          />
          <h3 className={styles.memberName}>Diame</h3>
          <p className={styles.memberRole}>UI/UX Designer</p>
          <Icons/>
        </div>
        <div className={styles.teamMember}>
          <img src={imgDani} alt="Team Member" className={styles.memberImage} />
          <h3 className={styles.memberName}>Dani</h3>
          <p className={styles.memberRole}>UI/UX Designer</p>
          <Icons/>
        </div>
        <div className={styles.teamMember}>
          <img
            src={imgCarlos}
            alt="Team Member"
            className={styles.memberImage}
          />
          <h3 className={styles.memberName}>Charli</h3>
          <p className={styles.memberRole}>UI/UX Designer</p>
          <Icons/>
        </div>
        <div className={styles.teamMember}>
          <img src={imgDani} alt="Team Member" className={styles.memberImage} />
          <h3 className={styles.memberName}>Dani</h3>
          <p className={styles.memberRole}>UI/UX Designer</p>
          <Icons/>
        </div>
        <div className={styles.teamMember}>
          <img
            src={imgCarlos}
            alt="Team Member"
            className={styles.memberImage}
          />
          <h3 className={styles.memberName}>Charli</h3>
          <p className={styles.memberRole}>UI/UX Designer</p>
          <Icons/>
        </div>
        <div className={styles.teamMember}>
          <img
            src={imgGonza}
            alt="Team Member"
            className={styles.memberImage}
          />
          <h3 className={styles.memberName}>Gonzalo </h3>
          <p className={styles.memberRole}>Front-end Developer</p>
          <Icons/>
        </div>
        <div className={styles.teamMember}>
          <img
            src={imgDiame}
            alt="Team Member"
            className={styles.memberImage}
          />
          <h3 className={styles.memberName}>Diame</h3>
          <p className={styles.memberRole}>UI/UX Designer</p>
          <Icons/>
        </div>
      </div>
      <div className={styles.header1}>
        <h3>
          We are 8 team members who developed this Ecommerce from scratch,
          investing a lot of time, dedication, and love to make it as you see
          it."
        </h3>
        <div className={styles.infoHeader1}>
          <img className={styles.imgHeafer1} src={imgGonza} alt="" />
          <img className={styles.imgHeafer1} src={imgDiame} alt="" />
          <img className={styles.imgHeafer1} src={imgDani} alt="" />
          <img className={styles.imgHeafer1} src={imgCarlos} alt="" />

          <span>work team</span>
        </div>
      </div>
    </div>
  );
};

export default About;
