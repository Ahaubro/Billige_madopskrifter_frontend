import React, { useState } from "react" // Import af funktionelle komponenter fra React
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, TextInput } from "react-native" // Import af react-native komponetner
import { Ionicons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/
import { useSelector } from "react-redux"; // Bruges til session (Del af template projektet)
import { RootState } from "../redux/store"; // Bruges til session (Del af template projektet)
import { useEditMutation, Ingredient, useDeleteIngredientMutation } from "../redux/services/IngredientAPI" // Import af mine funktionelle komponenter fra IngredientAPI
import { StackNavigationProp } from "@react-navigation/stack"; // Import af navigation (Del af template projekt)
import { MyPageNavigationParameters } from "../Types/Navigation_types"; // Import af mine navigations typer
import { MaterialIcons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/


// Props
type SelectedRecipeScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, "SelectedRecipeScreen">

type DisplayIngrediensProps = {
    items: Ingredient[] | undefined
    userId: number
    recipeId: number
    navigation: SelectedRecipeScreenNavigationProps
}

const DisplayIngrediens: React.FC<DisplayIngrediensProps> = ({ items, userId, recipeId, navigation }) => {

    // Session objekt
    const session = useSelector((state: RootState) => state.session)

    //Edit recipes ingredients
    const [editIngrAtr, setEditIngrAtr] = useState<{ id: number, name: string, type: string, measurementUnit: string, amount: number, alergene: string }>
        ({ id: 0, name: '', type: '', measurementUnit: '', amount: 0, alergene: '' })
    const [editIngredient] = useEditMutation();
    const [isEditing, setIsEditing] = useState(false)
    const [idForEdit, setIdForEdit] = useState(0);

    const [deleteIngredient] = useDeleteIngredientMutation();

    //Funktion der sætter de atributer der ikke er redigeret og laver selve edit kaldet
    function setIngrEditArt(item: Ingredient) {
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
    }

    //Laver expand mulighed, og laver et nyt array ud fra items, for at vise færre elementer når der ikke er expanded
    const [isExpanded, setIsExpanded] = useState(false);
    let itemsCopyForExpand: Ingredient[] | undefined = []
    items?.map((item) => {
        itemsCopyForExpand?.push(item)
    })

    //Der slettes så der kun er to ingredienser på listen
    while (itemsCopyForExpand.length > 2) {
        itemsCopyForExpand.pop();
    }

    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={style.card}>
                <Text style={[style.label, { padding: 5, paddingBottom: 10 }]}>Ingredienser:</Text>

                {isExpanded &&
                    <View>
                        {items != undefined &&
                            <>
                                {items.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <View style={{ paddingBottom: 5 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>

                                                    {/* Hvis isEditing er true og idForEdit er item.id kan man redigere i det enkelte objekt  */}
                                                    {isEditing === true && item.id === idForEdit ?
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
                                                                        setIngrEditArt(item);
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
                                                                        onPress={() => {
                                                                            setIdForEdit(item.id)
                                                                            setIsEditing(true)
                                                                        }}
                                                                    >
                                                                        <Text style={{ color: 'white', textAlign: 'center' }}> <Ionicons name="ios-pencil-outline" size={18} color="blue" /></Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity
                                                                        onPress={() => {
                                                                            deleteIngredient({ id: item.id })
                                                                        }}
                                                                    >
                                                                        <Text style={{ color: 'white', textAlign: 'center' }}> <Ionicons name="trash-outline" size={18} color="#FF9C9C" /></Text>
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
                        }


                        {/* Man kan tilføje ingredienser til opskriften hvis man er forfatter*/}
                        {userId === session.id &&
                            <View style={{ paddingVertical: 5 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("AddExtraIngredientAfterCreationScreen", {
                                            recipeId: recipeId
                                        })
                                    }}
                                >
                                    <Text style={{ fontWeight: '600', color: 'blue', textAlign: 'center', fontStyle: 'italic', paddingVertical: 10 }}>Tilføj flere ingredienser</Text>
                                </TouchableOpacity>

                            </View>
                        }

                        <View style={{ paddingVertical: 5 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsExpanded(false)
                                }}
                            >
                                <MaterialIcons style={{ textAlign: 'center' }} name="expand-less" size={24} color="grey" />
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                {!isExpanded &&
                    <>
                        {items != undefined &&
                            <>
                                {itemsCopyForExpand.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <View style={{ paddingBottom: 5 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                                    <Text style={{ paddingLeft: 30 }}>{index + 1}: {item.name}</Text>
                                                    <Text> {item.amount}</Text>
                                                    <Text>{item.measurementUnit}</Text>
                                                    <Text style={{ paddingRight: 20 }}> ({item.type}) </Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })}

                                <View style={{ paddingVertical: 5 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setIsExpanded(true)
                                        }}
                                    >
                                        <MaterialIcons style={{ textAlign: 'center' }} name="expand-more" size={24} color="grey" />
                                    </TouchableOpacity>
                                </View>

                            </>
                        }
                    </>
                }


            </View>
        </View>
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
    }
})

export default DisplayIngrediens;