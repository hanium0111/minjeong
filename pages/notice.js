import Header from "./components/Header";
import NoticeBox from "./components/noticeBox";
import styles from "../styles/Wrap.module.css";

export default function notice() {
  return (
    <div className={styles.wrap}>
      <Header />
      <NoticeBox />
    </div>
  );
}
