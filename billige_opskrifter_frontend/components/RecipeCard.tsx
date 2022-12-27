import React from "react" // Import af React
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Dimensions } from "react-native" // Import af react-native komponetner
import { StackNavigationProp } from "@react-navigation/stack" // Import af navigationn (Del af template projektet)
import { Recipe } from "../redux/services/RecipeAPI" // Import af Recipe typen fra RecipeAPI
import { RecipeNavigationParameters } from "../Types/Navigation_types" // Import af mine navigations typer fra types
import PriceComponent from "./PriceComponent" // Import af min pris komponent
import AllergiComponent from "./AllergiComponent" // Import af min allergi komponent

// Props
type RecipesScreenNavigationProps = StackNavigationProp<RecipeNavigationParameters, 'RecipesScreen'>

type RecipeCardProps = {
    recipes: Recipe[]
    navigation: RecipesScreenNavigationProps
}


const RecipeCard: React.FC<RecipeCardProps> = ({ recipes, navigation }) => {

    return (
        <View style={{maxHeight: Dimensions.get("window").height / 100 * 57}}>
            <FlatList
                data={recipes}
                renderItem={({ item }) => {
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
                                <View style={{ paddingBottom: 15 }}>
                                    <View style={style.card}>

                                        <Text style={style.title}> {item.name} <AllergiComponent item={item} /> </Text>

                                        <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey' }}></View>

                                        <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                                            <Text style={style.prepTime}> <Text style={{ fontWeight: '700' }}>Antal personer:</Text> {item.numberOfPersons}</Text>
                                            <Text style={style.prepTime}> <Text style={{ fontWeight: '700' }}>Tilberredningstid:</Text> {item.prepTime}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: -20 }}>
                                            <Text style={[style.priceComponent]}> <PriceComponent price={item.estimatedPrice} />  </Text>
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
        minHeight: Dimensions.get("window").height / 100 * 20,
        maxHeight: Dimensions.get("window").height / 100 * 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        paddingBottom: 10
    },
})

export default RecipeCard;