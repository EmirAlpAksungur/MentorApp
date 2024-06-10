import React from "react";

const Age: React.FC<{ timestamp: number }> = ({ timestamp }) => {
  const birthDate = new Date(timestamp);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  const currentMonthDay = currentDate.getMonth() * 100 + currentDate.getDate();
  const birthMonthDay = birthDate.getMonth() * 100 + birthDate.getDate();

  if (currentMonthDay < birthMonthDay) {
    age--;
  }

  return age;
};

export default Age;
