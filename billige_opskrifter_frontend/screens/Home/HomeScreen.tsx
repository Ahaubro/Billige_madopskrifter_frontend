import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Header from '../../components/Header'
import ViewContainer from "../../components/ViewContainer"

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {

  const session = useSelector((state: RootState) => state.session)
  

  return (
    <ViewContainer>
      
      <View style={{paddingTop: 30}}>
        <Header
          text='Hjem'
        />
      </View>

    </ViewContainer>
  )
}

const styles = StyleSheet.create({
  
})

export default HomeScreen
