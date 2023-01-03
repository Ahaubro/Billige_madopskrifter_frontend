import React, { useEffect, useState } from "react" // Import af funktionelle komponenter fra react
import { View, StyleSheet, Text } from "react-native" // Import af react native komponenter
import { useSelector } from "react-redux" // Del af template projektet
import { Allergi, useGetAllergiesByUserIdQuery } from "../redux/services/AllergiAPI" // Import fra mit personlige API
import { Ingredient, useGetByRecipeIdQuery } from "../redux/services/IngredientAPI" // Import fra mit personlige API
import { Recipe } from "../redux/services/RecipeAPI" // Import fra mit personlige API
import { RootState } from "../redux/store" // Del af template projektet
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/


// Denne komponent skal bruge et enkelt opskrifts objekt
type AllergiComponentProps = {
    item: Recipe
}

const AllergiComponent: React.FC<AllergiComponentProps> = ({ item }) => {

    // instantiere et session objekt
    const session = useSelector((state: RootState) => state.session)

    // Fetcher brugerens allergier
    const fetchedUserAllergies = useGetAllergiesByUserIdQuery(session.id, { refetchOnMountOrArgChange: true });
    const [userAllergiesList, setUsersAllergiesList] = useState<Allergi[]>([]);

    //Boolean til at registrere når en allergi optræder samt en string til den visuelle præsentation
    let isAllergic: boolean = false
    let allergiString: string = ""

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

    //Tjekker efter et match
    recipeIngredientsList.forEach( (ingr) => {
        userAllergiesList.forEach( (userAl) => {
            if(ingr.alergene === userAl.allergi){
                isAllergic = true
                allergiString = ingr.alergene
            }
        })
    })

    // Visuel præsentation af advarselsikon hvis isAllergic === true
    return (
        <View>
           {isAllergic ? 
            <Text> <MaterialCommunityIcons name="allergy" size={30} color="red" /> {'('}{allergiString}{')'} </Text>   
        :
            <Text></Text>
        }
        </View>
    )
}

const style = StyleSheet.create({
    
})

export default AllergiComponent;