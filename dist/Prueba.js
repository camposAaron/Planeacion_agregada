"use strict";
class Prueba {
    constructor() { }
    static plusMin(numbers) {
        let positives = 0;
        let negatives = 0;
        let ceros = 0;
        let total = numbers.length;
        numbers.forEach((value) => {
            if (value > 0)
                ++positives;
            if (value < 0)
                ++negatives;
            if (value === 0)
                ++ceros;
        });
        console.log((positives / total).toFixed(6));
        console.log((negatives / total).toFixed(6));
        console.log((ceros / total).toFixed(6));
    }
    static miniMaxSum(numbers) {
        let suma = 0;
        if (numbers.length !== 5) {
            console.log('El arreglo debe contener 5 numeros');
            return;
        }
        //ordenar arreglo, numeros de menor a mayor
        numbers = numbers.sort(function (a, b) { return a - b; });
        for (let i = 0; i < numbers.length; i++) {
            //validar que el numero sea un entero positivo
            if (numbers[i] < 0 || numbers[i] % 1 !== 0) {
                console.log('Solo numeros enteros positivos');
                return;
            }
            suma += numbers[i];
        }
        /*
        resultado:
        suma minima = sumatotal - (el numero mayor = ultima posicion del arreglo)
        suma maxima = sumatotal - (el numero menor = primera posicion del arreglo)
        */
        console.log(suma - numbers[numbers.length - 1], suma - numbers[0]);
    }
    static timeConversion(time) {
        //cortar cadena con expresion regular 
        const timeArray = time.split(/[:\s]/);
        //castear la hora a entero;
        let hour = parseInt(timeArray[0]);
        //obtener el am o pm
        const am_pm = timeArray[timeArray.length - 1];
        if (am_pm === 'PM') {
            hour = ((hour + 11) % 24 + 1);
        }
        console.log(`${hour}:${timeArray[1]}:${timeArray[2]}`);
    }
}
//ejercicio 1
console.log('\n\nEJERCICIO #1\n');
Prueba.plusMin([1, 1, 0, -1, -1]);
//ejercicio 2
console.log('\n\nEJERCICIO #2\n');
Prueba.miniMaxSum([20, 15, 220, 10, 80]);
//ejercicio 3
console.log('\n\nEJERCICIO #3\n');
Prueba.timeConversion('07:05:45 PM');
