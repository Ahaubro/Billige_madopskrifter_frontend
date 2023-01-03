import React, { useRef, useState } from 'react' // Import af funktionelle komponenter fra react
import { Dimensions, KeyboardAvoidingView, Pressable, StyleSheet, Text, View, TextInput } from 'react-native' // import af react-native komponenter
import { StackNavigationProp } from '@react-navigation/stack' // Import af StackNavigationProp (Del af template projektet)
import { RouteProp } from '@react-navigation/native' // Import af RouteProp (Del af templatye projektet)
import { MyPageNavigationParameters } from '../../Types/Navigation_types' // Import af min mypage navigations parametre type
import BackArrowContainer from '../../components/BackArrowContainer' // Import af min back arrow container komponent
import { Ionicons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/
import { AirbnbRating } from 'react-native-ratings'; // Import af AirbnbRating fra react-native-ratings Hentet her -> https://www.npmjs.com/package/react-native-ratings og installeret med yarn
import { useCreateMutation } from "../../redux/services/ReviewAPI" // Import af useCreateMutation fra mit ReviewAPI
import AuthPressable from '../../components/AuthPressable' // Import af min knap komponent
import Header from '../../components/Header' // IMport af min header komponent
import ScrollViewContainer from '../../components/ScrollViewContainer' // Import af min scroll view container komponent

// Sætter navigations & route props
type CreateReviewScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, "CreateReviewScreen">
type CreateReviewScreenRouteProps = RouteProp<MyPageNavigationParameters, 'CreateReviewScreen'>

type CreateReviewScreenProps = {
    navigation: CreateReviewScreenNavigationProps
    route: CreateReviewScreenRouteProps
}


const CreateReviewScreen: React.FC<CreateReviewScreenProps> = ({ navigation, route }) => {

    // Descructuring parametre fra route
    const { id, userId, recipeName } = route.params

    const [createReview] = useCreateMutation();
    const [createreviewAtr] = useState<{ recipeId: number, userId: number, content: string, rating: number }>({ recipeId: id, userId: userId, content: "", rating: 0 })

    const inputRef = useRef<TextInput>(null);

    return (
        <ScrollViewContainer>
            <KeyboardAvoidingView
                behavior='position'
                style={{ height: Dimensions.get("window").height / 100 * 80 }}
            >

                <BackArrowContainer>
                    <Pressable onPress={() => {
                        navigation.pop();
                    }}>
                        <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
                    </Pressable>
                </BackArrowContainer>

                <Header
                    text='Nyt review'
                />

                <View style={{ paddingTop: 15, paddingBottom: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '600' }}>Del din mening om opskriften {recipeName}. Vælg hvor mange stjerner opskriften fortjener og skriv hvad du synes om den!</Text>
                </View>

                {/* Ekstern react native conmponent AirbnbRating bruges her til at lave en flot repræsentation af mine reviews. 
                Hentet fra -> https://www.npmjs.com/package/react-native-ratings*/}
                <View style={{ paddingHorizontal: 25, paddingVertical: 15 }}>
                    <AirbnbRating
                        reviewSize={22}
                        reviews={["Dårlig", "Okay", "God", "Virkelig god", "Elsker den!"]}
                        reviewColor={'black'}
                        defaultRating={3}
                        size={20}
                        ratingContainerStyle={{ backgroundColor: 'white', flexDirection: 'column', justifyContent: 'space-around' }}
                        onFinishRating={(rating) => {
                            if (rating != 0) {
                                createreviewAtr.rating = rating
                            } else {
                                createreviewAtr.rating = 3
                            }
                        }}
                    />
                </View>


                <View>
                    <Text style={style.label}>Hvordan var maden?</Text>
                    <TextInput
                        ref={inputRef}
                        style={style.input}
                        multiline={true}
                        onChangeText={(content) => {
                            createreviewAtr.content = content
                        }}
                        onSubmitEditing={ () => {
                            inputRef.current?.blur();
                        }}
                    >

                    </TextInput>
                </View>

                <View style={{ paddingVertical: 5 }}></View>

                <AuthPressable
                    text='Gem review'
                    color='#86DB9D'
                    onPress={() => {
                        if (createreviewAtr.content.length != 0 && createreviewAtr.rating != 0) {
                            console.log(createreviewAtr)
                            createReview(createreviewAtr).unwrap().then(res => {
                                console.log(res)
                            })
                            navigation.pop();
                        }
                    }}
                />





            </KeyboardAvoidingView>
        </ScrollViewContainer>
    )
}

const style = StyleSheet.create({
    input: {
        borderRadius: 8,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        minHeight: Dimensions.get("window").height / 100 * 20,
        borderColor: 'rgb(240,240,240)',
    },
    label: {
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: '600'
    }
})

export default CreateReviewScreen
