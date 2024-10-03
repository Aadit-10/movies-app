import React, { useState } from "react";
import "./button-component.css";
interface ButtonComponentProps {
  text: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ text }) => {
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const handleButtonClick = () => {
    setActiveButton(!activeButton);
  };
  return (
    //<div className="button-container">
    <button
      className={`button-container ${activeButton && "button-blue"}`}
      onClick={handleButtonClick}
    >
      {text}
    </button>
    //</div>
  );
};

export default ButtonComponent;
