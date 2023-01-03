import { RouteProp } from '@react-navigation/native' // Import af RouteProp (Del af template projektet)
import { StackNavigationProp } from '@react-navigation/stack' // Import af StackNavigationProps (Del af template projektet)
import React, { useRef, useState } from 'react' // Import af funktionelle komponentere fra React
import { Pressable, Text, View, TextInput, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native' // Import af react-native komponenter
import { useDispatch } from 'react-redux' // Import af useDispatch (Del af template projeketet)
import { AuthNavigationParameters } from '../../Types/Navigation_types' // Import af AuthNavigstionParameters type
import ViewContainer from "../../components/ViewContainer" // Import af min view container komponent
import Header from "../../components/Header" // Import af min header komponent
import BackArrowContainer from "../../components/BackArrowContainer" // Import af min backarrow container komponent
import { Ionicons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/
import AuthPressable from "../../components/AuthPressable" // Import af min auth knap komponent
import { useLoginMutation } from "../../redux/services/UserAPI" // Import af min funktionelle komponent login
import { startSession } from '../../redux/slices/sessionSlice' // Import af startSession (Del af template projektet)

// Sætter navigations & route props
type LoginScreenNavigationProps = StackNavigationProp<AuthNavigationParameters, 'Login'>

type LoginScreenProps = {
    navigation: LoginScreenNavigationProps
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {

    //Bruges til at starte en session fopr brugeren
    const dispatch = useDispatch();

    //Login muatation and atr
    const [login] = useLoginMutation();
    const [loginAtr] = useState<{ email: string, password: string }>({ email: "", password: "" })

    //TextINput refs
    const mailRef = useRef<TextInput>(null);
    const pasRef = useRef<TextInput>(null);


    return (
        <ViewContainer>
            <KeyboardAvoidingView
                behavior='position'
                style={{ height: Dimensions.get("window").height / 100 * 60 }}
            >

                <BackArrowContainer>
                    <Pressable onPress={() => {
                        navigation.pop();
                    }}>
                        <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
                    </Pressable>
                </BackArrowContainer>

                <Header text='Login' />

                <View style={{ paddingTop: 50 }}>
                    <Text style={style.label}>Mail:</Text>
                    <TextInput
                        ref={mailRef}
                        returnKeyType='next'
                        blurOnSubmit={false}
                        onSubmitEditing={() => {
                            pasRef.current?.focus();
                        }}
                        style={style.input}
                        onChangeText={(m) => {
                            loginAtr.email = m
                        }}></TextInput>
                </View>

                <View style={{ paddingTop: 5, paddingBottom: 20 }}>
                    <Text style={style.label}>Kodeord:</Text>
                    <TextInput
                        ref={pasRef}
                        returnKeyType='next'
                        blurOnSubmit={true}
                        secureTextEntry={true}
                        style={style.input}
                        onChangeText={(p) => {
                            loginAtr.password = p
                        }}></TextInput>
                </View>

                <AuthPressable
                    text='Login'
                    color='#86C3F7'
                    onPress={() => {
                        console.log({ ...loginAtr })
                        if (loginAtr.email && loginAtr.password) {
                            login({ ...loginAtr }).unwrap().then(res => {
                                if (res.token != null) {
                                    dispatch(startSession({ token: res.token, id: res.id, fullName: res.fullName, email: res.email }))
                                }
                            }).catch(err => {
                                console.log(err)
                            })
                        }
                    }}
                />

            </KeyboardAvoidingView>
        </ViewContainer>
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
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderColor: 'rgb(242,242,242)',
    }
})

export default LoginScreen