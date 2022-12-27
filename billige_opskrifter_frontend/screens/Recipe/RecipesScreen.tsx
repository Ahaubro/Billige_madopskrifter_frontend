import { StackNavigationProp } from '@react-navigation/stack' // Import af StackNavigationProp (Del af template projektet)
import { RouteProp } from '@react-navigation/native' // Import af RouteProp (Del af template projektet)
import React, { useEffect, useState } from 'react' // Import af funktionelle komponenter fra react
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View, Modal, TouchableOpacity } from 'react-native' // Import af react-native komponenter
import ViewContainer from "../../components/ViewContainer" // Import af min view conatiner komponent
import { RecipeNavigationParameters } from '../../Types/Navigation_types' // Import af min recipe navigations parameter type
import BackArrowContainer from '../../components/BackArrowContainer' // Import af min back arrow container komponent
import { Ionicons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/
import { Recipe, useGetRecipesByTypeQuery, useSearchRecipesQuery } from "../../redux/services/RecipeAPI" // Import af funktionelle komponenter fra RecipeAPI
import Header from '../../components/Header' // Import af min header komponent
import { Picker } from '@react-native-picker/picker' // Import af Picker komponent hentet eksternt fra -> -> https://www.npmjs.com/package/@react-native-picker/picker og installeret med yarn package manager
import RecipeCard from '../../components/RecipeCard' // import af min recipeCards komponent


type RecipesScreenNavigationProps = StackNavigationProp<RecipeNavigationParameters, 'RecipesScreen'>
type RecipesScreenRouteProps = RouteProp<RecipeNavigationParameters, 'RecipesScreen'>

type RecipesScreenProps = {
    navigation: RecipesScreenNavigationProps
    route: RecipesScreenRouteProps
}


const RecipesScreen: React.FC<RecipesScreenProps> = ({ navigation, route }) => {

    const { type } = route.params

    //Forming first selection of recipes by type
    const recipes = useGetRecipesByTypeQuery(type)
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);

    useEffect(() => {
        if (recipes.data) {
            setRecipeList(recipes.data.recipes)
        }


    }, [recipes.data]);


    //For search query
    const [searchQueryAtr, setSearchQueryAtr] = useState<{ type: string, query: string }>({ type: "", query: "" });
    const recipeSearch = useSearchRecipesQuery(searchQueryAtr, { refetchOnMountOrArgChange: true, skip: searchQueryAtr.query.length === 0 });
    const [searchList, setSearchList] = useState<Recipe[]>([]);

    useEffect(() => {
        setSearchList(recipeSearch.data?.recipes ?? [])
    }, [recipeSearch.data])



    //Sorteringsmuligheder & sorterings modal
    const [isModalVisible, setModalVisible] = useState(false)
    const [selectedSort, setSelectedSort] = useState("");
    const sortedRecipes = [...recipeList]

    useEffect(() => {
        if (selectedSort == "fast") {
            sortedRecipes.sort((a, b) => (a.prepTime - b.prepTime))
            setRecipeList(sortedRecipes)
        }
        if (selectedSort == "slow") {
            sortedRecipes.sort((a, b) => (b.prepTime - a.prepTime))
            setRecipeList(sortedRecipes)
        }
        if (selectedSort == "cheap") {
            sortedRecipes.sort((a, b) => (a.estimatedPrice - b.estimatedPrice))
            setRecipeList(sortedRecipes)
        }
        if (selectedSort == "expensive") {
            sortedRecipes.sort((a, b) => (b.estimatedPrice - a.estimatedPrice))
            setRecipeList(sortedRecipes)
        }
        if (selectedSort == "few") {
            sortedRecipes.sort((a, b) => (a.numberOfPersons - b.numberOfPersons))
            setRecipeList(sortedRecipes)
        }
        if (selectedSort == "many") {
            sortedRecipes.sort((a, b) => (b.numberOfPersons - a.numberOfPersons))
            setRecipeList(sortedRecipes)
        }
        if (selectedSort == "nameaz") {
            let sortRecipesByName = sortedRecipes.sort((a, b) => {
                if (a.name < b.name) {
                    return -1
                }
                if (a.name > b.name) {
                    return 1
                }
                return 0
            })
            setRecipeList(sortRecipesByName)
        }
        if (selectedSort == "nameza") {
            let sortRecipesByName = sortedRecipes.sort((a, b) => {
                if (b.name < a.name) {
                    return -1
                }
                if (b.name > a.name) {
                    return 1
                }
                return 0
            })
            setRecipeList(sortRecipesByName)
        }
    }, [selectedSort])


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


            <View style={{ paddingTop: 25 }}></View>


            {/* Her skal der være en search bar med sorteringsmuligheder */}
            <View style={style.inputContainer}>
                <View style={{ paddingLeft: 20 }}>
                    <Ionicons name="search-outline" size={28} color="black" />
                </View>
                <TextInput style={style.input} placeholder="Søg efter opskrift"
                    onChangeText={(q) => {
                        if (q.length > 2) {
                            setSearchQueryAtr({ type: type, query: q })
                        }
                    }}
                >
                </TextInput>
                <View style={{ paddingRight: 20 }}>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(true)
                        }}
                    >
                        <Ionicons name="filter-outline" size={28} color="black" />
                    </TouchableOpacity>
                </View>
            </View>


            {/* Modal der viser sorteringsmuligheder */}

            <View>
                <Modal
                    visible={isModalVisible}
                    animationType="slide"
                    transparent={true}
                >

                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 65 }}>
                        <View style={style.modal}>
                            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '600' }}>Sorteringsmuligheder</Text>

                            <View style={{ marginTop: -40 }}>
                                {/* Ekstern React native component Picker hentet fra -> https://www.npmjs.com/package/@react-native-picker/picker */}
                                <Picker
                                    selectedValue={selectedSort}
                                    onValueChange={(sort: string) => {
                                        setSelectedSort(sort)
                                    }}
                                >
                                    <Picker.Item label='Dyreste pris' value="expensive" />
                                    <Picker.Item label='Billigste pris' value="cheap" />
                                    <Picker.Item label='Kort tilberedningstid' value="fast" />
                                    <Picker.Item label='Lang tilberedningstid' value="slow" />
                                    <Picker.Item label='Sorter efter navn a - z' value="nameaz" />
                                    <Picker.Item label='Sorter efter navn z - a' value="nameza" />
                                    <Picker.Item label='Få spisende gæster' value="few" />
                                    <Picker.Item label='Mange spisende gæster' value="many" />
                                </Picker>
                            </View>


                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(!isModalVisible);
                                }}
                            >
                                <Ionicons style={{ textAlign: 'center', marginTop: -20 }} name="close-outline" size={50} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>
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
                <Text style={{ textAlign: 'center', fontWeight: '700', fontStyle: 'italic', color: 'blue', fontSize: 16 }}> Prøv lykken </Text>
            </TouchableOpacity>


            {/* Her skal opskrifterne præsenteres i kort */}
            <View style={{ paddingTop: 30 }}></View>



            {/* HVIS SEARCH RESULT ER MINDRE END 0 SKAL ALLE OPSKRIFTER VISES*/}
            {searchList.length == 0 ?

                <RecipeCard
                    recipes={recipeList}
                    navigation={navigation}
                />

                :

                <RecipeCard
                    recipes={searchList}
                    navigation={navigation}
                />
            }


        </ViewContainer>
    )
}

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
    modal: {
        height: Dimensions.get("window").height / 100 * 37,
        width: Dimensions.get("window").width / 100 * 97,
        backgroundColor: "rgb(247,247,255)",
        padding: 20,
        borderRadius: 15,
        borderColor: "grey",
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 15
    },
})

export default RecipesScreen
