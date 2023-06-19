import { Button, Text } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

const SelectedButton = ({ text, isSelected = false, location }) => {
  return (
    <TouchableOpacity>
      <Button
        mr={2}
        h={"auto"}
        w={"auto"}
        overflow={"hidden"}
        borderRadius={"10px"}
        bgColor={isSelected ? "#D9D9D9" : "transparent"}
        variant={isSelected ? "solid" : "outline"}
      >
        <Text color={isSelected ? "black" : "white"} bold>
          {location.name}
        </Text>
      </Button>
    </TouchableOpacity>
  );
};

export default SelectedButton;
