import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BackArrowContainer from '../../components/BackArrowContainer'
import { RootState } from '../../redux/store'
import { MyPageNavigationParameters } from '../../Types/Navigation_types'
import { Ionicons } from '@expo/vector-icons';
import ViewContainer from "../../components/ViewContainer"
import Header from '../../components/Header'
import { useCreateAllergiMutation } from '../../redux/services/AllergiAPI'
import AuthPressable from '../../components/AuthPressable'


type AddAllergiScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'MyPage'>
type AddAllergiScreenRouteProps = RouteProp<MyPageNavigationParameters, 'MyPage'>

type AddAllergiScreenProps = {
    navigation: AddAllergiScreenNavigationProps
    route: AddAllergiScreenRouteProps
}

const AddAllergiScreen: React.FC<AddAllergiScreenProps> = ({ navigation, route }) => {

    const session = useSelector((state: RootState) => state.session)

    //Create allergie
    const [createAllergiAtr, setCreateAllergiAtr] = useState<{ userId: number, allergi: string }>({ userId: 0, allergi: '' });
    const [createAllergi] = useCreateAllergiMutation();

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
                text='Tilføj en allergi'
            />

            <View style={{ paddingTop: 10 }}>
                <Text style={{textAlign: 'justify', paddingTop: 5, fontSize: 14, paddingBottom: 15}}>Her kan du tilføje en allergi hvis du er allergisk, og herved se advarsler på opskrifter der skulle indeholde disse allergener!</Text>
                <Text style={{fontStyle: 'italic', fontWeight: '600'}}>Eks. Gluten, Laktose, Fisk, Skalddyr, osv. </Text>

                <TextInput
                    style={style.input}
                    onChangeText={(al) => {
                        setCreateAllergiAtr({ userId: session.id, allergi: al })
                    }}
                >
                </TextInput>

                <View style={{ paddingTop: 10 }}></View>

                <AuthPressable
                    text='Tilføj en allergi'
                    color='#86DB9D'
                    onPress={() => {
                        if(createAllergiAtr.allergi != ""){
                            createAllergi(createAllergiAtr).unwrap().then( res => {
                                navigation.pop();
                            })
                        }                  
                    }}
                />
            </View>



        </ViewContainer>
    )
}

export default AddAllergiScreen


const style = StyleSheet.create({
    input: {
        borderRadius: 8,
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderColor: 'rgb(242,242,242)',
    }
})