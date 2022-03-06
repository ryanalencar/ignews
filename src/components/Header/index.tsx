import React from "react";
import styles from "./styles.module.scss";

export default function Header() {
  return (
    <header>
      <div>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <a>Home</a>
          <a>Posts</a>
        </nav>
      </div>
    </header>
  );
}
