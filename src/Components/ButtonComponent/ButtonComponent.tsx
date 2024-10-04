import React, { useState } from "react";
import "./button-component.css";
interface ButtonComponentProps {
  text: string;
  genreId: any;
  settingMovieCardDetails: any;
  activeButton: any;
  setActiveButton: any;
  setCurrentPage: any;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  text,
  genreId,
  settingMovieCardDetails,
  activeButton,
  setActiveButton,
  setCurrentPage,
}) => {
  // const [activeButton, setActiveButton] = useState<any>("All");
  const handleButtonClick = () => {
    setActiveButton(text);
    settingMovieCardDetails(genreId);
    setCurrentPage(1);
  };
  return (
    //<div className="button-container">
    <button
      name={text}
      className={`button-container ${
        activeButton === text ? "button-blue" : ""
      }`}
      onClick={handleButtonClick}
    >
      {text}
    </button>
    //</div>
  );
};

export default ButtonComponent;
