import React from "react"
import { View, StyleSheet, Text, Dimensions, ScrollView } from "react-native"
import { Ingredient } from "../redux/services/IngredientAPI"
import { useGetByRecipeIdQuery } from "../redux/services/IngredientAPI"
import { Recipe } from "../redux/services/RecipeAPI"


type IngredientsMatchComponentProps = {
    recItem: Recipe
    allIngr: Ingredient[]
}

const IngredientsMatchComponent: React.FC<IngredientsMatchComponentProps> = ({ recItem, allIngr }) => {

    //Get all ingr by recipe id, tag total antallet af dem og 

    // conditions om rækkefølge udfra matches?

    return (
        <ScrollView>
            <Text style={{fontWeight: '700', paddingTop: 15, paddingBottom: 5}}>Matchende ingredienser:</Text>
            {allIngr.map((item, index) => {
                if(item.recipeId === recItem.id){
                    return (
                        <View key={index}>
                            <View>
                                <Text>{item.name}</Text>
                            </View>
                        </View>
                    )
                }
            })
            }

        </ScrollView>
    )
}

const style = StyleSheet.create({

})

export default IngredientsMatchComponent;