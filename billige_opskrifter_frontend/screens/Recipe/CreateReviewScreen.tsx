import React, { useState } from 'react'
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
import { AirbnbRating } from 'react-native-ratings';
import { TextInput } from 'react-native-gesture-handler'
import { useCreateMutation } from "../../redux/services/ReviewAPI"
import AuthPressable from '../../components/AuthPressable'


type CreateReviewScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, "CreateReviewScreen">
type CreateReviewScreenRouteProps = RouteProp<MyPageNavigationParameters, 'CreateReviewScreen'>

type CreateReviewScreenProps = {
    navigation: CreateReviewScreenNavigationProps
    route: CreateReviewScreenRouteProps
}


const CreateReviewScreen: React.FC<CreateReviewScreenProps> = ({ navigation, route }) => {

    const session = useSelector((state: RootState) => state.session)

    const { id, userId } = route.params

    const [createReview] = useCreateMutation();

    const [createreviewAtr, setCreatereviewAtr] = useState<{recipeId: number, userId: number, content: string, rating: number}>({recipeId: id, userId: userId, content: "", rating: 0})



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

            <View style={{ paddingHorizontal: 25, paddingVertical: 35 }}>
                <AirbnbRating
                    reviewSize={16}
                    reviews={["Dårlig", "Okay", "God", "Vild med den", "Elsker den!"]}
                    reviewColor={'black'}
                    defaultRating={3}
                    size={20}
                    ratingContainerStyle={{ backgroundColor: 'rgb(247,247,255)', flexDirection: 'row', justifyContent: 'space-between' }}
                    onFinishRating={ (rating) => {
                        if(rating != 0){
                            createreviewAtr.rating = rating
                        } else {
                            createreviewAtr.rating = 3
                        }
                    }}
                />
            </View>

            <View>
                <Text>Hvordan var maden?</Text>
                <TextInput
                    onChangeText={ (content) => {
                        createreviewAtr.content = content
                    }}
                >

                </TextInput>
            </View>

            <View style={{paddingVertical: 5}}></View>

            <AuthPressable 
                text='Gem review'
                color='#86DB9D'
                onPress={ () => {
                    if(createreviewAtr.content != "" && createreviewAtr.rating != 0){
                        console.log(createreviewAtr)
                        createReview(createreviewAtr).unwrap().then( res => {
                            console.log(res)
                        })
                        navigation.pop();
                    }
                }}
            />






        </ViewContainer>
    )
}

const style = StyleSheet.create({

})

export default CreateReviewScreen
