import { Button, Text } from "native-base";
import React, { useState } from "react";

const SelectedButton = ({ text, isSelected = false }) => {
  const [first, setFirst] = useState(false);
  return (
    <Button
      h={"40px"}
      borderRadius={"10px"}
      bgColor={first ? "#D9D9D9" : "transparent"}
      padding={2}
      marginBottom={2}
      variant={first ? "solid" : "outline"}
      onTouchEnd={() => setFirst((prev) => !prev)}
    >
      <Text color={first ? "black" : "white"}>{text}</Text>
    </Button>
  );
};

export default SelectedButton;
