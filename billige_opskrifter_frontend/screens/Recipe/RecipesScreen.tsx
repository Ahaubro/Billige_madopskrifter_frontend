import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import ViewContainer from "../../components/ViewContainer"
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RecipeNavigationParameters } from '../../Types/Navigation_types'
import BackArrowContainer from '../../components/BackArrowContainer'
import { Ionicons } from '@expo/vector-icons';
import { Recipe, useGetRecipesByTypeQuery, useSearchRecipesQuery } from "../../redux/services/RecipeAPI"
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import Header from '../../components/Header'


type RecipesScreenNavigationProps = StackNavigationProp<RecipeNavigationParameters, 'RecipesScreen'>
type RecipesScreenRouteProps = RouteProp<RecipeNavigationParameters, 'RecipesScreen'>

type RecipesScreenProps = {
    navigation: RecipesScreenNavigationProps
    route: RecipesScreenRouteProps
}


const RecipesScreen: React.FC<RecipesScreenProps> = ({ navigation, route }) => {

    const session = useSelector((state: RootState) => state.session)

    const { type } = route.params

    //Forming first selection by type
    const recipes = useGetRecipesByTypeQuery(type)
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);
    const [searchList, setSearchList] = useState<Recipe[]>([]);

    useEffect(() => {
        if (recipes.data) {
            setRecipeList(recipes.data.recipes)
        }
    }, [recipes.data]);


    //For search query
    const [searchQueryAtr, setSearchQueryAtr] = useState<{ type: string, query: string }>({ type: "", query: "" });
    const recipeSearch = useSearchRecipesQuery(searchQueryAtr, {refetchOnMountOrArgChange: true, skip: searchQueryAtr.query.length === 0});

    useEffect( () => {
        setSearchList(recipeSearch.data?.recipes ?? [])
    }, [recipeSearch.data])


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
                text={type}
            />

            <View style={{ paddingTop: 10 }}></View>


            {/* Her skal der være en search bar med sorteringsmuligheder */}
            <View style={style.inputContainer}>
                <View style={{ paddingLeft: 20 }}>
                    <Ionicons name="search-outline" size={28} color="black" />
                </View>
                <TextInput style={style.input} placeholder="Søg efter opskrift"
                    onChangeText={(q) => {
                        //Evt throttle eller debounce
                        if(q.length > 2){
                            setSearchQueryAtr({type: type, query: q})
                        }
                    }}
                >

                </TextInput>
            </View>



            {/* Her skal implementeres prøv lykken funktionalitet */}
            <View style={{ paddingTop: 10 }}></View>

            <TouchableOpacity
                onPress={() => {
                    const getRandom = Math.floor(Math.random() * recipeList.length);
                    var random = recipeList[getRandom]

                    navigation.navigate("SelectedRecipeScreen", {
                        id: random.id,
                        name: random.name,
                        type: random.type,
                        prepTime: random.prepTime,
                        estimatedPrice: random.estimatedPrice,
                        numberOfPersons: random.numberOfPersons,
                        description: random.description,
                        userId: random.userId
                    })
                }}
            >
                <Text style={{ textAlign: 'center', fontWeight: '700', fontStyle: 'italic', color: 'blue' }}> Prøv lykken </Text>
            </TouchableOpacity>



            {/* Her skal opskrifterne præsenteres i kort */}

            <View style={{ paddingTop: 50 }}></View>

            <View style={{ maxHeight: Dimensions.get("window").height / 100 * 65 }}>


                {/* HVIS SEARCH RESULT ER MINDRE END 0  SKAL ALLE OPSKRIFTER VISES */}
                {searchList.length == 0 ?
                         
                <FlatList
                    data={recipeList}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("SelectedRecipeScreen", {
                                            id: item.id,
                                            name: item.name,
                                            type: item.type,
                                            prepTime: item.prepTime,
                                            estimatedPrice: item.estimatedPrice,
                                            numberOfPersons: item.numberOfPersons,
                                            description: item.description,
                                            userId: item.userId,

                                        })
                                    }}
                                >
                                    <View style={{ paddingBottom: 15 }}>
                                        <View style={style.card}>
                                            <Text style={style.title}> {item.name}</Text>
                                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey' }}></View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                <Text style={style.estPrice}> <Text style={{ fontWeight: '700' }}>Ca. pris:</Text> {item.estimatedPrice}</Text>
                                                <Text style={style.prepTime}> <Text style={{ fontWeight: '700' }}></Text> //Pris farve komponent</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                <Text style={style.prepTime}> <Text style={{ fontWeight: '700' }}>Tilberredningstid:</Text> {item.prepTime}</Text>
                                                <Text style={style.prepTime}> <Text style={{ fontWeight: '700' }}>Antal personer:</Text> {item.numberOfPersons}</Text>

                                            </View>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </>
                        )
                    }}
                >

                </FlatList>

                :

                <FlatList
                    data={searchList}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("SelectedRecipeScreen", {
                                            id: item.id,
                                            name: item.name,
                                            type: item.type,
                                            prepTime: item.prepTime,
                                            estimatedPrice: item.estimatedPrice,
                                            numberOfPersons: item.numberOfPersons,
                                            description: item.description,
                                            userId: item.userId,

                                        })
                                    }}
                                >
                                    <View style={{ paddingBottom: 15 }}>
                                        <View style={style.card}>
                                            <Text style={style.title}> {item.name}</Text>
                                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey' }}></View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                <Text style={style.estPrice}> <Text style={{ fontWeight: '700' }}>Ca. pris:</Text> {item.estimatedPrice}</Text>
                                                <Text style={style.prepTime}> <Text style={{ fontWeight: '700' }}></Text> //Pris farve komponent</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                <Text style={style.prepTime}> <Text style={{ fontWeight: '700' }}>Tilberredningstid:</Text> {item.prepTime}</Text>
                                                <Text style={style.prepTime}> <Text style={{ fontWeight: '700' }}>Antal personer:</Text> {item.numberOfPersons}</Text>

                                            </View>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </>
                        )
                    }}
                >

                </FlatList>


            }

            </View>





        </ViewContainer>
    )
}

const style = StyleSheet.create({
    card: {
        backgroundColor: '#E6FBFF',
        borderRadius: 15,
        padding: 12,
        minHeight: Dimensions.get("window").height / 100 * 20,
        maxHeight: Dimensions.get("window").height / 100 * 20,
    },
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
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        paddingBottom: 10
    },
    estPrice: {
        paddingTop: 15,
        marginLeft: -10
    },
    prepTime: {
        paddingTop: 15
    }
})

export default RecipesScreen
