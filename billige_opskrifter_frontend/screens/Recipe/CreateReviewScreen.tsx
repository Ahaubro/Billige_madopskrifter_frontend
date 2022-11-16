import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import HeaderWithoutBack from '../../components/HeaderWithoutBack'
import ViewContainer from "../../components/ViewContainer"
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { MyPageNavigationParameters } from '../../Types/Navigation_types'
import BackArrowContainer from '../../components/BackArrowContainer'
import { Ionicons } from '@expo/vector-icons';


type CreateReviewScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, "CreateReviewScreen">
type CreateReviewScreenRouteProps = RouteProp<MyPageNavigationParameters, 'CreateReviewScreen'>

type CreateReviewScreenProps = {
    navigation: CreateReviewScreenNavigationProps
    route: CreateReviewScreenRouteProps
}


const CreateReviewScreen: React.FC<CreateReviewScreenProps> = ({ navigation, route }) => {

    const session = useSelector((state: RootState) => state.session)

    const { id, userId } = route.params

    console.log(id, userId)



    return (
        <ViewContainer>
            <BackArrowContainer>
                <Pressable onPress={() => {
                    navigation.pop();
                }}>
                    <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
                </Pressable>
            </BackArrowContainer>

            <HeaderWithoutBack
                text='Skriv et review'
            />



        </ViewContainer>
    )
}

const style = StyleSheet.create({

})

export default CreateReviewScreen
