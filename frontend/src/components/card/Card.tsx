import React from "react";
import "../../assets/components/card/card.scss";

interface CardProps {
  children: React.ReactNode;
  isError?: boolean;
}

const Card: React.FC<CardProps> = ({ children, isError }) => {
  return (
    <div className={`card-container ${isError ? "card-container-error" : ""}`}>
      {children}
    </div>
  );
};

export default Card;
