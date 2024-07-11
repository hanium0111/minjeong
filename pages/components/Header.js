import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faUser,
  faSearch,
  faQuestionCircle,
  faBell,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoWrap} onClick={handleLogoClick}>
        <Image
          className={styles.logoImg}
          layout="fill"
          src="/logo.png"
          alt="0111-logo"
        />
      </div>
      <button className={styles.menuButton} onClick={togglePopup}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`${styles.popup} ${isPopupOpen ? styles.open : ""}`}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link href="/login" legacyBehavior>
              <a className={styles.menuLink}>
                <FontAwesomeIcon icon={faUser} className={styles.menuIcon} />
                로그인
              </a>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/temp" legacyBehavior>
              <a className={styles.menuLink}>
                <FontAwesomeIcon icon={faSearch} className={styles.menuIcon} />
                템플릿 탐색
              </a>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/qna" legacyBehavior>
              <a className={styles.menuLink}>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className={styles.menuIcon}
                />
                질문 (Q&A)
              </a>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/notice" legacyBehavior>
              <a className={styles.menuLink}>
                <FontAwesomeIcon icon={faBell} className={styles.menuIcon} />
                공지사항
              </a>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/team" legacyBehavior>
              <a className={styles.menuLink}>
                <FontAwesomeIcon icon={faUsers} className={styles.menuIcon} />팀
                소개
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
