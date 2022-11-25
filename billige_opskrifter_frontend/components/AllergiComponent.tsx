import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import { useSelector } from "react-redux"
import { Allergi, useGetAllergiesByUserIdQuery } from "../redux/services/AllergiAPI"
import { Ingredient, useGetByRecipeIdQuery } from "../redux/services/IngredientAPI"
import { Recipe } from "../redux/services/RecipeAPI"
import { RootState } from "../redux/store"
import { MaterialCommunityIcons } from '@expo/vector-icons';


type AllergiComponentProps = {
    item: Recipe
}

const AllergiComponent: React.FC<AllergiComponentProps> = ({ item }) => {

    const session = useSelector((state: RootState) => state.session)

    // Fetcher brugerens allergier
    const fetchedUserAllergies = useGetAllergiesByUserIdQuery(session.id, { refetchOnMountOrArgChange: true });
    const [userAllergiesList, setUsersAllergiesList] = useState<Allergi[]>([]);

    let isAllergic: boolean = false

    useEffect(() => {
        if (fetchedUserAllergies.data) {
            setUsersAllergiesList(fetchedUserAllergies.data.allergies)
        }
    }, [fetchedUserAllergies.data])


    //Fetching ingredients
    const fetchedRecipeIngredients = useGetByRecipeIdQuery(item.id);
    const [recipeIngredientsList, setRecipeIngredientsList] = useState<Ingredient[]>([]);

    useEffect(() => {
        if (fetchedRecipeIngredients.data) {
            setRecipeIngredientsList(fetchedRecipeIngredients.data.ingredients)
        }
    }, [fetchedRecipeIngredients.data])

    //Prøver at finde et match
    recipeIngredientsList.forEach( (ingr) => {
        userAllergiesList.forEach( (userAl) => {
            if(ingr.alergene == userAl.allergi){
                isAllergic = true
            }
        })
    })


    return (
        <View>
           {isAllergic ? 
            <Text> <MaterialCommunityIcons name="allergy" size={30} color="red" /> </Text>   
        :
            <Text></Text>
        }
        </View>
    )
}

const style = StyleSheet.create({
    
})

export default AllergiComponent;