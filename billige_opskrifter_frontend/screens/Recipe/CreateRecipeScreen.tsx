import React, { useEffect, useRef, useState } from 'react'
import { Text, View, Pressable, TextInput, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useCreateMutation } from '../../redux/services/RecipeAPI'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp, TabActions } from '@react-navigation/native'
import { MyPageNavigationParameters } from '../../Types/Navigation_types'
import Header from '../../components/Header'
import BackArrowContainer from '../../components/BackArrowContainer'
import { Ionicons } from '@expo/vector-icons';
import AuthPressable from '../../components/AuthPressable'
import { Picker } from '@react-native-picker/picker';
import ScrollViewContainer from '../../components/ScrollViewContainer'


type CreateRecipeScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'CreateRecipe'>
type CreateRecipeScreenRouteProps = RouteProp<MyPageNavigationParameters, 'CreateRecipe'>

type CreateRecipeScreenProps = {
    navigation: CreateRecipeScreenNavigationProps
    route: CreateRecipeScreenRouteProps
}

const CreateRecipeScreen: React.FC<CreateRecipeScreenProps> = ({ navigation, route }) => {

    const session = useSelector((state: RootState) => state.session)

    const [create] = useCreateMutation();
    const [createAtr] = useState<{ name: string, type: string, prepTime: number, numberOfPersons: number, estimatedPrice: number, userId: number }>
        ({ name: "", type: "", prepTime: 0, numberOfPersons: 0, estimatedPrice: 0, userId: session.id });

    const [selectedType, setSelectedType] = useState("");

    const nameRef = useRef<TextInput>(null);
    const timeRef = useRef<TextInput>(null);
    const personsRef = useRef<TextInput>(null);
    const priceRef = useRef<TextInput>(null);

    return (
        <ScrollViewContainer>

            <KeyboardAvoidingView
                behavior='position'
                style={{ height: Dimensions.get("window").height / 100 * 93 }}
            >

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

                <View style={{ paddingTop: 20, paddingBottom: 10 }}></View>


                <Text style={style.label}>Typen af opskrift:</Text>

                <Picker
                    style={{ height: Dimensions.get("window").height / 100 * 12 }}
                    itemStyle={{ height: Dimensions.get("window").height / 100 * 15, marginTop: -20, fontSize: 16 }}
                    selectedValue={selectedType}
                    onValueChange={(type: string) => {
                        if (type.length > 1) {
                            setSelectedType(type)
                            createAtr.type = type
                        }
                    }}
                >
                    <Picker.Item label='Morgenmad' value="Morgenmad" />
                    <Picker.Item label='Aftensmad' value="Aftensmad" />
                    <Picker.Item label='Dessert' value="Dessert" />
                    <Picker.Item label='Snacks' value="Snacks" />
                </Picker>


                <Text style={style.label}>Navnet på opskrfiten:</Text>

                <TextInput
                    blurOnSubmit={false}
                    ref={nameRef}
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                        timeRef.current?.focus();
                    }}
                    placeholder='Eks. Kylling i karry'
                    style={style.input}
                    onChangeText={(name) => {
                        createAtr.name = name
                    }}
                >
                </TextInput>

                <Text style={style.label}>Tilberedningstid i mintuer:</Text>
                <TextInput
                    blurOnSubmit={false}
                    keyboardType="number-pad"
                    ref={timeRef}
                    returnKeyType={"done"}
                    onSubmitEditing={() => {
                        personsRef.current?.focus();
                    }}
                    placeholder='Eks. 45'
                    style={style.input}
                    onChangeText={(tb) => {
                        createAtr.prepTime = Number(tb)
                    }}
                >
                </TextInput>

                <Text style={style.label}>Antal personer:</Text>
                <TextInput
                    blurOnSubmit={false}
                    ref={personsRef}
                    returnKeyType={"done"}
                    onSubmitEditing={() => {
                        priceRef.current?.focus()
                    }}
                    keyboardType="number-pad"
                    placeholder='Eks. 2'
                    style={style.input}
                    onChangeText={(persons) => {
                        createAtr.numberOfPersons = Number(persons)
                    }}
                >
                </TextInput>

                <Text style={style.label}>Ca. Pris i kr.:</Text>
                <TextInput
                    blurOnSubmit={false}
                    onFocus={() => { priceRef.current?.focus() }}
                    keyboardType='number-pad'
                    returnKeyType={'done'}
                    ref={priceRef}
                    placeholder='Eks. 100'
                    style={style.input}
                    onChangeText={(price) => {
                        createAtr.estimatedPrice = Number(price)
                    }}
                    onSubmitEditing={() => {
                        priceRef.current?.blur();
                    }}
                >
                </TextInput>

                <View style={{ paddingTop: 10 }}></View>


                <AuthPressable
                    text='Tilføj ingredienser'
                    color='#86DB9D'
                    onPress={() => {
                        let name: string = createAtr.name
                        if (createAtr.type == "") {
                            createAtr.type = "Morgenmad"
                        }
                        if (createAtr.name != "" && createAtr.estimatedPrice != 0 && createAtr.numberOfPersons != 0 && createAtr.prepTime != 0 && createAtr.type != "") {
                            create(createAtr).unwrap().then(res => {
                                console.log(res)
                            })
                            navigation.navigate("AddIngredient", { name });
                        } else { console.log("Udfyld felterne") }
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
        paddingTop: 10,
        paddingBottom: 5
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
