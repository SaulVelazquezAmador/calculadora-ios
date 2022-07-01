import React, { useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { BotonCalc } from '../components/BotonCalc'
import { styles } from '../theme/appTheme'

enum Operaciones {
    suma, resta, multiplicacion, division
}

export const CalculadoraScreen = () => {

    const [numeroAnterior, setNumeroAnterior] = useState('0')
    const [numero, setNumero] = useState('0')
    const operacion = useRef<Operaciones>()

    const limpiar = () =>{
        setNumero('0')
        setNumeroAnterior('0')
    }

    const armarNumero = (numeroTexto: string) =>{
        //no aceptar doble punto
        if(numero.includes(".") && numeroTexto === ".") return

        if(numero.startsWith("0") || numero.startsWith("-0")){

            if(numeroTexto === ".")
                setNumero(numero + numeroTexto)

            else if(numeroTexto === '0' && numero.includes('.'))
                setNumero(numero + numeroTexto)

            else if(numeroTexto !== '0' && !numero.includes('.'))
                setNumero(numeroTexto)

            else if(numeroTexto === '0' && !numero.includes('.'))
                setNumero(numero)

            else
                setNumero(numero + numeroTexto)
        }
        else{
            setNumero(numero + numeroTexto)
        }
    }

    const positivoNegativo = () =>{
        if(numero.includes("-"))
            setNumero(numero.replace("-",""))
        else
            setNumero("-"+numero)
    }

    const btnDelete = () =>{

        if(numero.length === 1){
            setNumero('0')
            return
        }
        else if(numero.length === 2 && numero.includes('-')){
            setNumero('0')
            return
        }

        setNumero(numero.substring(0,numero.length - 1))
    }

    const actualizarNumeroAnterior = () =>{
        if(numero.endsWith('.'))
            setNumeroAnterior(numero.slice(0,-1))
        else
            setNumeroAnterior(numero)

        setNumero('0')
    }

    const botonDivirir = () =>{
        actualizarNumeroAnterior()
        operacion.current = Operaciones.division
    }

    const botonMultiplicar = () =>{
        actualizarNumeroAnterior()
        operacion.current = Operaciones.multiplicacion
    }

    const botonSumar = () =>{
        actualizarNumeroAnterior()
        operacion.current = Operaciones.suma
    }

    const botonRestar = () =>{
        actualizarNumeroAnterior()
        operacion.current = Operaciones.resta
    }

    const calcular = () =>{
        const num1 = Number(numero)
        const num2 = Number(numeroAnterior)

        switch (operacion.current) {
            case Operaciones.suma:
                setNumero(`${num1 + num2}`)
                break;

            case Operaciones.resta:
                setNumero(`${num2 - num1}`)
                break;
            
            case Operaciones.multiplicacion:
                setNumero(`${num1 * num2}`)
            break;

            case Operaciones.division:
                setNumero(`${num2 / num1}`)
            break;
            
            default:
                break;
        }
        setNumeroAnterior('0')
    }

  return (
    <View style={styles.calculadoraContainer}>
        {
            numeroAnterior !== '0' 
            &&
            <Text 
            style={styles.resultadoPequeno}
            >
                {numeroAnterior}
            </Text> 
        }

        <Text 
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.resultado}
        >
            {numero}
        </Text>

        <View style={styles.fila}>
            <BotonCalc texto='C' color='#9B9B9B' textColor='black' accion={limpiar}/>
            <BotonCalc texto='+/-' color='#9B9B9B'textColor='black' accion={positivoNegativo}/>
            <BotonCalc texto='Del' color='#9B9B9B'textColor='black' accion={btnDelete}/>
            <BotonCalc texto='/' color='#FF9427'textColor='white' accion={botonDivirir}/>
        </View>
        <View style={styles.fila}>
            <BotonCalc texto='7' color='#2D2D2D'textColor='white' accion={armarNumero}/>
            <BotonCalc texto='8' color='#2D2D2D'textColor='white' accion={armarNumero}/>
            <BotonCalc texto='9' color='#2D2D2D'textColor='white' accion={armarNumero}/>
            <BotonCalc texto='X' color='#FF9427'textColor='white' accion={botonMultiplicar}/>
        </View>
        <View style={styles.fila}>
            <BotonCalc texto='4' color='#2D2D2D'textColor='white' accion={armarNumero}/>
            <BotonCalc texto='5' color='#2D2D2D'textColor='white' accion={armarNumero}/>
            <BotonCalc texto='6' color='#2D2D2D'textColor='white' accion={armarNumero}/>
            <BotonCalc texto='-' color='#FF9427'textColor='white' accion={botonRestar}/>
        </View>
        <View style={styles.fila}>
            <BotonCalc texto='1' color='#2D2D2D'textColor='white' accion={armarNumero}/>
            <BotonCalc texto='2' color='#2D2D2D'textColor='white' accion={armarNumero}/>
            <BotonCalc texto='3' color='#2D2D2D'textColor='white' accion={armarNumero}/>
            <BotonCalc texto='+' color='#FF9427'textColor='white' accion={botonSumar}/>
        </View>
        <View style={styles.fila}>
            <BotonCalc texto='0' color='#2D2D2D'textColor='white' ancho accion={armarNumero}/>
            <BotonCalc texto='.' color='#2D2D2D'textColor='white' accion={armarNumero}/>
            <BotonCalc texto='=' color='#FF9427'textColor='white' accion={calcular}/>
        </View>
    </View>
  )
}
