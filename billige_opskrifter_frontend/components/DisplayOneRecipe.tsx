import { StackNavigationProp } from "@react-navigation/stack"
import React, { useState, useEffect } from "react"
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native"
import { Ingredient } from "../redux/services/IngredientAPI"
import { Recipe, useGetRecipeByIdQuery } from "../redux/services/RecipeAPI"
import { IngredientSearchNavigationParameters } from "../Types/Navigation_types"
import AllergiComponent from "./AllergiComponent"
import IngredientsMatchComponent from "./IngredientsMatchComponent"
import PriceComponent from "./PriceComponent"


type SearchIngrScreenNavigationProps = StackNavigationProp<IngredientSearchNavigationParameters, 'IngredientSearchResultScreen'>

type DisplayOneRecipeProps = {
    item: Ingredient
    allIngr: Ingredient[]
    navigation: SearchIngrScreenNavigationProps

}

const DisplayOneRecipe: React.FC<DisplayOneRecipeProps> = ({ item, allIngr, navigation }) => {

    const recipe = useGetRecipeByIdQuery(item.recipeId, { refetchOnMountOrArgChange: true })

    const [thisRecipe, setThisRecipe] = useState<{ id: number, name: string, type: string, prepTime: number, estimatedPrice: number, numberOfPersons: number, description: string, userId: number }>
        ({ id: 0, name: '', type: '', prepTime: 0, estimatedPrice: 0, numberOfPersons: 0, description: '', userId: 0 })

    useEffect(() => {
        if (recipe.data) {
            setThisRecipe({
                id: recipe.data.id,
                name: recipe.data.name,
                type: recipe.data.type,
                prepTime: recipe.data.prepTime,
                estimatedPrice: recipe.data.estimatedPrice,
                numberOfPersons: recipe.data.numberOfPersons,
                description: recipe.data.description,
                userId: recipe.data.userId
            })
        }
    }, [recipe.data])

    return (
        <View>
            {recipe.data &&
                <>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("SelectedRecipeScreen", {
                                id: thisRecipe.id,
                                name: thisRecipe.name,
                                type: thisRecipe.type,
                                prepTime: thisRecipe.prepTime,
                                estimatedPrice: thisRecipe.estimatedPrice,
                                numberOfPersons: thisRecipe.numberOfPersons,
                                description: thisRecipe.description,
                                userId: thisRecipe.userId
                            })
                        }}
                    >
                        <View style={{ paddingBottom: 15 }}>
                            <View style={style.card}>

                                <Text style={style.title}> {thisRecipe.name} <AllergiComponent item={recipe.data} /> </Text>

                                <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey' }}></View>

                                <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                                    <Text style={style.prepTime}><Text style={{ fontWeight: '700' }}>Tilberredningstid:</Text> {thisRecipe.prepTime}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: -15 }}>
                                        <Text style={[style.priceComponent]}> <PriceComponent price={thisRecipe.estimatedPrice} />  </Text>
                                    </View>
                                </View>

                                <View style={{ marginTop: -35 }}>
                                    <Text style={{ fontWeight: '700', paddingBottom: 5 }}>Matchende ingredienser:</Text>

                                    <View style={{maxHeight: Dimensions.get("window").height / 100 * 4}}>
                                            <IngredientsMatchComponent recItem={recipe.data} allIngr={allIngr} />                                      
                                    </View>
                                </View>

                            </View>
                        </View>
                    </TouchableOpacity>
                </>
            }
        </View>
    )
}

const style = StyleSheet.create({
    card: {
        backgroundColor: 'rgb(247,247,255)',
        borderRadius: 15,
        padding: 12,
        minHeight: Dimensions.get("window").height / 100 * 25,
        maxHeight: Dimensions.get("window").height / 100 * 25,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        paddingBottom: 10
    },
    estPrice: {
        paddingTop: 15,
    },
    prepTime: {
        paddingTop: 15
    },
    priceComponent: {
        marginRight: 10
    },
    
})

export default DisplayOneRecipe;