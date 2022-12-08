import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useRef, useState } from "react"
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Dimensions } from "react-native"
import { Recipe } from "../redux/services/RecipeAPI"
import { HomeNavigationParameters } from "../Types/Navigation_types"
import PriceComponent from "./PriceComponent"
import AllergiComponent from "./AllergiComponent"
import { MaterialIcons } from '@expo/vector-icons';


type HomeScreenNavigationProps = StackNavigationProp<HomeNavigationParameters, 'HomeScreen'>

type LikedRecipeCardsProps = {
    recipes: Recipe[]
    navigation: HomeScreenNavigationProps
}


const LikedRecipeCards: React.FC<LikedRecipeCardsProps> = ({ recipes, navigation }) => {

    // For expanding description
    const [isExpanded, SetIsExpanded] = useState(false);
    const [idForExpand, setIdForExpand] = useState(0);

    function sliceDescription(description: string) {
        if (description.length > 75) {
            return description.substring(0, 55) + " ..."
        }
        else {
            return description
        }
    }


    return (
        <View>
            <FlatList
                horizontal={true}
                data={recipes}
                renderItem={({ item, index }) => {
                    return (
                        <>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("SelectedRecipeScreen", {
                                        id: item.id,
                                        name: item.name,
                                        type: item.type,
                                        prepTime: item.prepTime,
                                        estimatedPrice: item.estimatedPrice,
                                        numberOfPersons: item.numberOfPersons,
                                        description: item.description,
                                        userId: item.userId,
                                    }
                                    )
                                }}
                            >
                                <View style={{ paddingEnd: 5 }}>
                                    <View style={style.card}>

                                        <Text style={style.title}> {item.name} <AllergiComponent item={item} /> </Text>

                                        <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey' }}></View>

                                        <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                                            <Text style={style.prepTime}><Text style={{ fontWeight: '700' }}>Antal personer:</Text> {item.numberOfPersons}</Text>
                                            <Text style={style.prepTime}><Text style={{ fontWeight: '700' }}>Tilberredningstid:</Text> {item.prepTime}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: -20 }}>
                                            <Text style={[style.priceComponent]}><PriceComponent price={item.estimatedPrice} /></Text>
                                        </View>


                                        <View>
                                            {!isExpanded ?
                                                <>
                                                    <Text style={{ fontWeight: '700', paddingTop: 15, paddingBottom: 5 }}>Hurtig guide:</Text>
                                                    <Text style={{ lineHeight: 20, maxHeight: Dimensions.get("window").height / 100 * 7 }}>{sliceDescription(item.description)}</Text>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            SetIsExpanded(true)
                                                            setIdForExpand(item.id)
                                                        }}
                                                    >
                                                        {item.description.length > 65 &&
                                                            <MaterialIcons style={{ textAlign: 'center' }} name="expand-more" size={24} color="grey" />
                                                        }
                                                    </TouchableOpacity>
                                                </>
                                                : isExpanded && item.id === idForExpand &&
                                                <>
                                                    <Text style={{ fontWeight: '700', paddingTop: 15, paddingBottom: 5 }}>Hurtig guide:</Text>
                                                    <Text style={{ lineHeight: 20 }}>{item.description}</Text>

                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            SetIsExpanded(false)
                                                        }}
                                                    >
                                                        <MaterialIcons style={{ textAlign: 'center', paddingBottom: 5 }} name="expand-less" size={24} color="grey" />
                                                    </TouchableOpacity>
                                                </>
                                            }

                                            {isExpanded && item.id != idForExpand &&
                                                <>
                                                    <Text style={{ fontWeight: '700', paddingTop: 15, paddingBottom: 5 }}>Hurtig guide:</Text>
                                                    <Text style={{ lineHeight: 20, maxHeight: Dimensions.get("window").height / 100 * 7 }}>{sliceDescription(item.description)}</Text>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            SetIsExpanded(true)
                                                            setIdForExpand(item.id)
                                                        }}
                                                    >
                                                        {item.description.length > 65 &&
                                                            <MaterialIcons style={{ textAlign: 'center' }} name="expand-more" size={24} color="grey" />
                                                        }
                                                    </TouchableOpacity>
                                                </>
                                            }
                                        </View>

                                    </View>
                                </View>
                            </TouchableOpacity>
                        </>
                    )
                }}
            >

            </FlatList>
        </View>
    )
}

const style = StyleSheet.create({
    estPrice: {
        paddingTop: 15,
    },
    prepTime: {
        paddingTop: 15
    },
    priceComponent: {
        marginTop: -40,
        marginRight: 20
    },
    card: {
        backgroundColor: 'rgb(247,247,255)',
        borderRadius: 15,
        padding: 12,
        minHeight: Dimensions.get("window").height / 100 * 35,
        width: Dimensions.get("window").width / 100 * 95
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        paddingBottom: 10
    },
})

export default LikedRecipeCards;