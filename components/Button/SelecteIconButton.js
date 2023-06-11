import { Box, Image } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

const SelectIconButton = ({ isSelected = false, setIsSelected, icon = "" }) => {
  return (
    <TouchableOpacity>
      <Box
        borderStyle={"dashed"}
        borderWidth={1}
        borderRadius={50}
        borderColor={isSelected ? "transparent" : "#3D5BF8"}
        onTouchEnd={() => setIsSelected((prev) => !prev)}
      >
        <Image source={icon} alt="" />
      </Box>
    </TouchableOpacity>
  );
};

export default SelectIconButton;
