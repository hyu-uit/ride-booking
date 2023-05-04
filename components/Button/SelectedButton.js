import { Button, Text } from "native-base";
import React, { useState } from "react";

const SelectedButton = ({ text, isSelected = false }) => {
  return (
    <Button
      h={"auto"}
      borderRadius={"10px"}
      bgColor={isSelected ? "#D9D9D9" : "transparent"}
      marginBottom={2}
      variant={isSelected ? "solid" : "outline"}
    >
      <Text color={isSelected ? "black" : "white"}>{text}</Text>
    </Button>
  );
};

export default SelectedButton;
