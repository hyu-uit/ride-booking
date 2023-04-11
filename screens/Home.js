import React from 'react'
import styled from 'styled-components'
import { FONTS, COLORS } from '../constants/theme'
import { Flex, NativeBaseProvider } from 'native-base'
import LocationCardPayment from '../components/LocationCard/LocationCard.Payment'
import LocationCardFinder from '../components/LocationCard/LocationCard.Finder'

export default function Home({navigation}) {
  return (
    <NativeBaseProvider>

      <Flex flex={1}>
        <LocationCardFinder />
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