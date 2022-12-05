import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Text, View, Pressable, FlatList, Dimensions, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BackArrowContainer from '../../components/BackArrowContainer'
import { RootState } from '../../redux/store'
import { MyPageNavigationParameters } from '../../Types/Navigation_types'
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header'
import ViewContainer from "../../components/ViewContainer"
import { AirbnbRating } from 'react-native-ratings'


type AllReviewsScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'AllReviewsScreen'>
type AllReviewsScreenRouteProps = RouteProp<MyPageNavigationParameters, 'AllReviewsScreen'>

type AllReviewsScreenProps = {
    navigation: AllReviewsScreenNavigationProps
    route: AllReviewsScreenRouteProps
}

const AllReviewsScreen: React.FC<AllReviewsScreenProps> = ({ navigation, route }) => {

    const session = useSelector((state: RootState) => state.session)

    const { reviews } = route.params;

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
                text='Alle reviews'
            />

            <View style={{paddingTop: 35, paddingBottom: 10}}>

                <FlatList
                    style={{ flexWrap: 'wrap' }}
                    data={reviews || []}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <View style={{ paddingBottom: Dimensions.get("window").width / 100 * 4 }}>
                                    <View style={style.card}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 10, paddingVertical: 10, paddingHorizontal: 10 }}>
                                            <AirbnbRating
                                                reviewSize={16}
                                                reviews={["Dårlig", "Okay", "God", "Vild med den", "Elsker den!"]}
                                                reviewColor={'black'}
                                                defaultRating={item.rating}
                                                size={20}
                                                isDisabled={true}
                                                ratingContainerStyle={{ backgroundColor: 'rgb(247,247,255)', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}
                                            />
                                        </View>
                                        <Text style={{ textAlign: 'justify', padding: 10, paddingLeft: 20 }}>{item.content}</Text>
                                    </View>
                                </View>
                            </>
                        )
                    }}
                >
                </FlatList>

            </View>





        </ViewContainer>
    )
}

const style = StyleSheet.create({
    card: {
        backgroundColor: "rgb(247,247,255)",
        width: Dimensions.get("window").width / 100 * 94,
        borderRadius: 15,
        paddingVertical: 8,
        minHeight: 100
    },
})

export default AllReviewsScreen
