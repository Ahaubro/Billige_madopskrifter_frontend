import React, { useState } from 'react'
import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useCreateMutation } from '../../redux/services/RecipeAPI'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp, TabActions } from '@react-navigation/native'
import { MyPageNavigationParameters } from '../../Types/Navigation_types'
import ViewContainer from '../../components/ViewContainer'
import Header from '../../components/Header'
import BackArrowContainer from '../../components/BackArrowContainer'
import { Ionicons } from '@expo/vector-icons';
import AuthPressable from '../../components/AuthPressable'


type CreateRecipeScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'CreateRecipe'>
type CreateRecipeScreenRouteProps = RouteProp<MyPageNavigationParameters, 'CreateRecipe'>

type CreateRecipeScreenProps = {
    navigation: CreateRecipeScreenNavigationProps
    route: CreateRecipeScreenRouteProps
}

const CreateRecipeScreen: React.FC<CreateRecipeScreenProps> = ({ navigation, route }) => {

    const session = useSelector((state: RootState) => state.session)

    const [create] = useCreateMutation();
    const [createAtr, setCreateAtr] = useState<{ name: string, type: string, prepTime: number, numberOfPersons: number, estimatedPrice: number, userId: number }>
        ({ name: "", type: "", prepTime: 0, numberOfPersons: 0, estimatedPrice: 0, userId: session.id });

    return (
        <ViewContainer>

            <BackArrowContainer>
                <Pressable onPress={() => {
                    navigation.pop();
                }}>
                    <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
                </Pressable>
            </BackArrowContainer>

            <Header
                text='Ny opskrift'
            />

            <Text style={style.label}>Navnet på opskrfiten:</Text>
            <TextInput style={style.input} 
                onChangeText={ (name) => {
                    createAtr.name = name
                }}
            >
            </TextInput>

            <Text style={style.label}>Typen af opskrift:</Text>
            <TextInput style={style.input} 
                onChangeText={ (type) => {
                    createAtr.type = type
                }}
            >
            </TextInput>

            <Text style={style.label}>Tilberedningstid i mintuer:</Text>
            <TextInput style={style.input} 
                onChangeText={ (tb) => {
                    createAtr.prepTime = Number(tb)
                }}
            >
            </TextInput>

            <Text style={style.label}>Antal personer:</Text>
            <TextInput style={style.input} 
                onChangeText={ (persons) => {
                    createAtr.numberOfPersons = Number(persons)
                }}
            >
            </TextInput>

            <Text style={style.label}>Ca. Pris:</Text>
            <TextInput style={style.input} 
                onChangeText={ (price) => {
                    createAtr.estimatedPrice = Number(price)
                }}
            >
            </TextInput>
            
            <View style={{paddingTop: 10}}></View>

            <AuthPressable 
                text='Tilføj ingredienser'
                color='#86DB9D'
                onPress={ () => {
                    let name: string = createAtr.name
                    if(createAtr.name != "" && createAtr.estimatedPrice != 0 && createAtr.numberOfPersons != 0 && createAtr.prepTime != 0 && createAtr.type != "" ){
                        create(createAtr).unwrap().then( res => {
                            console.log(res)
                            navigation.navigate("AddIngredient", {name})
                        })
                    } else { console.log("Udfyld felterne") }
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
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderColor: 'rgb(240,240,240)',
    }
})

export default CreateRecipeScreen
