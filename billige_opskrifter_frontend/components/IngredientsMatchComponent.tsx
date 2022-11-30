import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { Ingredient } from "../redux/services/IngredientAPI"
import { useGetByRecipeIdQuery } from "../redux/services/IngredientAPI"
import { Recipe } from "../redux/services/RecipeAPI"


type IngredientsMatchComponentProps = {
    recItem: Recipe
    matchItems: Ingredient[]
}

const IngredientsMatchComponent: React.FC<IngredientsMatchComponentProps> = ({ recItem, matchItems }) => {


    return (
        <View>
            {matchItems.map((item) => {
                if(item.recipeId === recItem.id){
                    return (
                        <View key={item.id}>
                            <View>
                                <Text>Indeholder ingredienser: {item.name}</Text>
                            </View>
                        </View>
                    )
                }
            })
            }

        </View>
    )
}

const style = StyleSheet.create({

})

export default IngredientsMatchComponent;