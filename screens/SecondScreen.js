import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import styled from 'styled-components'
import { FONTS, COLORS } from '../constants/theme'

export default function SecondScreen() {
  return (
    <HomeContainer>
      <Title>SCreen 2</Title>
    </HomeContainer>
  )
}

const HomeContainer = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: black;
`

const Title = styled.Text`
    color: ${props => COLORS.default};
    font-weight: ${props => FONTS.large};
`