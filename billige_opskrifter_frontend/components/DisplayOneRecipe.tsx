import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { Ingredient } from "../redux/services/IngredientAPI"
import { Recipe, useGetRecipeByIdQuery } from "../redux/services/RecipeAPI"


type DisplayOneRecipeProps = {
    item: Ingredient
}

const DisplayOneRecipe: React.FC<DisplayOneRecipeProps> = ({ item }) => {

    const recipe = useGetRecipeByIdQuery(item.recipeId, { refetchOnMountOrArgChange: true })

    console.log(recipe.data)

    return (
        <View>
            {recipe.data &&
                <>
                    <Text>HALLO</Text>
                    <Text>{recipe.data.id}</Text>
                    <Text>{recipe.data.name}</Text>
                    <Text>{recipe.data.type}</Text>
                </>
            }
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '700',
    }
})

export default DisplayOneRecipe;