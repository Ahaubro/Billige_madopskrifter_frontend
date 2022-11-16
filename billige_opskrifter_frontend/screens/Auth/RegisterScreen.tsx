import React, { useState } from 'react'
import { Pressable, Text, View, TextInput, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Header from "../../components/Header"
import ViewContainer from '../../components/ViewContainer'
import BackArrowContainer from "../../components/BackArrowContainer"
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { AuthNavigationParameters } from '../../Types/Navigation_types'
import { Ionicons } from '@expo/vector-icons';
import AuthPressable from '../../components/AuthPressable'
import {useRegisterMutation} from "../../redux/services/UserAPI"

type RegisterScreenNavigationProps = StackNavigationProp<AuthNavigationParameters, 'Register'>
type RegisterScreenRouteProps = RouteProp<AuthNavigationParameters, 'Register'>

type RegisterScreenProps = {
    navigation: RegisterScreenNavigationProps
    route: RegisterScreenRouteProps
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation, route }) => {

    const session = useSelector((state: RootState) => state.session)

    let pw1 = ""
    let pw2 = ""

    const [register] = useRegisterMutation();
    const [registerAtr, setRegisterStr] = useState<{fullName: string, email: string, password: string}>({fullName: "", email: "", password: ""});

    return (
        <ViewContainer>
            <BackArrowContainer>
                <Pressable onPress={() => {
                    navigation.pop();
                }}>
                    <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
                </Pressable>
            </BackArrowContainer>

            <Header text='Register' />

            <View style={{ paddingTop: 100 }}>
                <Text style={style.label}>Fulde navn:</Text>
                <TextInput style={style.input} onChangeText={ (fn) => {
                    registerAtr.fullName = fn
                }}></TextInput>
            </View>

            <View style={{ paddingVertical: 5 }}>
                <Text style={style.label}>Mail:</Text>
                <TextInput style={style.input} onChangeText={ (m) => {
                    registerAtr.email = m
                }}></TextInput>
            </View>

            <View style={{ paddingVertical: 5 }}>
                <Text style={style.label}>Kodeord:</Text>
                <TextInput style={style.input} onChangeText={ (p) => {
                    pw1 = p
                    registerAtr.password = p
                }}></TextInput>
            </View>

            <View style={{ paddingBottom: 20 }}>
                <Text style={style.label}>Bekræft kodeord:</Text>
                <TextInput style={style.input} onChangeText={ (p) => {
                    pw2 = p
                    registerAtr.password = p
                }}></TextInput>
            </View>

            <AuthPressable
                text='Opret nu'
                color='#86C3F7'
                onPress={() => {
                    if(registerAtr.fullName && registerAtr.email && registerAtr.password){
                        if(pw1 == pw2){
                            register(registerAtr).unwrap().then( res => {
                                //console.log(res.statusText)
                                if(res.statusText == "User Created"){
                                    navigation.navigate("Login")
                                }
                            })
                        }
                    }
                }}
            />

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
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderColor: 'rgb(240,240,240)',
    }
})


export default RegisterScreen