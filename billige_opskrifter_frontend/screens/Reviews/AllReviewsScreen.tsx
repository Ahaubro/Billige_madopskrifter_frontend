import React from 'react' // Import af React
import { StackNavigationProp } from '@react-navigation/stack' // Import af StackNavigationProp (Del af template projektet)
import { RouteProp } from '@react-navigation/native' // Import af RouteProp (Del af templatye projektet)
import { Text, View, Pressable } from 'react-native' // Import af react-native komponenter
import BackArrowContainer from '../../components/BackArrowContainer' // Import af min back arrow container komponent
import { MyPageNavigationParameters } from '../../Types/Navigation_types' // Import af min mypage navigations parametre type 
import { Ionicons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/
import Header from '../../components/Header' // Import af min header komponent
import AllReviewsComponent from '../../components/AllReviewsComponent' // Import af AllReviewsComponent der læser alle reviews
import ViewContainer from '../../components/ViewContainer' // Import af min view container komponent

// Navigations & route props
type AllReviewsScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'AllReviewsScreen'>
type AllReviewsScreenRouteProps = RouteProp<MyPageNavigationParameters, 'AllReviewsScreen'>

type AllReviewsScreenProps = {
    navigation: AllReviewsScreenNavigationProps
    route: AllReviewsScreenRouteProps
}

const AllReviewsScreen: React.FC<AllReviewsScreenProps> = ({ navigation, route }) => {

    // Destructuring list of reviews fra SelectedRecipeScreen
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

            <View style={{ paddingTop: 35}}>
                
                {/* Jeg har rykket koden der læser reviews ind i sin egen komponent for at gøre denne skærmkomponent mere ren */}
                <AllReviewsComponent 
                    reviews={reviews}
                />

            </View>

        </ViewContainer>
    )
}

export default AllReviewsScreen
