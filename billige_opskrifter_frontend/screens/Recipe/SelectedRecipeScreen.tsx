import React, { useEffect, useState } from 'react'
import { StyleSheet, Pressable, Text, View, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Header from '../../components/Header'
import ViewContainer from "../../components/ViewContainer"
import { StackNavigationProp } from '@react-navigation/stack'
import { MyPageNavigationParameters } from '../../Types/Navigation_types'
import { RouteProp } from '@react-navigation/native'
import BackArrowContainer from "../../components/BackArrowContainer"
import { Ionicons } from '@expo/vector-icons';
import { useGetByRecipeIdQuery } from "../../redux/services/IngredientAPI"
import { FlatList } from 'react-native-gesture-handler'
import { Review, useGetReviewsByRecipeIdQuery } from "../../redux/services/ReviewAPI"
import AuthPressable from '../../components/AuthPressable'


type SelectedRecipeScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, "SelectedRecipeScreen">
type SelectedRecipeScreenRouteProps = RouteProp<MyPageNavigationParameters, 'SelectedRecipeScreen'>

type SelectedRecipeScreenProps = {
    navigation: SelectedRecipeScreenNavigationProps
    route: SelectedRecipeScreenRouteProps
}

const SelectedRecipeScreen: React.FC<SelectedRecipeScreenProps> = ({ navigation, route }) => {

    const session = useSelector((state: RootState) => state.session)

    const { id, name, type, prepTime, numberOfPersons, estimatedPrice, description, userId } = route.params

    const thisRecipesIngrediens = useGetByRecipeIdQuery(id);

    const thisRecipesReviews = useGetReviewsByRecipeIdQuery(id)

    const [listOfReviews, setListOfReviews] = useState<Review[]>([]);

    useEffect(() => {
        if (thisRecipesReviews.data) {
            setListOfReviews(thisRecipesReviews.data.reviews)
        }
    }, [thisRecipesReviews.data])

    console.log(listOfReviews)

    return (
        <ViewContainer>
            <BackArrowContainer>
                <Pressable onPress={() => {
                    navigation.pop();
                }}>
                    <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
                </Pressable>
            </BackArrowContainer>

            <Header
                text={name}
            />

            {/* Displayer først prepTime, personer og pris */}
            <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 5 }}>
                <Text style={style.label}>Tilberedningstid: </Text>
                <Text style={style.field}>{prepTime} min</Text>
            </View>

            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                <Text style={style.label}>Personer: </Text>
                <Text style={style.field}>{numberOfPersons}</Text>
            </View>

            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                <Text style={style.label}>Estimeret pris: </Text>
                <Text style={style.field}>{estimatedPrice} kr.</Text>
            </View>

            <View style={{ paddingVertical: 5 }}></View>


            {/* Læser ingredienser til opskriften */}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={style.card}>
                    <Text style={[style.label, { padding: 5, paddingBottom: 10 }]}>Ingredienser:</Text>
                    <FlatList
                        style={{ flex: 1, flexWrap: 'wrap' }}
                        data={thisRecipesIngrediens.data?.ingredients || []}
                        renderItem={({ item, index }) => {
                            return (
                                <>
                                    <View style={{ paddingBottom: 5 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                            <Text style={{ paddingLeft: 30 }}>{index + 1}: {item.name}</Text>
                                            <Text> {item.amount}</Text>
                                            <Text>{item.measurementUnit}</Text>
                                            <Text style={{ paddingRight: 20 }}> ({item.type}) </Text>
                                        </View>
                                    </View>

                                </>
                            )
                        }}
                    >
                    </FlatList>
                </View>
            </View>

            <View style={{ paddingVertical: 5 }}></View>

            {/* Læser opskriftens fremgangsmetode */}
            <View style={style.card}>
                <Text style={[style.label, { padding: 5, paddingBottom: 10 }]}>Fremgangsmetode:</Text>
                <Text style={style.description}>{description}</Text>
            </View>

            <View style={{ paddingVertical: 5 }}></View>

            {/* Læser opskriftens reviews */}

            <Text style={[style.label, { padding: 5, paddingBottom: 10 }]}>reviews:</Text>
            {listOfReviews.length > 0 ?
                <FlatList
                    style={{ flex: 1, flexWrap: 'wrap' }}
                    horizontal={true}
                    data={thisRecipesReviews.data?.reviews || []}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <View style={{ paddingEnd: Dimensions.get("window").width / 100 * 2 }}>
                                    <View style={style.card}>
                                        <Text>{item.content}</Text>
                                        <Text>{item.rating}</Text>
                                    </View>
                                </View>
                            </>
                        )
                    }}
                >
                </FlatList>

                :

                <Text style={{ textAlign: 'center' }}>Denne opskrift har ingen reviews endnu, bliv den første!</Text>
            }

            <View style={{ paddingVertical: 5 }}></View>

            <AuthPressable 
                text='Nyt review'
                color='#86DB9D'
                onPress={ () => {
                    navigation.navigate("CreateReviewScreen", {id, userId})
                }}
            />


        </ViewContainer>
    )
}

const style = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
    field: {
        fontSize: 16
    },
    card: {
        backgroundColor: "rgb(247,247,255)",
        width: Dimensions.get("window").width / 100 * 94,
        borderRadius: 15,
        paddingVertical: 8,
        minHeight: 100
    },
    description: {
        textAlign: 'justify',
        fontSize: 14,
        padding: 12
    }
})

export default SelectedRecipeScreen
