import React, { useState, useEffect } from "react"
import { View, StyleSheet, Text, Dimensions, ScrollView } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { Ingredient } from "../redux/services/IngredientAPI"
import { useGetByRecipeIdQuery } from "../redux/services/IngredientAPI"
import { Recipe } from "../redux/services/RecipeAPI"


type IngredientsMatchComponentProps = {
    recItem: Recipe
    allIngr: Ingredient[]
}

const IngredientsMatchComponent: React.FC<IngredientsMatchComponentProps> = ({ recItem, allIngr }) => {

    //Jeg sætter en liste med useState og useEffect, så jeg kan lave en unik liste af ingredienser, for at undgå dobbelt resultater
    const [allIngrList, setAllIngrList] = useState<Ingredient[]>([]);

    useEffect(() => {
        if (allIngr.length > 0) {
            setAllIngrList(removeDuplicatesById(allIngr))
        }
    }, [allIngr])


    //Fjerne duplikater så der kun bliver vist en ingredient en gang - da der læses direkte fra ingrediens tabellen
    function removeDuplicatesById(arr: Ingredient[]) {
        return arr.filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i)
    }


    // conditions om rækkefølge udfra matches?


    return (
        <View>
            {allIngrList.map((item, index) => {
                if (item.recipeId === recItem.id) {
                    return (
                        <View key={index} style={{flexDirection: 'row'}}>
                            <View>
                                <Text> - {item.name} {item.amount}{item.measurementUnit}</Text>
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