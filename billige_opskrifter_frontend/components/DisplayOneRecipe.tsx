import React, { useState, useEffect } from "react"
import { View, StyleSheet, Text } from "react-native"
import { Ingredient } from "../redux/services/IngredientAPI"
import { Recipe, useGetRecipeByIdQuery } from "../redux/services/RecipeAPI"


type DisplayOneRecipeProps = {
    item: Ingredient
}

const DisplayOneRecipe: React.FC<DisplayOneRecipeProps> = ({ item }) => {

    const recipe = useGetRecipeByIdQuery(item.recipeId, { refetchOnMountOrArgChange: true })

    return (
        <View>
            {recipe.data &&
                <View style={{}}>
                    <Text>Fra display one recipe comp</Text>
                    <Text>{recipe.data.id}</Text>
                    <Text>{recipe.data.name}</Text>
                    <Text>{recipe.data.type}</Text>
                </View>
            }
        </View>
    )
}

const style = StyleSheet.create({
    
})

export default DisplayOneRecipe;