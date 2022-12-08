import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { Pressable, Text, View, TextInput, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { AuthNavigationParameters } from '../../Types/Navigation_types'
import ViewContainer from "../../components/ViewContainer"
import Header from "../../components/Header"
import BackArrowContainer from "../../components/BackArrowContainer"
import { Ionicons } from '@expo/vector-icons';
import AuthPressable from "../../components/AuthPressable"
import { useLoginMutation } from "../../redux/services/UserAPI"
import { startSession } from '../../redux/slices/sessionSlice'


type LoginScreenNavigationProps = StackNavigationProp<AuthNavigationParameters, 'Login'>
type LoginScreenRouteProps = RouteProp<AuthNavigationParameters, 'Login'>

type LoginScreenProps = {
    navigation: LoginScreenNavigationProps
    route: LoginScreenRouteProps
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, route }) => {

    const session = useSelector((state: RootState) => state.session)
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();
    const [loginAtr, setLoginAtr] = useState<{ email: string, password: string }>({ email: "", password: "" })

    return (
        <ViewContainer>

            <BackArrowContainer>
                <Pressable onPress={() => {
                    navigation.pop();
                }}>
                    <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
                </Pressable>
            </BackArrowContainer>

            <Header text='Login' />

            <View style={{ paddingTop: 65 }}>
                <Text style={style.label}>Mail:</Text>
                <TextInput
                    autoComplete='email'
                    blurOnSubmit={true}
                    style={style.input}
                    onChangeText={(m) => {
                        loginAtr.email = m
                    }}></TextInput>
            </View>

            <View style={{ paddingTop: 5, paddingBottom: 20 }}>
                <Text style={style.label}>Kodeord:</Text>
                <TextInput
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