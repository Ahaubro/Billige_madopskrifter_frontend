import React from "react" // Import af React 
import { View, StyleSheet, Text } from "react-native" // Import af react native komponenter

// Props
type PriceComponentProps = {
    price: number
}

const PriceComponent: React.FC<PriceComponentProps> = ({ price }) => {

    // Hard coded array der definerer antallet af prikker på pris komponenten
    const numberOfDots: number[] = [1, 2, 3, 4, 5, 6]

    return (
        <View>
            <View>
                <Text style={{ fontWeight: '700', paddingVertical: 5, textAlign: 'center' }}>Pris indikator</Text>
            </View>
            <View style={style.dotsContainer}>
                {numberOfDots.map((dot, index) => {
                    return <View style={[style.dots,
                    index === 0 ? style.lightGreen : undefined,
                    index === 1 ? style.green : undefined,
                    index === 2 ? style.lightYellow : undefined,
                    index === 3 ? style.yellow : undefined,
                    index === 4 ? style.lightRed : undefined,
                    index === 5 ? style.red : undefined,
                    price <= 50 && index === 0 ? style.largeDot : undefined,
                    price >= 51 && price <= 75 && index === 1 ? style.largeDot : undefined,
                    price >= 76 && price <= 100 && index === 2 ? style.largeDot : undefined,
                    price >= 101 && price <= 125 && index === 3 ? style.largeDot : undefined,
                    price >= 126 && price <= 150 && index === 4 ? style.largeDot : undefined,
                    price >= 151 && index === 5 ? style.largeDot : undefined
                    ]} key={`${dot}_${index}`}>

                    </View>
                })}
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    dots: {
        borderBottomWidth: 1,
        width: 7,
        height: 15,
        marginHorizontal: 3,
        marginBottom: 5,
        borderRadius: 10
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lightGreen: {
        backgroundColor: '#28DC52',
        borderBottomColor: '#28DC52'
    },
    green: {
        backgroundColor: '#29AB09',
        borderBottomColor: '#29AB09'
    },
    lightYellow: {
        backgroundColor: '#EEE600',
        borderBottomColor: '#EEE600'
    },
    yellow: {
        backgroundColor: '#EEA600',
        borderBottomColor: '#EEA600'
    },
    lightRed: {
        backgroundColor: '#EF5060',
        borderBottomColor: '#EF5060'
    },
    red: {
        backgroundColor: 'red',
        borderBottomColor: 'red',
    },
    largeDot: {
        height: 25,
    }
})

export default PriceComponent;