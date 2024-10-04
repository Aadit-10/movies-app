import React, { useState } from "react";
import "./button-component.css";
interface ButtonComponentProps {
  text: string;
  genreId: any;
  settingMovieCardDetails: any;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  text,
  genreId,
  settingMovieCardDetails,
}) => {
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const handleButtonClick = () => {
    setActiveButton(!activeButton);
    console.log(genreId);
    settingMovieCardDetails(genreId);
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
