import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import styles from "./GenerateBox.module.css";

export default function GenerateBox() {
  const [content, setContent] = useState("");
  const [cssContent, setCssContent] = useState("");
  const [jsContent, setJsContent] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      const [htmlRes, cssRes, jsRes] = await Promise.all([
        fetch("/api/render?filename=x.html"),
        fetch("/api/render?filename=x.css"),
        fetch("/api/render?filename=x.js"),
      ]);
      const [htmlData, cssData, jsData] = await Promise.all([
        htmlRes.json(),
        cssRes.json(),
        jsRes.json(),
      ]);
      setContent(htmlData.content);
      setCssContent(cssData.content);
      setJsContent(jsData.content);
    };

    fetchFiles();
  }, []);

  const createMarkup = () => {
    return `
      <html>
        <head>
          <style>${cssContent}</style>
        </head>
        <body>
          ${content}
          <script>${jsContent}</script>
        </body>
      </html>
    `;
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.genBoxWrap}>
        <Iframe
          url={`data:text/html;base64,${btoa(createMarkup())}`}
          width="100%"
          height="100%"
          id="generateBox"
          className={styles.generateBox}
          display="initial"
          position="relative"
          allowFullScreen
        />
      </div>
      <div className={styles.editorWrap}>
        <form className={styles.form}>
          <input
            type="text"
            className={styles.input}
            placeholder="수정하고 싶은 부분을 입력하세요."
          />
          <button type="submit" className={styles.button}>
            <svg
              className={styles.icon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
