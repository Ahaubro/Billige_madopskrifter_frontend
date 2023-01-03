import { StackNavigationProp } from '@react-navigation/stack' // Import af StackNavigationProp (Del af template projektet)
import { RouteProp } from '@react-navigation/native' // Import af RouteProp (Del af template projektet)
import React, { useEffect, useState } from 'react' // Import af funktionele komponenter fra react
import { StyleSheet, Pressable, Text, View, Dimensions, TouchableOpacity, Share, TextInput, FlatList } from 'react-native' // Import af react-native komponenter
import { useSelector } from 'react-redux' // Import af useSelector (Del af template projektet)
import { RootState } from '../../redux/store' // Import af RootState (Del af template projektet)
import Header from '../../components/Header' // Import af min header komponent
import { MyPageNavigationParameters } from '../../Types/Navigation_types' // Import af min mypage navigations parametre type 
import BackArrowContainer from "../../components/BackArrowContainer" // Import af min back arrow container komponent
import { Ionicons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/
import { useGetByRecipeIdQuery } from "../../redux/services/IngredientAPI" // Import af min funktionelle komponent useGetByRecipeIdQuery fra IngredientAPI
import { Review, useGetReviewsByRecipeIdQuery } from "../../redux/services/ReviewAPI" // Import af review typen samt en funktionel komponent fra mit ReviewAPI
import { useDeleteRecipeMutation } from "../../redux/services/RecipeAPI" // Import af funktionel komponent fra mit RecipeAPI
import AuthPressable from '../../components/AuthPressable' // Import af min knap komponent
import { AirbnbRating } from 'react-native-ratings' // Import af AirbnbRating komponent fra react-native-ratings Hentet her -> https://www.npmjs.com/package/react-native-ratings og installeret med yarn
import { useAddLikedRecipeMutation, useLikeCheckQuery } from "../../redux/services/LikedRecAPI" // Import af mine funktionelle komponenter fra LikedRecAPI
import ScrollViewContainer from '../../components/ScrollViewContainer' // Import af min scroll view container komponent
import { useEditRecipeMutation, useGetRecipeByIdQuery } from "../../redux/services/RecipeAPI" // Import af mine funktionelle komponenter fra RecipeAPI
import { MaterialIcons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/
import DisplayIngrediens from '../../components/DisplayIngrediens' // Import af min displayIngrediens komponent
import { Picker } from '@react-native-picker/picker' // Import af Picker komponent hentet fra -> https://www.npmjs.com/package/@react-native-picker/picker med yarn package manager


//Navigation og route props
type SelectedRecipeScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, "SelectedRecipeScreen">
type SelectedRecipeScreenRouteProps = RouteProp<MyPageNavigationParameters, 'SelectedRecipeScreen'>

type SelectedRecipeScreenProps = {
    navigation: SelectedRecipeScreenNavigationProps
    route: SelectedRecipeScreenRouteProps
}

const SelectedRecipeScreen: React.FC<SelectedRecipeScreenProps> = ({ navigation, route }) => {

    //Instantiere et session objekt & gemmer brugerens Id i en variable
    const session = useSelector((state: RootState) => state.session)
    const thisUser = session.id

    //Desctructuring recipe props fra RecipesScreen(RecipeCard)
    const { id, name, type, prepTime, numberOfPersons, estimatedPrice, description, userId } = route.params


    //Getting the recipes ingrediens & setUp delete ingr and create ingr
    const thisRecipesIngrediens = useGetByRecipeIdQuery(id);

    //Edit recipe
    const [editRecipeAtr, setEditRecipeAtr] = useState<{ id: number, name: string, type: string, prepTime: number, numberOfPersons: number, estimatedPrice: number, description: string, userId: number }>
        ({ id: id, name: name, type: type, prepTime: prepTime, numberOfPersons: numberOfPersons, estimatedPrice: estimatedPrice, description: description, userId: userId })
    const [editRecipe] = useEditRecipeMutation();
    const [isEditingDescription, setIsEditingDesription] = useState(false)
    const [thisRecipe, setThisRecipe] = useState<{ id: number, name: string, type: string, prepTime: number, numberOfPersons: number, estimatedPrice: number, description: string, userId: number }>
        ({ id: 0, name: "", type: "", prepTime: 0, numberOfPersons: 0, estimatedPrice: 0, description: "", userId: 0 })
    const [isEditingRestOfRecipe, setIsEditingRestOfRecipe] = useState(false)


    //Fetcther denne opskrift for at kunne genopfriske redigerede elementer med state
    const fetchedRecipe = useGetRecipeByIdQuery(id);
    useEffect(() => {
        if (fetchedRecipe.data) {
            setThisRecipe(fetchedRecipe.data)
        }
    }, [fetchedRecipe.data])


    //Delete recipe 
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

    //Expanding description
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    function sliceDescription(description: string) {
        if (description != null) {
            if (description.length > 75) {
                return description.substring(0, 75) + " ..."
            }
            else {
                return description
            }
        }
    }

    //SelectedType til Picker (edit recipe type heuristic)
    const [selectedType, setSelectedType] = useState("");
    useEffect( () => {
        if(selectedType === ""){
            setSelectedType(type)
        }
    })

    return (
        <ScrollViewContainer>
            <BackArrowContainer>
                <Pressable onPress={() => {
                    navigation.pop();
                }}>
                    <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
                </Pressable>
            </BackArrowContainer>

            {/* Rediger knap ved siden af opskriftens header, som skal aktivere redigering på resten af opskriften(Name, type, preptime, price, persons) */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {!isEditingRestOfRecipe ?
                    <>
                        <Header
                            text={thisRecipe.name}
                        />
                        {userId === session.id &&
                            <View style={{ paddingLeft: 10 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsEditingRestOfRecipe(true);
                                    }}
                                >
                                    <Ionicons name="ios-pencil-outline" size={25} color="blue" />
                                </TouchableOpacity>
                            </View>
                        }

                    </>
                    :
                    <>
                        <View style={{ paddingEnd: 5 }}>
                            <TextInput
                                style={[style.input, { fontSize: 25, textAlign: 'center', fontWeight: '700', maxWidth: Dimensions.get("window").width / 100 * 50, padding: 4 }]}
                                placeholder={thisRecipe.name}
                                onChangeText={(n) => {
                                    editRecipeAtr.name = n
                                }}
                            >
                            </TextInput>
                        </View>
                        <TouchableOpacity
                            style={style.saveEdit}
                            onPress={() => {
                                editRecipe(editRecipeAtr)
                                setIsEditingRestOfRecipe(false)
                            }}
                        >
                            <Text style={{ padding: 2, color: 'white' }}>Gem</Text>
                        </TouchableOpacity>
                    </>
                }
            </View>


            {/* Her kan man like / unlike et opslag (Hvis man har liket det vises et udfyldt hjerte) */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                {session.token != 'guest' &&
                    <>
                        <View style={{ paddingVertical: 20 }}>
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

                <View style={{ paddingVertical: 20 }}>
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
            
            {/* Mulighed for at redigere en opskrifts type */}
            {isEditingRestOfRecipe &&
                <View>
                    {/* Ekstern React native component Picker 
                    hentet fra -> https://www.npmjs.com/package/@react-native-picker/picker */}
                    <Picker
                        style={{ height: Dimensions.get("window").height / 100 * 12 }}
                        itemStyle={{ height: Dimensions.get("window").height / 100 * 15, marginTop: -20, fontSize: 16 }}
                        selectedValue={selectedType}
                        onValueChange={(type: string) => {
                            if (type.length > 1) {
                                setSelectedType(type)
                                editRecipeAtr.type = type
                            }
                        }}
                    >
                        <Picker.Item label='Morgenmad' value="Morgenmad" />
                        <Picker.Item label='Aftensmad' value="Aftensmad" />
                        <Picker.Item label='Dessert' value="Dessert" />
                        <Picker.Item label='Snacks' value="Snacks" />
                    </Picker>
                </View>
            }

            {/* Displayer først prepTime, personer og pris - og hvis isEditingRestOfRecipe er true vises redigerbare textinputs med værdien som placeholder */}
            {!isEditingRestOfRecipe ?
                <>
                    <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
                        <Text style={style.label}>Tilberedningstid: </Text>
                        <Text style={style.field}>{thisRecipe.prepTime} min</Text>
                    </View>

                    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                        <Text style={style.label}>Antal personer: </Text>
                        <Text style={style.field}>{thisRecipe.numberOfPersons}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                        <Text style={style.label}>Estimeret pris: </Text>
                        <Text style={style.field}>{thisRecipe.estimatedPrice} kr.</Text>
                    </View>
                </>
                :
                <>
                    <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
                        <Text style={style.label}>Tilberedningstid: </Text>
                        <TextInput style={[style.input, { maxWidth: Dimensions.get("window").width / 100 * 8, minWidth: Dimensions.get("window").width / 100 * 8, paddingHorizontal: 5 }]} placeholder={String(thisRecipe.prepTime)} onChangeText={(pt) => {
                            editRecipeAtr.prepTime = Number(pt)
                        }}>
                        </TextInput>
                        <Text style={style.field}>min.</Text>
                    </View>

                    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                        <Text style={style.label}>Antal personer: </Text>
                        <TextInput style={[style.input, { maxWidth: Dimensions.get("window").width / 100 * 8, minWidth: Dimensions.get("window").width / 100 * 8, paddingHorizontal: 5 }]} placeholder={String(thisRecipe.numberOfPersons)} onChangeText={(np) => {
                            editRecipeAtr.numberOfPersons = Number(np)
                        }}>

                        </TextInput>
                    </View>

                    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                        <Text style={style.label}>Estimeret pris: </Text>
                        <TextInput style={[style.input, { maxWidth: Dimensions.get("window").width / 100 * 8, minWidth: Dimensions.get("window").width / 100 * 8, paddingHorizontal: 5 }]} placeholder={String(thisRecipe.estimatedPrice)} onChangeText={(ep) => {
                            editRecipeAtr.estimatedPrice = Number(ep)
                        }}>
                        </TextInput>
                        <Text style={style.field}>kr.</Text>
                    </View>
                </>
            }

            <View style={{ paddingVertical: 5 }}>
                {/* DisplayIngrediens komponent der samtidig giver CRUD operationer over opskriftens ingredienser*/}
                <DisplayIngrediens
                    items={thisRecipesIngrediens.data?.ingredients}
                    userId={userId}
                    recipeId={id}
                    navigation={navigation}
                />
            </View>

            <View style={{ paddingVertical: 5 }}></View>

            {/* Læser opskriftens fremgangsmetode samt giver author mulighed for at redigere */}
            {!isEditingDescription ?
                <View style={[style.card, { maxHeight: '100%' }]}>
                    <Text style={[style.label, { padding: 5, paddingBottom: 10 }]}>Fremgangsmetode:</Text>
                    {!isDescriptionExpanded &&
                        <>
                            <Text style={style.description}>{sliceDescription(thisRecipe.description)}</Text>
                            {/* Expand option */}
                            <TouchableOpacity
                                onPress={() => {
                                    setIsDescriptionExpanded(true)
                                }}
                            >
                                <MaterialIcons style={{ textAlign: 'center' }} name="expand-more" size={24} color="grey" />
                            </TouchableOpacity>
                        </>
                    }
                    {isDescriptionExpanded &&
                        <>
                            <Text style={style.description}>{thisRecipe.description}</Text>
                            {userId === session.id &&
                                <TouchableOpacity
                                onPress={() => {
                                    setIsEditingDesription(true)
                                }}
                                >
                                    <Text style={{ fontWeight: '600', color: 'blue', textAlign: 'center', fontStyle: 'italic', paddingVertical: 10 }}>Rediger fremgangsmåden</Text>
                                </TouchableOpacity>
                            }

                            <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                            {/* Unexpand option */}
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsDescriptionExpanded(false)
                                    }}
                                >
                                    <MaterialIcons style={{ textAlign: 'center' }} name="expand-less" size={24} color="grey" />
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                </View>

                :

                <View style={style.card}>
                    <Text style={[style.label, { padding: 5, paddingBottom: 10 }]}>Fremgangsmetode:</Text>
                    <TextInput
                        multiline={true}
                        placeholder={thisRecipe.description}
                        style={{ height: Dimensions.get("window").height / 100 * 7 }}
                        onChangeText={(des) => {
                            editRecipeAtr.description = des
                        }}
                    >

                    </TextInput>
                    <TouchableOpacity
                        onPress={() => {
                            editRecipe(editRecipeAtr);
                            setIsEditingDesription(false)
                        }}
                    >
                        <Text style={{ fontWeight: '600', color: 'blue', textAlign: 'center', fontStyle: 'italic', paddingVertical: 10 }}>Gem</Text>
                    </TouchableOpacity>
                </View>
            }

            <View style={{ paddingVertical: 5 }}></View>


            {/* Læser opskriftens reviews */}
            <Text style={[style.label, { padding: 5, paddingBottom: 10 }]}>Reviews:</Text>
            {
                listOfReviews.length > 0 ?
                    <View>
                        {/* Navigation til AllReviewsScreen */}
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("AllReviewsScreen", {
                                    reviews: listOfReviews
                                })
                            }}
                        >
                            <Text style={{ fontStyle: 'italic', fontWeight: '700', textAlign: 'right', paddingRight: 12, marginTop: -30 }}>Se alle</Text>
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
                                                        {/* Ekstern react native conmponent AirbnbRating bruges her til at lave en flot repræsentation af mine reviews. 
                                                        Hentet fra -> https://www.npmjs.com/package/react-native-ratings*/}
                                                        <AirbnbRating
                                                            reviews={["Dårlig", "Okay", "God", "Vild med den", "Elsker den!"]}
                                                            reviewSize={16}
                                                            reviewColor={'black'}
                                                            defaultRating={item.rating}
                                                            size={20}
                                                            isDisabled={true}
                                                            ratingContainerStyle={{ backgroundColor: 'rgb(247,247,255)', flexDirection: 'row', marginRight: 10, justifyContent: 'space-between' }}
                                                        />
                                                    </View>
                                                    <Text style={{ textAlign: 'justify', padding: 10, paddingLeft: 30 }}>{sliceDescription(item.content)}</Text>
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


            {/* Nyt review hvis man ikke er gæst*/}
            {session.token != 'guest' ?
                <>
                    <AuthPressable
                        text='Nyt review'
                        color='#86DB9D'
                        onPress={() => {
                            navigation.navigate("CreateReviewScreen", { id, userId, recipeName: name })
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

            <View style={{ paddingTop: 35 }}></View>
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
        maxHeight: Dimensions.get("window").height / 100 * 35
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
    saveEdit: {
        backgroundColor: '#86DB9D',
        padding: 3,
        borderRadius: 5
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5
    }

})

export default SelectedRecipeScreen
