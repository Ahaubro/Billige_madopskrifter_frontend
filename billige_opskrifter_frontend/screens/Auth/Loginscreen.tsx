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

const LoginScreen: React.FC<LoginScreenProps> = ({navigation, route}) => {

  const session = useSelector((state: RootState) => state.session)
  const dispatch = useDispatch();

  const [login, { isLoading} ] = useLoginMutation();
  const [loginAtr, setLoginAtr] = useState<{email: string, password: string}>({email: "", password: ""})

  return (
    <ViewContainer>

        <BackArrowContainer>
            <Pressable onPress={ () => {
                navigation.pop();
            }}>
                <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
            </Pressable>
        </BackArrowContainer>

      <Header text='Login'/>

      <View style={{paddingTop: 100}}>
            <Text style={style.label}>Mail:</Text>
            <TextInput style={style.input} onChangeText={(m) => {
                loginAtr.email = m
            }}></TextInput>
      </View>

      <View style={{paddingTop: 5, paddingBottom: 5}}>
            <Text style={style.label}>Kodeord:</Text>
            <TextInput style={style.input} onChangeText={(p) => {
                loginAtr.password = p
            }}></TextInput>
      </View>

      <AuthPressable 
        text='Login'
        color='#7EDEF8'
        onPress={ () => {
            console.log({...loginAtr})
            if(loginAtr.email && loginAtr.password){
                login({...loginAtr}).unwrap().then( res => {
                    if (res.token != null){
                        dispatch(startSession({ token: res.token, id: res.id }))
                    }
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
        fontWeight: '600'
    },
    input:{
        borderRadius: 5,
        border: '1px solid black',
        height: 40
    }
})

export default LoginScreen