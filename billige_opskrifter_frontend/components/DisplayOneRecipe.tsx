import React, { useState, useEffect } from "react"
import { View, StyleSheet, Text, Dimensions } from "react-native"
import { Ingredient } from "../redux/services/IngredientAPI"
import { Recipe, useGetRecipeByIdQuery } from "../redux/services/RecipeAPI"
import AllergiComponent from "./AllergiComponent"
import IngredientsMatchComponent from "./IngredientsMatchComponent"
import PriceComponent from "./PriceComponent"


type DisplayOneRecipeProps = {
    item: Ingredient
    allIngr: Ingredient[]
}

const DisplayOneRecipe: React.FC<DisplayOneRecipeProps> = ({ item, allIngr }) => {

    const recipe = useGetRecipeByIdQuery(item.recipeId, { refetchOnMountOrArgChange: true })

    return (
        <View>
            {recipe.data &&
                <View style={{}}>
                    <>
                        <View style={{ paddingBottom: 15 }}>
                            <View style={style.card}>

                                <Text style={style.title}> {recipe.data.name} <AllergiComponent item={recipe.data} /> </Text>

                                <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey' }}></View>

                                <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                                    <Text style={style.prepTime}> <Text style={{ fontWeight: '700' }}>Antal personer:</Text> {recipe.data.numberOfPersons}</Text>
                                    <Text style={style.prepTime}> <Text style={{ fontWeight: '700' }}>Tilberredningstid:</Text> {recipe.data.prepTime}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: -20 }}>
                                    <Text style={[style.priceComponent]}> <PriceComponent price={recipe.data.estimatedPrice} />  </Text>
                                </View>


                                <IngredientsMatchComponent recItem={recipe.data} matchItems={allIngr} />

                            </View>
                        </View>
                    </>
                </View>
            }
        </View>
    )
}

const style = StyleSheet.create({
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
})

export default DisplayOneRecipe;