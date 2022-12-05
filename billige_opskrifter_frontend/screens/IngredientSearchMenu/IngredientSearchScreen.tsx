import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState, useRef } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { IngredientSearchNavigationParameters } from '../../Types/Navigation_types'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Header from '../../components/Header'
import ViewContainer from "../../components/ViewContainer"
import { Ingredient, useSearchIngredientsQuery } from "../../redux/services/IngredientAPI"
import AuthPressable from '../../components/AuthPressable'



type IngredientSearchScreenNavigationProps = StackNavigationProp<IngredientSearchNavigationParameters, 'IngredientSearchScreen'>
type IngredientSearchScreenRouteProps = RouteProp<IngredientSearchNavigationParameters, 'IngredientSearchScreen'>

type IngredientSearchScreenProps = {
    navigation: IngredientSearchScreenNavigationProps
    route: IngredientSearchScreenRouteProps
}

const IngredientSearchScreen: React.FC<IngredientSearchScreenProps> = ({ navigation, route }) => {

    const session = useSelector((state: RootState) => state.session)

    //Search for ingredients
    const [searchIngrAtr, setSearchIngrAtr] = useState<{ search: string }>({ search: "" });
    const ingredientSearch = useSearchIngredientsQuery(searchIngrAtr, { refetchOnMountOrArgChange: true, skip: searchIngrAtr.search.length === 0 });
    const [ingrList, setIngrList] = useState<Ingredient[]>([]);
    const [chosenIngredients, setChosenIngredients] = useState<Ingredient[]>([])

    //Fjerne duplikater så der kun bliver vist en ingredient en gang - da der læses direkte fra ingrediens tabellen
    function removeDuplicatesByName(arr: Ingredient[]) {
        return arr.filter((v, i, a) => a.findIndex(v2 => (v2.name === v.name)) === i)
    }

    useEffect(() => {
        if (ingredientSearch.data) {
            setIngrList(removeDuplicatesByName(ingredientSearch.data?.ingredients) ?? [])
        }
    }, [ingredientSearch.data])

    // Clear søge input
    const [searchRef, setSearchRef] = useState("");

    function clearSearch(){
        setSearchRef("")
    }


    return (
        <ViewContainer>

            <View style={{ paddingTop: 30 }}>
                <Header
                    text='Find opskrifter ud fra ingredienser du har i hjemmet!'
                />
            </View>


            {/* Her vises ingredienser man har tilføjet fra search query */}
            <View style={{ paddingTop: 15 }}>
                {chosenIngredients.length > 0 &&
                    <>
                        <Text style={{ textAlign: 'center' }}>Du har valgt følgende ingredienser: </Text>
                        {chosenIngredients.map((item, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row' }}>
                                    <Text>{index + 1} {item.name}</Text>

                                    {/* Slet valgte ingredienser */}
                                    <TouchableOpacity
                                        onPress={() => {
                                            chosenIngredients.splice(index)
                                            setChosenIngredients([...chosenIngredients])
                                        }}
                                    >
                                        <Ionicons name="trash-outline" size={22} color="#FF9C9C" />
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </>
                }
            </View>


            <View style={{ paddingTop: 20 }}>

                {/* Her kan man søge efter ingredienser */}
                <View style={style.inputContainer}>
                    <View style={{ paddingLeft: 20 }}>
                        <Ionicons name="search-outline" size={28} color="black" />
                    </View>
                    <TextInput
                        value={searchRef}
                        style={style.input}
                        placeholder="Tilføj de ingredienser du har i hjemmet"
                        onChangeText={(s) => {
                            setSearchRef(s)
                            if (s != " ") {
                                setSearchIngrAtr({ search: s })
                            }
                        }}
                    >
                    </TextInput>
                </View>

            </View>


            {/* Her displayes søge resultaterne */}
            {ingrList.length > 0 && searchIngrAtr.search.length != 0 &&
                <View>
                    {ingrList.map((item, index) => {

                        return (
                            <View key={index} style={{ flexDirection: 'row' }}>
                                <Text style={{ paddingStart: 15, paddingTop: 8 }}> {index + 1} {item.name}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        let ingr: Ingredient = {
                                            id: item.id,
                                            name: item.name,
                                            type: item.type,
                                            amount: item.amount,
                                            measurementUnit: item.measurementUnit,
                                            recipeId: item.recipeId,
                                            alergene: item.alergene
                                        }

                                        setChosenIngredients(removeDuplicatesByName([...chosenIngredients, ingr]))
                                        setIngrList([]);
                                        clearSearch();

                                    }}
                                >
                                    <AntDesign style={{ paddingTop: 8 }} name="plus" size={24} color="green" />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            }


            {/* Find opskrifter med de valgte ingredienser */}
            {chosenIngredients.length > 0 &&
                <>
                    <View style={{ paddingTop: 15 }}>
                        <AuthPressable
                            text='Find opskrifter nu'
                            color='#86C3F7'
                            onPress={() => {
                                navigation.navigate("IngredientSearchResultScreen", { ingredients: chosenIngredients })
                            }}
                        />
                    </View>

                    {/* Clear listen */}
                    <View style={{ paddingTop: 15 }}>
                        <AuthPressable
                            text='Reset'
                            color='#FF9C9C'
                            onPress={() => {
                                setChosenIngredients([]);
                                setIngrList([])
                                clearSearch();
                            }}
                        />
                    </View>

                </>
            }

        </ViewContainer>
    )
}

export default IngredientSearchScreen

const style = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        backgroundColor: "rgb(247,247,255)",
        borderRadius: 25,
        height: 50,
        borderBottomWidth: 1,
        border: 'black',
        outline: 'none',
        opacity: 0.8,
    },
    input: {
        flex: 1,
        outline: 'none',
        paddingLeft: 15
    },
})
