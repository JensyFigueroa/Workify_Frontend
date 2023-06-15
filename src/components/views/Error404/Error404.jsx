import React from "react";
import style from "./Error404.module.css";

export default function Error404() {
  return (
    <div className={style.containerPrincipal}>
      <section className={style.page404}>
        <div className="container">
          <div className="row">
            <div>
              <div className="text-center">
                <div className={style.fourZeroFourBg}>
                  <h1 className="text-center ">404</h1>
                </div>

                <div className={style.contantBox404}>
                  <h3 className="h2">Uh-oh! Looks like you got lost.</h3>

                  <p>Go back to the home page if you dare!</p>

                  <a href="/home" className={style.link404}>
                    Back to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
