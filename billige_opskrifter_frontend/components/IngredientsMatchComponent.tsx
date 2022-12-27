import React, { useState, useEffect } from "react" // Import af funktionelle komponenter fra React
import { View, StyleSheet, Text } from "react-native" // Import af komponenter fra react-native
import { Ingredient } from "../redux/services/IngredientAPI" // Import af min Ingredient type fra IngredientAPI
import { Recipe } from "../redux/services/RecipeAPI" // Import af min Recipe type fra RecipeAPI

// Props
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


    //Fjerne duplikater så der kun bliver vist en ingrediens en gang - da der læses direkte fra ingrediens tabellen
    function removeDuplicatesById(arr: Ingredient[]) {
        return arr.filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i)
    }

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