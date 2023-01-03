import { StackNavigationProp } from '@react-navigation/stack' // Import af StackNavigationProp (Del af template projektet)
import { RouteProp } from '@react-navigation/native' // Import af RouteProp (Del af template projektet)
import React, { useState, useEffect, useRef } from 'react' // Import af funktionelle komponenter fra react
import { Dimensions, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native' // Import af react-native komponenter
import { useSelector } from 'react-redux' // Import af useSelector (Del af template projektet)
import { RootState } from '../../redux/store' // Import af RootState (Del af template projektet)
import { MyPageNavigationParameters } from '../../Types/Navigation_types' // Import af min mypage navigations parametre type 
import { useGetRecipesByNameAndUserIdQuery, useDeleteRecipeMutation } from "../../redux/services/RecipeAPI" // Import af mine funktionelle komponenter fra RecipeAPI
import { Ingredient, useCreateMutation, useGetByRecipeIdQuery, useDeleteIngredientMutation } from '../../redux/services/IngredientAPI' // Import af mine funktionelle komponenter fra IngredientAPI
import AuthPressable from '../../components/AuthPressable' // Import af min knap komponent
import { Ionicons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/
import ScrollViewContainer from '../../components/ScrollViewContainer' // Import af min scroll view container komponent
import HeaderWithoutBackcontainer from '../../components/HeaderWithoutBackcontainer' // Import af min header without back container komponent


type AddIngredientScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'AddIngredient'>
type AddIngredientScreenRouteProps = RouteProp<MyPageNavigationParameters, 'AddIngredient'>

type CreateRecipeScreenProps = {
    navigation: AddIngredientScreenNavigationProps
    route: AddIngredientScreenRouteProps
}


const AddIngredientScreen: React.FC<CreateRecipeScreenProps> = ({ navigation, route }) => {

    //Instantiere et session objekt
    const session = useSelector((state: RootState) => state.session)

    //Destructuring name fra CreateRecipeScreen
    const { name } = route.params;


    //Getting this recipe to add ingredients
    const [thisRecipeAtr] = useState<{ userId: number, name: string }>({ userId: session.id, name: name });
    const thisRecipe = useGetRecipesByNameAndUserIdQuery(thisRecipeAtr, { refetchOnMountOrArgChange: true });
    let recipeId: number = 0

    if (thisRecipe.data != undefined) {
        recipeId = thisRecipe.data.id
    }

    //Add ingredient props
    const [addIngredient] = useCreateMutation();
    const [addIngredientAtr] = useState<{ recipeId: number, name: string, type: string, measurementUnit: string, amount: number, alergene: string }>
        ({ recipeId: 0, name: "", type: "", measurementUnit: "", amount: 0, alergene: "" });


    //Getting ingredients that have been made for this recipe for the user to see
    const thisRecipesIngredients = useGetByRecipeIdQuery(recipeId);
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);

    useEffect(() => {
        if (thisRecipesIngredients.data) {
            setIngredientsList(thisRecipesIngredients.data.ingredients)
        }
    })


    // Delete ingredient & recipe
    const [deleteIngredient] = useDeleteIngredientMutation();
    const [deleteRecipe] = useDeleteRecipeMutation();


    // Clear textInputs når man tilføjer yderligere ingredienser
    const nameRef = useRef<TextInput>(null);
    const typeRef = useRef<TextInput>(null);
    const measureUnitRef = useRef<TextInput>(null);
    const amountRef = useRef<TextInput>(null);
    const alerRef = useRef<TextInput>(null);

    // Clearing textInputs
    const handleSubmit = () => {
        nameRef.current?.clear();
        typeRef.current?.clear();
        measureUnitRef.current?.clear();
        amountRef.current?.clear();
        alerRef.current?.clear();
    }

    // Clearing atr
    const clearAtr = () => {
        addIngredientAtr.alergene = ""
        addIngredientAtr.amount = 0
        addIngredientAtr.measurementUnit = ""
        addIngredientAtr.name = ""
        addIngredientAtr.type = ""
    }


    return (

        <KeyboardAvoidingView
            behavior='position'
            style={{ height: Dimensions.get("window").height / 100 * 85 }}
        >
            <ScrollViewContainer>

                <HeaderWithoutBackcontainer
                    text="Tilføj ingredienser"
                />

                <View>
                    {ingredientsList.length != 0 ?
                        <View style={{ paddingVertical: 5 }}>
                            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '700', paddingVertical: 10 }}>Tilføjede ingredienser</Text>
                            {ingredientsList.map((item, index) => {
                                return (
                                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 1 }}>
                                        <Text style={{ fontWeight: '700', fontSize: 16 }}>#{index + 1}</Text>
                                        <Text style={{ fontSize: 16 }}> {item.name} {item.amount}{item.measurementUnit} {item.alergene.length > 0 && <>{'('}{item.alergene}{')'} </>}</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                deleteIngredient({ id: item.id })
                                            }}
                                        >
                                            <Ionicons name="trash-outline" size={22} color="#FF9C9C" />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                            }
                        </View>
                        :

                        <Text style={{ textAlign: 'center', paddingVertical: 15 }}>Du har ikke tilføjet ingredienser til opskriften endnu</Text>
                    }
                </View>




                <Text style={style.label}>Navn på ingrediensen:</Text>
                <TextInput
                    editable={true}
                    ref={nameRef}
                    placeholder="Ingrediens navn"
                    style={style.input}
                    returnKeyType='next'
                    onSubmitEditing={() => {
                        typeRef.current?.focus();
                    }}
                    onChangeText={(name) => {
                        addIngredientAtr.name = name
                    }}
                >
                </TextInput>

                <Text style={style.label}>Ingrediens type:</Text>
                <TextInput
                    placeholder="Eks. Tilbehør"
                    ref={typeRef}
                    style={style.input}
                    returnKeyType='next'
                    onSubmitEditing={() => {
                        amountRef.current?.focus();
                    }}
                    onChangeText={(type) => {
                        addIngredientAtr.type = type
                    }}
                >
                </TextInput>

                <Text style={style.label}>Mængde:</Text>
                <TextInput
                    placeholder="Eks. 250"
                    ref={amountRef}
                    keyboardType="number-pad"
                    style={style.input}
                    returnKeyType='done'
                    onSubmitEditing={() => {
                        measureUnitRef.current?.focus();
                    }}
                    onChangeText={(amount) => {
                        addIngredientAtr.amount = Number(amount)
                    }}

                >
                </TextInput>

                <Text style={style.label}>Måle enhed (gr, kg,  ml, l):</Text>
                <TextInput
                    placeholder='Eks. stk'
                    ref={measureUnitRef}
                    style={style.input}
                    returnKeyType='next'
                    onSubmitEditing={() => {
                        alerRef.current?.focus();
                    }}
                    onChangeText={(mu) => {
                        addIngredientAtr.measurementUnit = mu
                    }}
                >
                </TextInput>

                <Text style={style.label}>Alergener:</Text>
                <TextInput
                    placeholder="Eks. Laktose"
                    ref={alerRef}
                    style={style.input}
                    onChangeText={(alergene) => {
                        addIngredientAtr.alergene = alergene
                    }}
                >
                </TextInput>

                <View style={{ paddingTop: 10 }}></View>

                <AuthPressable
                    text='Tilføj ingrediensen'
                    color='#86C3F7'
                    onPress={() => {
                        addIngredientAtr.recipeId = recipeId
                        if (recipeId != 0) {
                            if(addIngredientAtr.name != "" && addIngredientAtr.type != "" && addIngredientAtr.amount != 0 && addIngredientAtr.measurementUnit != ""){
                                addIngredient(addIngredientAtr).unwrap().then(res => {
                                    clearAtr();
                                })
                                handleSubmit();
                            }
                        }
                    }}
                />

                <View style={{ paddingTop: 10 }}></View>

                <AuthPressable
                    text='Gem og lav beskrivelse'
                    color='#86C3F7'
                    onPress={() => {
                        if (recipeId != 0) {
                            addIngredientAtr.recipeId = recipeId
                            ingredientsList.map((item) => {
                                //Hvis ingrediensen allerede er tilføjet sendes vi videre, ellers tilføjes den nye ingrediens først
                                if (item.name === addIngredientAtr.name) {
                                    navigation.navigate("AddRecipeDescription", { recipeId })
                                } else {
                                    if(addIngredientAtr.name != "" && addIngredientAtr.type != "" && addIngredientAtr.amount != 0 && addIngredientAtr.measurementUnit != ""){
                                        addIngredient(addIngredientAtr).unwrap().then(res => {
                                            //console.log(res)
                                        })
                                    }
                                    navigation.navigate("AddRecipeDescription", { recipeId })
                                }
                            })
                        }
                    }}
                />

                <View style={{ paddingTop: 10 }}></View>

                <AuthPressable
                    text='Afbryd'
                    color='#FF9C9C'
                    onPress={() => {
                        if (recipeId != 0) {
                            deleteRecipe({ recipeId: recipeId }).unwrap().then(() => {
                                navigation.navigate('MyPage')
                            })
                        }
                    }}
                />

                <View style={{paddingTop: 100}}></View>

            </ScrollViewContainer>
        </KeyboardAvoidingView>



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

export default AddIngredientScreen
