import React, { useEffect, useState } from 'react'
import { StyleSheet, Pressable, Text, View, Dimensions, TouchableOpacity, Share, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Header from '../../components/Header'
import { StackNavigationProp } from '@react-navigation/stack'
import { MyPageNavigationParameters } from '../../Types/Navigation_types'
import { RouteProp } from '@react-navigation/native'
import BackArrowContainer from "../../components/BackArrowContainer"
import { Ionicons } from '@expo/vector-icons';
import { useGetByRecipeIdQuery, useEditMutation, useDeleteIngredientMutation } from "../../redux/services/IngredientAPI"
import { FlatList } from 'react-native-gesture-handler'
import { Review, useGetReviewsByRecipeIdQuery } from "../../redux/services/ReviewAPI"
import { useDeleteRecipeMutation } from "../../redux/services/RecipeAPI"
import AuthPressable from '../../components/AuthPressable'
import { AirbnbRating } from 'react-native-ratings'
import { useAddLikedRecipeMutation, useLikeCheckQuery } from "../../redux/services/LikedRecAPI"
import ScrollViewContainer from '../../components/ScrollViewContainer'


type SelectedRecipeScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, "SelectedRecipeScreen">
type SelectedRecipeScreenRouteProps = RouteProp<MyPageNavigationParameters, 'SelectedRecipeScreen'>

type SelectedRecipeScreenProps = {
    navigation: SelectedRecipeScreenNavigationProps
    route: SelectedRecipeScreenRouteProps
}

const SelectedRecipeScreen: React.FC<SelectedRecipeScreenProps> = ({ navigation, route }) => {

    const session = useSelector((state: RootState) => state.session)
    const thisUser = session.id

    const { id, name, type, prepTime, numberOfPersons, estimatedPrice, description, userId } = route.params

    //Getting the recipes ingrediens & setUp delete ingr and create ingr
    const thisRecipesIngrediens = useGetByRecipeIdQuery(id);
    const [deleteIngredient] = useDeleteIngredientMutation();


    //Edit recipes ingredients
    const [editIngrAtr, setEditIngrAtr] = useState<{ id: number, name: string, type: string, measurementUnit: string, amount: number, alergene: string }>
        ({ id: 0, name: '', type: '', measurementUnit: '', amount: 0, alergene: '' })
    const [editIngredient] = useEditMutation();
    const [isEditing, setIsEditing] = useState(false)
    const [idForEdit, setIdForEdit] = useState(0);


    //Delete recipe & ingredient
    const [deleteRecipe] = useDeleteRecipeMutation();
    const [deleteRecipeAtr] = useState<{ recipeId: number }>({ recipeId: id });


    //Recipe reviews 
    const thisRecipesReviews = useGetReviewsByRecipeIdQuery(id)
    const [listOfReviews, setListOfReviews] = useState<Review[]>([]);

    useEffect(() => {
        if (thisRecipesReviews.data) {
            setListOfReviews(thisRecipesReviews.data.reviews)
        }
    }, [thisRecipesReviews.data])


    //For liking and checking if a recipe is liked
    const [likeRecipe] = useAddLikedRecipeMutation();
    const [likeRecipeAtr] = useState<{ userId: number, recipeId: number }>({ userId: thisUser, recipeId: id })

    const checkLike = useLikeCheckQuery({ userId: thisUser, recipeId: id }, { refetchOnMountOrArgChange: true });
    const [likedCheck, setLikeCheck] = useState<string>("")

    useEffect(() => {
        if (checkLike.data) {
            setLikeCheck(checkLike.data.statusText);
        }
    }, [checkLike.data])


    //For sharing a recipe
    const customShare = async () => {
        const ingrediens = thisRecipesIngrediens.data?.ingredients
        const options = {
            message: name + '\n' + '\nCa pris: ' + estimatedPrice +
                ' kr' + '\n' + '\nFremgangsmåde: ' + description + '\n' + '\ningredinser: ' + ingrediens?.map((i) => {
                    return '\n' + i.name + " " + i.amount + " " + i.measurementUnit + " " + '(' + i.type + ')'
                })
        }
        try {
            const ShareRes = await Share.share(options);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <ScrollViewContainer>
            <BackArrowContainer>
                <Pressable onPress={() => {
                    navigation.pop();
                }}>
                    <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
                </Pressable>
            </BackArrowContainer>

            <Header
                text={name}
            />



            {/* Her kan man like / unlike et opslag (Hvis man har liket det vises hjerte med streg over) */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                {session.token != 'guest' &&
                    <>
                        <View style={{ paddingVertical: 25 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    likeRecipe(likeRecipeAtr).unwrap().then(res => {
                                        //console.log(res)
                                    });
                                }}
                            >
                                {likedCheck == "isLiked" ?

                                    <Ionicons name="heart" size={30} color="red" />
                                    :
                                    <Ionicons name="heart-outline" size={30} color="red" />
                                }

                            </TouchableOpacity>
                        </View>

                        <View style={{ paddingHorizontal: 10 }}></View>
                    </>
                }


                <View style={{ paddingVertical: 25 }}>
                    <TouchableOpacity
                        onPress={() => {
                            //Share btn
                            customShare();
                        }}
                    >
                        <Ionicons name="share-social-outline" size={30} color="green" />
                    </TouchableOpacity>
                </View>
            </View>



            {/* Displayer først prepTime, personer og pris */}
            <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 5 }}>
                <Text style={style.label}>Tilberedningstid: </Text>
                <Text style={style.field}>{prepTime} min</Text>
            </View>

            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                <Text style={style.label}>Personer: </Text>
                <Text style={style.field}>{numberOfPersons}</Text>
            </View>

            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                <Text style={style.label}>Estimeret pris: </Text>
                <Text style={style.field}>{estimatedPrice} kr.</Text>
            </View>

            <View style={{ paddingVertical: 5 }}></View>


            {/* Displayer ingredienser til opskriften */}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={style.card}>
                    <Text style={[style.label, { padding: 5, paddingBottom: 10 }]}>Ingredienser:</Text>
                    <>
                        {thisRecipesIngrediens.data?.ingredients.map((item, index) => {
                            return (
                                <View key={index}>
                                    <View style={{ paddingBottom: 5 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>

                                            {/* Hvis isEditing er true og idForEdit er item.id kan man redigere i det enkelte objekt  */}
                                            {isEditing == true && item.id === idForEdit ?
                                                <>
                                                    <View style={{ paddingLeft: 30, flexDirection: 'row' }}>
                                                        <TextInput style={style.editInput} placeholder={item.name} editable={true}
                                                            onChangeText={(name) => {
                                                                editIngrAtr.name = name
                                                            }}></TextInput>
                                                        <TextInput style={style.editInput} placeholder={item.type} editable={true}
                                                            onChangeText={(type) => {
                                                                editIngrAtr.type = type
                                                            }}>
                                                        </TextInput>
                                                        <TextInput style={style.editInput} placeholder={String(item.amount)} editable={true}
                                                            onChangeText={(amount) => {
                                                                editIngrAtr.amount = Number(amount)
                                                            }}></TextInput>
                                                        <TextInput style={style.editInput} placeholder={item.measurementUnit} editable={true}
                                                            onChangeText={(mu) => {
                                                                editIngrAtr.measurementUnit = mu
                                                            }}></TextInput>
                                                        <TextInput style={style.editInput} placeholder='Alergi' editable={true}
                                                            onChangeText={(al) => {
                                                                editIngrAtr.alergene = al
                                                            }}></TextInput>
                                                        <TouchableOpacity
                                                            style={style.saveEdit}
                                                            onPress={() => {
                                                                //Sætter det redigerde objekts atr hvis de ikke bliver ændret af brugeren
                                                                editIngrAtr.id = item.id
                                                                if (editIngrAtr.name == "") {
                                                                    editIngrAtr.name = item.name
                                                                }
                                                                if (editIngrAtr.type == "") {
                                                                    editIngrAtr.type = item.type
                                                                }
                                                                if (editIngrAtr.amount == 0) {
                                                                    editIngrAtr.amount = item.amount
                                                                }
                                                                if (editIngrAtr.measurementUnit == "") {
                                                                    editIngrAtr.measurementUnit = item.measurementUnit
                                                                }
                                                                if (editIngrAtr.alergene == "") {
                                                                    editIngrAtr.alergene = item.alergene
                                                                }
                                                                console.log(editIngrAtr)
                                                                editIngredient(editIngrAtr).unwrap().then(res => {
                                                                    console.log(res)
                                                                })
                                                                setIsEditing(false)
                                                            }}
                                                        >
                                                            <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </>

                                                :

                                                <>

                                                    <Text style={{ paddingLeft: 30 }}>{index + 1}: {item.name}</Text>
                                                    <Text> {item.amount}</Text>
                                                    <Text>{item.measurementUnit}</Text>
                                                    <Text style={{ paddingRight: 20 }}> ({item.type}) </Text>

                                                    {/* Hvis man er forfatter til opskriften kan man redigere & slette ingredienserne */}
                                                    {userId == session.id &&
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <TouchableOpacity
                                                                style={style.editBtn}
                                                                onPress={() => {
                                                                    setIdForEdit(item.id)
                                                                    setIsEditing(true)
                                                                }}
                                                            >
                                                                <Text style={{ color: 'white', textAlign: 'center' }}>Rediger <Ionicons name="ios-pencil-outline" size={18} color="blue" /></Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                style={style.deleteIngr}
                                                                onPress={() => {
                                                                    deleteIngredient({ id: item.id })
                                                                }}
                                                            >
                                                                <Text style={{ color: 'white', textAlign: 'center' }}>Slet <Ionicons name="trash-outline" size={18} color="#FF9C9C" /></Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    }
                                                </>
                                            }
                                        </View>
                                    </View>
                                </View>
                            )
                        })}

                    </>
                </View>
            </View>
            
            {/* Man kan tilføje ingredienser til opskriften hvis man er forfatter*/}
            {userId === session.id &&
                <View style={{ paddingVertical: 5 }}>
                    <AuthPressable
                        text='Tilføj yderligere ingrediens'
                        color='#86DB9D'
                        onPress={() => {
                            navigation.navigate("AddExtraIngredientAfterCreationScreen", {
                                recipeId: id
                            })
                        }}
                    />
                </View>
            }

            <View style={{ paddingVertical: 5 }}></View>



            {/* Læser opskriftens fremgangsmetode */}
            <View style={style.card}>
                <Text style={[style.label, { padding: 5, paddingBottom: 10 }]}>Fremgangsmetode:</Text>
                <Text style={style.description}>{description}</Text>
            </View>

            <View style={{ paddingVertical: 5 }}></View>


            {/* Læser opskriftens reviews */}
            <Text style={[style.label, { padding: 5, paddingBottom: 10 }]}>reviews:</Text>
            {
                listOfReviews.length > 0 ?
                    <View>
                        {/* Navigation til AllReviewsScreen */}
                        <TouchableOpacity
                            onPress={ () => {
                                navigation.navigate("AllReviewsScreen", {
                                    reviews: listOfReviews
                                })
                            }}
                        >
                            <Text style={{fontStyle: 'italic', fontWeight: '700', textAlign: 'right', paddingRight: 12, marginTop: -10}}>Se alle</Text>
                        </TouchableOpacity>
                        <>
                            <FlatList
                                style={{ flexWrap: 'wrap' }}
                                horizontal={true}
                                data={thisRecipesReviews.data?.reviews || []}
                                renderItem={({ item, index }) => {
                                    return (
                                        <>
                                            <View style={{ paddingEnd: Dimensions.get("window").width / 100 * 2 }}>
                                                <View style={style.card}>
                                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 10, paddingVertical: 10, paddingHorizontal: 10 }}>
                                                        <AirbnbRating
                                                            reviewSize={16}
                                                            reviews={["Dårlig", "Okay", "God", "Vild med den", "Elsker den!"]}
                                                            reviewColor={'black'}
                                                            defaultRating={item.rating}
                                                            size={20}
                                                            isDisabled={true}
                                                            ratingContainerStyle={{ backgroundColor: 'rgb(247,247,255)', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10  }}
                                                        />
                                                    </View>
                                                    <Text style={{ textAlign: 'justify', padding: 10, paddingLeft: 20 }}>{item.content}</Text>
                                                </View>
                                            </View>
                                        </>
                                    )
                                }}
                            >
                            </FlatList>
                        </>
                    </View>
                    :

                    <Text style={{ textAlign: 'center' }}>Denne opskrift har ingen reviews endnu, bliv den første!</Text>
            }

            <View style={{ paddingVertical: 5 }}></View>


            {/* Nyt review hvis man ikke er gæst og GØR SÅ MAN IKKE KAN SKRIVE REVIEW SOM FORFATTER*/}
            {session.token != 'guest' ?
                <>
                    <AuthPressable
                        text='Nyt review'
                        color='#86DB9D'
                        onPress={() => {
                            navigation.navigate("CreateReviewScreen", { id, userId })
                        }}
                    />

                    <View style={{ paddingVertical: 5 }}></View>
                </>
                :
                
                <Text style={{ textAlign: 'center', fontStyle: 'italic', fontWeight: '600', paddingVertical: 10 }}>Opret en bruger idag og del din mening om opskriften!-skift teksten</Text>                              
            }



            {/* SLET OPSKRIFT HVIS USER ER AUTHOR */}
            {userId == session.id &&
                <AuthPressable
                    text='Slet opskrift'
                    color='#FF9C9C'
                    onPress={() => {
                        deleteRecipe(deleteRecipeAtr);
                        navigation.pop();
                    }}
                />
            }
        </ScrollViewContainer >
    )
}

const style = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
    field: {
        fontSize: 16
    },
    card: {
        backgroundColor: "rgb(247,247,255)",
        width: Dimensions.get("window").width / 100 * 94,
        borderRadius: 15,
        paddingVertical: 8,
        minHeight: 100
    },
    description: {
        textAlign: 'justify',
        fontSize: 14,
        padding: 12
    },
    editInput: {
        width: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',

    },
    editBtn: {
        padding: 3,
        backgroundColor: '#86C3F7',
        borderRadius: 5,
    },
    deleteIngr: {
        backgroundColor: '#FF9C9C',
        padding: 3,
        borderRadius: 5
    },
    saveEdit: {
        backgroundColor: '#86DB9D',
        padding: 3,
        borderRadius: 5
    }

})

export default SelectedRecipeScreen
