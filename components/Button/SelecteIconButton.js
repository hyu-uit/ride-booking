import { Box, Image } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

const SelectIconButton = ({ onPress, icon = "", selected }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        borderStyle={"solid"}
        borderWidth={1}
        borderRadius={50}
        borderColor={selected ? "#3D5BF8" : "transparent"}
      >
        <Image source={icon} alt="" />
      </Box>
    </TouchableOpacity>
  );
};

export default SelectIconButton;
