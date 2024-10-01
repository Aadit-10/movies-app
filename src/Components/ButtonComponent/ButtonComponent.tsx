import React, { useState } from "react";
import "./button-component.css";
interface ButtonComponentProps {
  text: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ text }) => {
  const [activeButton, setActiveButton] = useState<string>("All");

  return (
    //<div className="button-container">
    <button className="button-container">{text}</button>
    //</div>
  );
};

export default ButtonComponent;
