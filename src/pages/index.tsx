import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/home.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>
      <h1 className={styles.title}>hello world</h1>
    </>
  );
};

export default Home;
