import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import styled from 'styled-components'
import { FONTS, COLORS } from '../constants/theme'
import HistoryCard from '../components/HistoryCard'
import { Box, Center, Container, FlatList, Flex, NativeBaseProvider } from 'native-base'

export default function Home({navigation}) {
  return (
    <NativeBaseProvider>

      <Flex flex={1} >
        <Center>

          <HistoryCard></HistoryCard>
          <HistoryCard></HistoryCard>
          <HistoryCard></HistoryCard>
          <HistoryCard></HistoryCard>
        </Center>
      </Flex>
    </NativeBaseProvider>
  )
}

const HomeContainer = styled.SafeAreaView`
`

const Title = styled.Text`
    color: ${props => COLORS.default};
    font-weight: ${props => FONTS.large};
`