import Head from "next/head";
import Banner from "../components/Banner/Banner";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Alchemy Challenge 2023</title>
        <meta name="description" content="Alchemy SDK Developer Challenge" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Banner />
    </div>
  );
}
