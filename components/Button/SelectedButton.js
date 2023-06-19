import { Button, Text } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

const SelectedButton = ({ text, isSelected = false, location, onPress }) => {
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
        onPress={onPress}
      >
        <Text color={isSelected ? "black" : "white"} bold>
          {location.name !== null ? location.name : text}
        </Text>
      </Button>
    </TouchableOpacity>
  );
};

export default SelectedButton;
