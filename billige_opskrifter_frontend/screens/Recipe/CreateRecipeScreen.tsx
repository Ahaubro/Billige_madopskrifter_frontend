import { StackNavigationProp } from '@react-navigation/stack' // Import af StackNavigationProp (Del af template projektet)
import { RouteProp } from '@react-navigation/native' // Import af RouteProp (Del af template projektet)
import React, { useRef, useState } from 'react' // Import af funktionelle komponenter fra react
import { Text, View, Pressable, TextInput, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native' // Import af react-native komponenter
import { useSelector } from 'react-redux' // Import af useSelector (Del af template projektet)
import { RootState } from '../../redux/store' // Import af RootState (Del af template projektet)
import { useCreateMutation } from '../../redux/services/RecipeAPI' // Import aaf min funktionelle komponent fra RecipeAPI
import { MyPageNavigationParameters } from '../../Types/Navigation_types' // IMport af min recipe navigations parameter type
import Header from '../../components/Header' // Import af min header komponent
import BackArrowContainer from '../../components/BackArrowContainer' // Import af back min back arrow container komponent
import { Ionicons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/
import AuthPressable from '../../components/AuthPressable' // import af min knap komponent
import { Picker } from '@react-native-picker/picker'; // Import af Picker komponent hentet fra -> https://www.npmjs.com/package/@react-native-picker/picker med yarn package manager
import ScrollViewContainer from '../../components/ScrollViewContainer' // import af min scroll view container komponent


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
                {/* Ekstern React native component Picker 
                hentet fra -> https://www.npmjs.com/package/@react-native-picker/picker */}
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
                    color='#86C3F7'
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
                        } else {
                            // Prøv evt. at opsæt så styling omkring input bliver rødt hvis feltet ikek er udfyldt
                            //console.log("Udfyld felterne")
                        }
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
