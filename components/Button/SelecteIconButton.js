import { Box, Image } from 'native-base'
import React, { useState } from 'react'

const SelecteIconButton = ({ icon = '' }) => {
  const [first, setfirst] = useState(false)
  return (
    <Box borderStyle={'dashed'} borderWidth={1} borderRadius={50} borderColor={first ? "transparent" : "#3D5BF8"} onTouchEnd={() => setfirst(prev => !prev)}>
      <Image source={icon} alt=''/>
    </Box>
  )
}

export default SelecteIconButton