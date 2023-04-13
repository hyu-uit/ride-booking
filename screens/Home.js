import React from 'react'
import styled from 'styled-components'
import { FONTS, COLORS } from '../constants/theme'
import { Flex, NativeBaseProvider } from 'native-base'
import RatingPopup from '../components/RatingPopup'

export default function Home({navigation}) {
  return (
    <NativeBaseProvider>

      <Flex flex={1}>
        <RatingPopup />
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