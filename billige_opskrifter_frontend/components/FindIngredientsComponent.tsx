import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import { Ingredient, useSearchIngredientsQuery } from "../redux/services/IngredientAPI"
import DisplayOneRecipe from "./DisplayOneRecipe"


type FindRecipesComponentProps = {
    item: Ingredient
}

const FindRecipesComponent: React.FC<FindRecipesComponentProps> = ({ item }) => {

    //Search for ingredients ved brug af item.name, som bliver taget med fra IngredientSearchResultScreen,
    //for at kunne se alle opskrifter der indeholder den ingrediens der er valgt nogle steps tilbage
    
    const [ingrList, setIngrList] = useState<Ingredient[]>([]);
    const [searchIngrAtr, setSearchIngrAtr] = useState<{ search: string }>({ search: item.name});
    const ingredientSearch = useSearchIngredientsQuery(searchIngrAtr, { refetchOnMountOrArgChange: true, skip: searchIngrAtr.search.length === 0 });


    useEffect(() => {
        if (ingredientSearch.data) {
            setIngrList(ingredientSearch.data?.ingredients)
        }
    }, [ingredientSearch.data])


    return (
        <View>
            {ingrList.map( (item, index) => {
                return (
                    <View key={index}>
                        <DisplayOneRecipe item={item}/>
                    </View>
                )
            })}
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

export default FindRecipesComponent;