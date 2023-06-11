import React from "react";
import styles from "./About.module.css";

import imgGonza from "./img/gonza.png";
import imgDiame from "./img/diame.png";
import imgDani from "./img/dani.png";
import imgCarlos from "./img/carlos.png";
import imgJensy from "./img/jensy.png";
import imgLuis from "./img/luis.png";
import imgDavid from "./img/david.png";
import imgJoaquin from "./img/joaquin.png";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contTtitle}>
        <h2 className={styles.title}>Our team of developers</h2>
        <h5 className={styles.subtitle}>
          meet our diverse team of world-class creators, designers, and problem
          solvers
        </h5>
      </div>
      <div className={styles.teamGrid}>
        <div className={styles.teamMember}>
          <img
            src={imgGonza}
            alt="Team Member"
            className={styles.memberImage}
          />
          <h3 className={styles.memberName}>Gonzalo </h3>
          <p className={styles.memberRole}>Full Stack Developer</p>
          <div className={styles.redes}>
            <a href="https://www.facebook.com/profile.php?id=100009931907774">
              <i class="fa-brands fa-github"></i>
            </a>
            <a href="https://www.instagram.com/gonzaleguizaa/">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/in/gonzalo-leguiza-75b155200/">
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl&pli=1#inbox?compose=CllgCJqXPdclvKzpRwNfBnrqvJBRPFCtlcQjRKdlrBsrQgxJdFQdDzsSJCkZdDdWwNLSHdLTxBV">
              <i class="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
        <div className={styles.teamMember}>
          <img
            src={imgDiame}
            alt="Team Member"
            className={styles.memberImage}
          />
          <h3 className={styles.memberName}>Diame</h3>
          <p className={styles.memberRole}>Full Stack Developer</p>
          <div className={styles.redes}>
            <a href="https://github.com/Diam29">
              <i class="fa-brands fa-github"></i>
            </a>
            <a href="https://www.instagram.com/diamelavp/">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/in/diamela-villalba-b96a71251/">
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCJvqrnpgGCXnckLPHZjhxspDkrWdNBsrkNHrtTCwNMjwTrlCjCpVxttdSSlFpzvMpHvcRBV">
              <i class="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
        <div className={styles.teamMember}>
          <img src={imgDani} alt="Team Member" className={styles.memberImage} />
          <h3 className={styles.memberName}>Dani</h3>
          <p className={styles.memberRole}>Full Stack Developer</p>
          <div className={styles.redes}>
            <a href="https://github.com/Danieltm95">
              <i class="fa-brands fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/daniel-ocampo-b13017225/">
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSGMGLHjStzJSmhcFDjXVFfrFPdPblzfnWZWBTfbLJLFlGKBZQWfcnvMdklFsfxzqjpTVHZC">
              <i class="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
        <div className={styles.teamMember}>
          <img
            src={imgCarlos}
            alt="Team Member"
            className={styles.memberImage}
          />
          <h3 className={styles.memberName}>Charli</h3>
          <p className={styles.memberRole}>Full Stack Developer</p>
          <div className={styles.redes}>
            <a href="https://github.com/Carlitossaul">
              <i class="fa-brands fa-github"></i>
            </a>
            <a href="https://www.instagram.com/carlos.lovey/">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/in/carloslovey/">
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCHrgmFqpRKSxLMnzGdbpbgpqgVWvBTpMGgjzQmmhntkRWlShcrJBQKWKhhPfQMCpNHkLTsB">
              <i class="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
        <div className={styles.teamMember}>
          <img
            src={imgJensy}
            alt="Team Member"
            className={styles.memberImage}
          />
          <h3 className={styles.memberName}>Jensy</h3>
          <p className={styles.memberRole}>Full Stack Developer</p>
          <div className={styles.redes}>
            <a href="https://github.com/JensyFigueroa">
              <i class="fa-brands fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/jensy-figueroa-duran-0a069a8b/">
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=DmwnWsTJvbvVNRkMsTrZgknSZfqWgGvJsGmLzhjrhQQdrFfsJmvnHTHGcQvxxZTjPXTWPKqNzJLB">
              <i class="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
        <div className={styles.teamMember}>
          <img src={imgLuis} alt="Team Member" className={styles.memberImage} />
          <h3 className={styles.memberName}>Luis</h3>
          <p className={styles.memberRole}>Full Stack Developer</p>
          <div className={styles.redes}>
            <a href="https://github.com/luishaedo">
              <i class="fa-brands fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/luis-haedo/">
              <i class="fa-brands fa-linkedin"></i>
            </a>
            
            <a href="https://instagram.com/luishaedo_7?igshid=MzNlNGNkZWQ4Mg==">
              <i class="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className={styles.teamMember}>
          <img
            src={imgDavid}
            alt="Team Member"
            className={styles.memberImage}
          />
          <h3 className={styles.memberName}>David</h3>
          <p className={styles.memberRole}>Full Stack Developer</p>
          <div className={styles.redes}>
            <a href="https://github.com/DavidMC2410">
              <i class="fa-brands fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/davidmc2410/">
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=DmwnWrRlRjKLKWbnPsrrQbTzVztnkHDkdGJhnHJZTDFdLvHNvdghVQlGMCSggPdWFzxtsWMLNCVb">
              <i class="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
        <div className={styles.teamMember}>
          <img
            src={imgJoaquin}
            alt="Team Member"
            className={styles.memberImage}
          />
          <h3 className={styles.memberName}>Joaquin</h3>
          <p className={styles.memberRole}>Full Stack Developer</p>
          <div className={styles.redes}>
            <a href="https://github.com/Joaquingro">
              <i class="fa-brands fa-github"></i>
            </a>
            <a href="https://www.instagram.com/joaquins.gro/?igshid=ZDc4ODBmNjlmNQ%3D%3D">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/in/joaquin-guerrero-728826260">
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCHrgldqvgKsvVHDlqnkRLkHXqWQJtTTsWvncHhwpDKBxdqhBGNkgXLvkLXSTKWZxZchjxMg">
              <i class="fa-solid fa-envelope"></i>
            </a>
          </div>
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
          <img className={styles.imgHeafer1} src={imgJensy} alt="" />
          <img className={styles.imgHeafer1} src={imgJoaquin} alt="" />
          <img className={styles.imgHeafer1} src={imgLuis} alt="" />
          <img className={styles.imgHeafer1} src={imgDavid} alt="" />

          <span>work team</span>
        </div>
      </div>
      <div className={styles.header2}>
        <h2>History</h2>
        <h5>
          ¡Welcome to our e-commerce! We are a team of eight members who have
          participated in a web development bootcamp at Soy Henry. We are
          excited to present our final project: an incredible service-oriented
          e-commerce. With experience in databases, backend, and frontend, we
          have worked diligently to design an intuitive and attractive platform.
          Our goal is to provide you with a unique shopping experience, offering
          you products and services of the highest quality. Explore our platform
          and discover the wonderful options we have for you. We are eager to be
          part of your shopping experience and ensure that you find exactly what
          you are looking for. Thank you for visiting us and enjoy your journey
          on our e-commerce!!
        </h5>
      </div>
    </div>
  );
};

export default About;
