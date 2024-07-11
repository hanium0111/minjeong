import { useEffect, useState } from "react";
import styles from "./ChatComponent.module.css";

export default function ChatComponent() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step === 1 && messages.length === 0) {
      setMessages([
        { sender: "assistant", text: "어떤 홈페이지를 만들고 싶나요?" },
      ]);
    }
  }, [step, messages.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { sender: "user", text: inputValue }]);
      setInputValue("");
      setTimeout(() => {
        nextStep();
      }, 500);
    }
  };

  const nextStep = () => {
    let nextQuestion = "";
    switch (step) {
      case 1:
        nextQuestion = "어떤 기능을 넣고 싶나요?";
        break;
      case 2:
        nextQuestion = "어떤 분위기를 넣고 싶나요?";
        break;
      case 3:
        nextQuestion = "어떤 내용을 넣고 싶나요?";
        break;
      case 4:
        nextQuestion = "웹사이트를 생성하겠습니다.";
        console.log(step, messages);
        break;
      default:
        return;
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "assistant", text: nextQuestion },
    ]);
    setStep((prevStep) => {
      const newStep = prevStep + 1;
      if (newStep === 5) {
        console.log(messages);
      }
      return newStep;
    });
  };

  return (
    <div className={styles.chatContainer}>
      <h1 className={styles.title}>
        웹사이트 만들기, <br /> 누구나 쉽게 할 수 있어요!
      </h1>
      <div className={styles.chatBox}>
        {messages.map((message, index) => (
          <div
            className={`${styles.chatWrap} ${
              message.sender === "user" ? styles.userChatWrap : ""
            }`}
            key={index}
          >
            <span
              className={`${styles.sender} ${
                message.sender === "user" ? styles.userSender : ""
              }`}
            >
              {message.sender === "assistant" ? "Assistant" : "User"}
            </span>
            <div
              className={`${styles.message} ${
                message.sender === "assistant"
                  ? styles.assistantMessage
                  : styles.userMessage
              }`}
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {step <= 4 && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={styles.input}
              placeholder="텍스트를 입력하세요"
              disabled={step > 4}
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
        )}
        {step > 4 && (
          <form className={styles.form}>
            <input
              type="text"
              className={styles.input}
              placeholder="웹사이트 생성 버튼을 눌러주세요!"
              disabled
            />
            <button className={styles.generateButton}>웹사이트 생성</button>
          </form>
        )}
      </div>
    </div>
  );
}
