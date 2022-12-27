import { StackNavigationProp } from '@react-navigation/stack' // Import af StackNavigationProp (Del af template projektet)
import { RouteProp } from '@react-navigation/native' // Import af RouteProp (Del af template projektet)
import React, { useState } from 'react' // Import af funktionelle komponenter fra react
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native' // Import af react-native komponenter
import ViewContainer from "../../components/ViewContainer" // Import af min view container komponent
import { MyPageNavigationParameters } from '../../Types/Navigation_types' // Import af min mypage navigations parametre type 
import { useEditDescriptionMutation } from "../../redux/services/RecipeAPI" // Import af min funktionelle komponent fra RecipeAPI
import AuthPressable from '../../components/AuthPressable' // Import af min knap komponent
import HeaderWithoutBackcontainer from '../../components/HeaderWithoutBackcontainer' // Import af min header without back container komponent

type AddRecipeDescriptionScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'AddRecipeDescription'>
type AddRecipeDescriptionScreenRouteProps = RouteProp<MyPageNavigationParameters, 'AddRecipeDescription'>

type AddRecipeDescriptionScreenProps = {
    navigation: AddRecipeDescriptionScreenNavigationProps
    route: AddRecipeDescriptionScreenRouteProps
}

const AddRecipeDescriptionScreen: React.FC<AddRecipeDescriptionScreenProps> = ({ navigation, route }) => {

    const { recipeId } = route.params;

    const [edit] = useEditDescriptionMutation();

    const [editAtr] = useState<{ description: string, id: number }>({ description: "", id: recipeId })


    return (
        <ViewContainer>

            <HeaderWithoutBackcontainer
                text="Tilføj beskrivelse"
            />

            <View style={{paddingVertical: 10}}></View>

            <Text style={style.label}>Beskriv fremgangs metoden:</Text>
            <TextInput 
                multiline={true}
                style={style.input}
                onChangeText={(des) => {
                    editAtr.description = des
                }}
            >
            </TextInput>

            <View style={{paddingTop: 10}}></View>

            <AuthPressable
                text='Gem opskrift'
                color='#86DB9D'
                onPress={() => {
                    if(editAtr.description.length < 2){
                        editAtr.description = "Ingen beskrivelse"
                    }
                    edit(editAtr).unwrap().then(res => {
                        console.log(res)
                    })
                    navigation.navigate("MyPage")

                }}
            />



        </ViewContainer>
    )
}

const style = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: '600',
        paddingVertical: 5
    },
    input: {
        borderRadius: 8,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        minHeight: Dimensions.get("window").height / 100 * 20,
        borderColor: 'rgb(240,240,240)',
    }
})

export default AddRecipeDescriptionScreen