import { StackNavigationProp } from '@react-navigation/stack' // Import af StackNavigationProp (Del af template projektet)
import { RouteProp } from '@react-navigation/native' // Import af RouteProp (Del af template projektet)
import React, { useState, useRef } from "react" // Import af funktionelle komponenter fras react
import { View, StyleSheet, Text, TextInput, Pressable, KeyboardAvoidingView, Dimensions } from "react-native" // Import af react-native komponenter
import { useCreateMutation } from "../../redux/services/IngredientAPI" // Import af min funktionelle komponent fra IngredientAPI
import { MyPageNavigationParameters } from "../../Types/Navigation_types" // Import af min mypage navigations parametre type 
import AuthPressable from "../../components/AuthPressable" // Import af min knap komponent
import BackArrowContainer from "../../components/BackArrowContainer" // Import af min back arrow container komponent
import { Ionicons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/
import Header from "../../components/Header" // Import af min header komponent 
import ScrollViewContainer from "../../components/ScrollViewContainer" // Import af min scroll view container komponent

// Sætter navigations & route props
type AddIngredientComponentNavigationProps = StackNavigationProp<MyPageNavigationParameters, "AddExtraIngredientAfterCreationScreen">
type SelectedRecipeScreenRouteProps = RouteProp<MyPageNavigationParameters, 'AddExtraIngredientAfterCreationScreen'>

type AddIngredientComponentProps = {
    navigation: AddIngredientComponentNavigationProps
    route: SelectedRecipeScreenRouteProps
}

const AddIngredientComponent: React.FC<AddIngredientComponentProps> = ({ navigation, route }) => {

    const { recipeId } = route.params;

    const [newIngrAtr] = useState<{ recipeId: number, name: string, type: string, measurementUnit: string, amount: number, alergene: string }>
        ({ recipeId: recipeId, name: '', type: '', measurementUnit: '', amount: 0, alergene: '' });
    const [addIngredient] = useCreateMutation();

    const nameRef = useRef<TextInput>(null);
    const typeRef = useRef<TextInput>(null);
    const muRef = useRef<TextInput>(null);
    const amountRef = useRef<TextInput>(null);
    const alerRef = useRef<TextInput>(null);

    return (
        <ScrollViewContainer>

            <KeyboardAvoidingView
                behavior='position'
                style={{ height: Dimensions.get("window").height / 100 * 84, width: Dimensions.get("window").width / 100 * 94, minWidth: Dimensions.get("window").width / 100 * 94 }}
            >
                <BackArrowContainer>
                <Pressable onPress={() => {
                    navigation.pop();
                }}>
                    <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
                </Pressable>
            </BackArrowContainer>

            <Header
                text="Tilføj en ekstra ingrediens"
            />
            
            <View style={{paddingVertical: 15}}></View>

            <Text style={style.label}>Navn på ingrediensen:</Text>
            <TextInput
                ref={nameRef}
                blurOnSubmit={false}
                returnKeyType='next'
                onSubmitEditing={ () => {
                    typeRef.current?.focus();
                }}
                style={style.input}
                onChangeText={(name) => {
                    newIngrAtr.name = name
                }}
            >
            </TextInput>

            <Text style={style.label}>Ingrediens type:</Text>
            <TextInput
                blurOnSubmit={false}
                ref={typeRef}
                returnKeyType='next'
                onSubmitEditing={ () => {
                    muRef.current?.focus();
                }}
                style={style.input}
                onChangeText={(type) => {
                    newIngrAtr.type = type
                }}
            >
            </TextInput>

            <Text style={style.label}>Måle enhed (gr, kg,  ml, l):</Text>
            <TextInput
                blurOnSubmit={false}
                ref={muRef}
                returnKeyType='next'
                onSubmitEditing={ () => {
                    amountRef.current?.focus();
                }}
                style={style.input}
                onChangeText={(mu) => {
                    newIngrAtr.measurementUnit = mu
                }}
            >
            </TextInput>

            <Text style={style.label}>Mængde:</Text>
            <TextInput
                blurOnSubmit={false}
                ref={amountRef}
                keyboardType='number-pad'
                returnKeyType='done'
                onSubmitEditing={ () => {
                    alerRef.current?.focus();
                }}
                style={style.input}
                onChangeText={(amount) => {
                    newIngrAtr.amount = Number(amount)
                }}

            >
            </TextInput>

            <Text style={style.label}>Alergener:</Text>
            <TextInput
                blurOnSubmit={true}
                ref={alerRef}
                returnKeyType='next'
                onSubmitEditing={ () => {
                    alerRef.current?.blur();
                }}
                style={style.input}
                onChangeText={(alergene) => {
                    newIngrAtr.alergene = alergene
                }}
            >
            </TextInput>

            <View style={{ paddingTop: 10 }}></View>

            <AuthPressable
                text='Gem'
                color='#86C3F7'
                onPress={() => {
                    newIngrAtr.recipeId = recipeId
                    console.log(newIngrAtr)
                    addIngredient(newIngrAtr)
                    navigation.pop();
                }}
            />

            </KeyboardAvoidingView>

        </ScrollViewContainer>
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
    },
})

export default AddIngredientComponent;
