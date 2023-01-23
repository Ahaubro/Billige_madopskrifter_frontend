import React from "react" // Import af React 
import { View, StyleSheet, Text } from "react-native" // Import af komponenter fra react-native
import { Ingredient } from "../redux/services/IngredientAPI"


//Props
type MatchPercentComponentProps = {
    thisRecipesIngredients: Ingredient[]
    matchingIngredients: Ingredient[]
}

const MatchPercentComponent: React.FC<MatchPercentComponentProps> = ({ thisRecipesIngredients, matchingIngredients }) => {

    //console.log("Matching", matchingIngredients)
    //console.log("Denne hers", thisRecipesIngredients)

    let percentages: number = 0

    if(thisRecipesIngredients.length === matchingIngredients.length){
        percentages = 100
    }

    if(thisRecipesIngredients.length){

    }

    return (
        <View>
            <Text style={{
                color: percentages === 100 ? 'green' : undefined
            }}> {percentages} %</Text>
        </View>
    )
}

const style = StyleSheet.create({
    
})

export default MatchPercentComponent;