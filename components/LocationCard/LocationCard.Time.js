import { Box, Button, Center, Divider, HStack, Image, Text, VStack, View } from 'native-base'
import React from 'react'
import LineImg from '../../assets/Line4.png'
import LocationImg from '../../assets/Group8762.png'
import ArrowImg from '../../assets/Vector11.png'
import ClockIcon from '../../assets/clock_96px.png'
import BackIcon from '../../assets/back_icon.png'
import { SIZES } from '../../constants/theme'

const LocationCardTime = () => {
  return (
    <View bgColor={'#0B0F2F'} w={'100%'} h={330} borderTopRadius={20} shadow={3} position={'absolute'} bottom={0} padding={'30px 25px 0 25px'}>
      <VStack space={4}>
        <HStack w={'100%'}>
          <VStack space={2}>
            <VStack space={1}>
              <Text bold fontSize={SIZES.h6} color={'#8CC3FF'}>Pick-up</Text>
              <Text bold fontSize={SIZES.h6} color={'white'}>Long An</Text>
            </VStack>
            <Divider />
            <VStack space={1}>
              <Text bold fontSize={SIZES.h6} color={'#8CC3FF'}>Destination</Text>
              <Text bold fontSize={SIZES.h6} color={'white'}>University of Information Technology</Text>
            </VStack>
          </VStack>
          <Center marginLeft={'auto'}>
            <Center borderRadius={50} width={'25px'} height={'25px'} bgColor={'black'} marginBottom={2}>
              <Image source={ArrowImg} alt=''/>
            </Center>
            <Image source={LineImg} alt='' marginBottom={2}/>
            <Image source={LocationImg} alt=''/>
          </Center>
        </HStack>
        <Divider bgColor={'#125CAE'} />
        <HStack space={2}>
          <Box w={'10px'} h={'10px'} bgColor={'#125CAE'} borderRadius={50} alignSelf={'center'}></Box>
          <Text fontSize={SIZES.h6} color={'white'}>Schedule Time</Text>
          <Center w={'35px'} h={'25px'} bgColor={"#101744"} borderRadius={50} marginLeft={'auto'}>
            <Text fontSize={SIZES.base} color={"white"}>Now</Text>
          </Center>
          <HStack h={'25px'} bgColor={"#125cae"} color={"#125CAE"} borderRadius={50} alignContent={'center'} padding={1}>
            <Image w={'15px'} h={'15px'} source={ClockIcon} alignSelf={'center'} alt='' marginRight={1}/>
            <Text fontSize={SIZES.base} color={'white'} alignSelf={'center'}>15:00 22-03-2023</Text>
          </HStack>
        </HStack>
        <HStack>
          <Button variant={'outline'} borderRadius={'20px'} borderWidth={'2px'} w={'75px'} h={'75px'}>
            <Image source={BackIcon} alt=''/>
          </Button>
          <Button  bgColor={'#3D5AF8'} w={'200px'} marginLeft={'auto'} borderRadius={'20px'}>
            <Text color={'white'} bold fontSize={SIZES.small}>Continue</Text>
          </Button>
        </HStack>
      </VStack>
    </View>
  )
}

export default LocationCardTime