import React, { useState } from "react" // Import af React
import { View, StyleSheet, Text, Dimensions, FlatList, TouchableOpacity } from "react-native" // Import af komponenter fra react-native
import { Review } from "../redux/services/ReviewAPI"
import { AirbnbRating } from 'react-native-ratings' // Import af AirbnbRating fra react-native-ratings Hentet her -> https://www.npmjs.com/package/react-native-ratings og installeret med yarn
import { MaterialIcons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/

//List of reviews som props
type AllReviewsProps = {
    reviews: Review[]
}

const AllReviewsComponent: React.FC<AllReviewsProps> = ({reviews}) => {

    //Expanding & slicing long reviews
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
        <View style={{maxHeight: Dimensions.get("window").height / 100 * 73}}>
            <FlatList
                    style={{ flexWrap: 'wrap' }}
                    data={reviews}
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

export default AllReviewsComponent;