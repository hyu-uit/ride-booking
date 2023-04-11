import { Avatar, HStack, Text, Button, VStack, View, Image, Flex } from 'native-base'
import React from 'react'
import DefaultAvt from '../assets/image6.png'
import CarImg from '../assets/image8.png'
import { SIZES } from '../constants/theme'


const HistoryCard = () => {
  return (
    <View bgColor={'#101744'} w={'95%'} h={130} borderRadius={20} shadow={3} marginBottom={10}> 
      <HStack w={'full'}>
        <Avatar source={DefaultAvt} margin={'10px 0 0 10px'} />
        <VStack margin={'10px 0 0 10px'}>
            <Text bold fontSize={SIZES.h4} color={'white'}>62K4-1646</Text>
            <Text fontSize={SIZES.font} color={'#808080'}>Nguyen Tri Duc</Text>
        </VStack>
        <Button marginLeft={'auto'} height={45} borderBottomLeftRadius={20} borderTopRightRadius={20}>Book again</Button>
      </HStack>
      <HStack space={6} marginLeft={'10px'} marginBottom={"10px"}>
        <VStack >
            <Text bold fontSize={10} color={'#808080'}>Pick-up</Text>
            <Text bold fontSize={10} color={'white'}>Long An</Text>
        </VStack>
        <VStack>
            <Text bold fontSize={10} color={'#808080'}>Destination</Text>
            <Text bold fontSize={10} color={'white'}>DH CNTT</Text>
        </VStack>
        <VStack>
            <Text bold fontSize={10} color={'#808080'}>Time</Text>
            <Text bold fontSize={10} color={'white'}>14:20, 07/03/2023</Text>
        </VStack>
        <Image source={CarImg} alt='car' marginLeft={'auto'}/>
      </HStack>
    </View>
  )
}

export default HistoryCard