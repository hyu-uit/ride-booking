import { Button, Text } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

const SelectedButton = ({ text, isSelected = false }) => {
  return (
    <TouchableOpacity>
      <Button
        h={"auto"}
        borderRadius={"10px"}
        bgColor={isSelected ? "#D9D9D9" : "transparent"}
        marginBottom={2}
        variant={isSelected ? "solid" : "outline"}
      >
        <Text color={isSelected ? "black" : "white"} bold>
          {text}
        </Text>
      </Button>
    </TouchableOpacity>
  );
};

export default SelectedButton;
