import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import HeaderWithoutBack from '../../components/HeaderWithoutBack'
import ViewContainer from "../../components/ViewContainer"

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {

  const session = useSelector((state: RootState) => state.session)
  

  return (
    <ViewContainer>
      
      <HeaderWithoutBack 
        text='Home'
      />

    </ViewContainer>
  )
}

const styles = StyleSheet.create({
  
})

export default HomeScreen
