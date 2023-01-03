import React, { useState } from 'react' // Import af React
import { StackNavigationProp } from '@react-navigation/stack' // Import af StackNavigationProp (Del af template projektet)
import { RouteProp } from '@react-navigation/native' // Import af RouteProp (Del af templatye projektet)
import { Text, View, Pressable, FlatList, Dimensions, StyleSheet } from 'react-native' // Import af react-native komponenter
import BackArrowContainer from '../../components/BackArrowContainer' // Import af min back arrow container komponent
import { MyPageNavigationParameters } from '../../Types/Navigation_types' // Import af min mypage navigations parametre type 
import { Ionicons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/
import Header from '../../components/Header' // Import af min header komponent
import ViewContainer from "../../components/ViewContainer" // Import af min view container komponent
import { AirbnbRating } from 'react-native-ratings' // Import af AirbnbRating fra react-native-ratings Hentet her -> https://www.npmjs.com/package/react-native-ratings og installeret med yarn
import { MaterialIcons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/
import { TouchableOpacity } from 'react-native-gesture-handler'

// Sætter navigations & route props
type AllReviewsScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'AllReviewsScreen'>
type AllReviewsScreenRouteProps = RouteProp<MyPageNavigationParameters, 'AllReviewsScreen'>

type AllReviewsScreenProps = {
    navigation: AllReviewsScreenNavigationProps
    route: AllReviewsScreenRouteProps
}

const AllReviewsScreen: React.FC<AllReviewsScreenProps> = ({ navigation, route }) => {

    // Destructuring route parameters
    const { reviews } = route.params;

    //Expanding long reviews
    const [isExpanded, setIsExpanded] = useState(false);
    const [idForExpand, setIdForExpand] = useState(0);

    const sliceContent = (content: string) => {
        if (content != null) {
            if (content.length > 75) {
                return content.substring(0, 75) + " ..."
            } else {
                return content
            }
        }
    }

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

            <View style={{ paddingTop: 35, paddingBottom: 10 }}>

                <FlatList
                    style={{ flexWrap: 'wrap' }}
                    data={reviews || []}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <View style={{ paddingBottom: Dimensions.get("window").width / 100 * 4 }}>
                                    <View style={style.card}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 10, paddingVertical: 10, paddingHorizontal: 10 }}>
                                            {/* Ekstern react native conmponent react-native-ratings bruges her til at lave en flot repræsentation af mine reviews. 
                                            Hentet her -> https://www.npmjs.com/package/react-native-ratings*/}
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
                                        {isExpanded && item.id === idForExpand ?
                                            <>
                                                <Text style={{ textAlign: 'justify', padding: 10, paddingLeft: 30, paddingRight: 30 }}>{item.content}</Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setIsExpanded(false);
                                                        setIdForExpand(0)
                                                    }}
                                                >
                                                    <MaterialIcons style={{ textAlign: 'center' }} name="expand-less" size={24} color="grey" />
                                                </TouchableOpacity>
                                            </>
                                            :
                                            <>
                                                <Text style={{ textAlign: 'justify', padding: 10, paddingLeft: 30, paddingRight: 30 }}>{sliceContent(item.content)}</Text>
                                                {item.content.length > 75 &&
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setIsExpanded(true);
                                                            setIdForExpand(item.id)
                                                        }}
                                                    >
                                                        <MaterialIcons style={{ textAlign: 'center' }} name="expand-more" size={24} color="grey" />
                                                    </TouchableOpacity>
                                                }
                                            </>
                                        }
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
