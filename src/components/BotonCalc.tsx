import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props{
    texto: string;
    color: string;
    textColor: string;
    ancho?: boolean;
    accion: (numeroTexto: string) => void;
}

export const BotonCalc = ({texto, color, textColor, ancho=false,accion}:Props) => {
  return (
    <TouchableOpacity
        onPress={() => accion(texto)}
    >
        <View style={[styles.boton,{backgroundColor:color}]}>
            <Text style={[styles.botonText,{color:textColor, width:(ancho) ? 160 : 70}]}>
                {texto}
            </Text>
        </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    boton:{
        // backgroundColor: '#9B9B9B',
        height:70,
        borderRadius:100,
        justifyContent:'center',
        marginHorizontal:10
    },
    botonText:{
        fontSize:30,
        padding:10,
        fontWeight:'300',
        textAlign:'center'
    },
});