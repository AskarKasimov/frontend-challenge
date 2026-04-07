import { useState } from "react";
import styles from "./App.module.scss";
import heroImg from "./assets/hero.png";
import ReactLogo from "./assets/react.svg?react";
import ViteLogo from "./assets/vite.svg?react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section className={styles.center}>
        <div className={styles.hero}>
          <img
            src={heroImg}
            className={styles.base}
            width="170"
            height="179"
            alt=""
          />
          <ReactLogo className={styles.framework} />
          <ViteLogo className={styles.vite} />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className={styles.counter}
          onClick={() => setCount((count) => count + 1)}
          type="button"
        >
          Count is {count}
        </button>
      </section>

      <div className={styles.ticks}></div>

      <section className={styles.nextSteps}>
        <div className={styles.docs}>
          <svg className={styles.icon} role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noopener">
                <ViteLogo className={styles.buttonIcon} />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noopener">
                <ReactLogo className={styles.buttonIcon} />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className={styles.icon} role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a
                href="https://github.com/vitejs/vite"
                target="_blank"
                rel="noopener"
              >
                <svg
                  className={styles.buttonIcon}
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" rel="noopener">
                <svg
                  className={styles.buttonIcon}
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank" rel="noopener">
                <svg
                  className={styles.buttonIcon}
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a
                href="https://bsky.app/profile/vite.dev"
                target="_blank"
                rel="noopener"
              >
                <svg
                  className={styles.buttonIcon}
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className={styles.ticks}></div>
      <section className={styles.spacer}></section>
    </>
  );
}

export default App;
