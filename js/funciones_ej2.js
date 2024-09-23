var contador = 0;

function Capturar() {
    // imprimimos el arreglo de forma horizontal
    var renglonIndice = document.getElementById("renglonIndice");
    var indice = renglonIndice.insertCell(-1).innerHTML = `[${contador}]`;

    var renglonDato = document.getElementById("renglonDato");
    var dato = renglonDato.insertCell(-1).innerHTML = document.getElementById("elementoInput").value;

    // Imprimimos el arreglo de forma vertical 
    var tabla = document.getElementById("tablaVertical");
    var renglonVertical = tabla.insertRow(-1);

    var celda1 = renglonVertical.insertCell(0).innerHTML = `[${contador}]`;
    var celda2 = renglonVertical.insertCell(1).innerHTML = document.getElementById("elementoInput").value;

    if (contador >= 9) {
        document.getElementById("capturarBoton").disabled = true;
        document.getElementById("elementoInput").disabled = true;
        document.getElementById("generarBoton").disabled = false;
    } else {
        document.getElementById("contador").innerHTML = `Elemento [${++contador}]:`
        Aleatorio();
    }
}

function Aleatorio() {
    // Generar números aleatorios
    document.getElementById("elementoInput").value = Math.floor(Math.random()*1000);
}

function Reiniciar() {
    contador = 0;
    document.getElementById("capturarBoton").disabled = false;
    document.getElementById("elementoInput").disabled = false;
    document.getElementById("generarBoton").disabled = true;
    
    document.getElementById("renglonIndice").innerHTML = "";
    document.getElementById("renglonDato").innerHTML = "";
    document.getElementById("renglonIndice2").innerHTML = "";
    document.getElementById("renglonDato2").innerHTML = "";
    document.getElementById("renglonIndice3").innerHTML = "";
    document.getElementById("renglonDato3").innerHTML = "";

    document.getElementById("tablaVertical").innerHTML = "";
    document.getElementById("tablaVertical2").innerHTML = "";
    document.getElementById("tablaVertical3").innerHTML = "";
    document.getElementById("resultados").innerHTML = "";

    document.getElementById("contador").innerHTML = `Elemento [0]`;

    Aleatorio();
}

function Calcular() {
    document.getElementById("tablaVertical2").innerHTML = "";
    document.getElementById("tablaVertical3").innerHTML = "";
    
    var celdas = document.getElementById("renglonDato").children;
    var menor = parseInt(celdas[0].innerHTML);
    var mayor = parseInt(celdas[0].innerHTML);
    var suma = 0;
    var promedio = 0;
    for(var i = 0; i < celdas.length; i++) {
        if (menor > parseInt(celdas[i].innerHTML)) {
            menor = parseInt(celdas[i].innerHTML);
        }
        if (mayor < parseInt(celdas[i].innerHTML)) {
            mayor = parseInt(celdas[i].innerHTML);
        }
        suma += parseInt(celdas[i].innerHTML);
    }
    promedio = suma/celdas.length;

    // se copia la tabla horizontal para imprimirlo ascendente
    document.getElementById("tablaHorizontal2").innerHTML = document.getElementById("tablaHorizontal").innerHTML;
    document.getElementById("tablaHorizontal2").rows[0].id = "renglonIndice2";
    document.getElementById("tablaHorizontal2").rows[1].id = "renglonDato2";
    celdas = document.getElementById("renglonDato2").children;

    // bubble sort ascendente 
    for (var i = 0; i < celdas.length; i++) {
        for (var j = 0; j < celdas.length; j++) {
            if(parseInt(celdas[i].innerHTML) < parseInt(celdas[j].innerHTML)) {
                var temporal = celdas[i].innerHTML;
                celdas[i].innerHTML = celdas[j].innerHTML;
                celdas[j].innerHTML = temporal;
            }            
        }
    }

    // se copia la tabla horizontal para imprimirlo descendente 

    document.getElementById("tablaHorizontal3").innerHTML = document.getElementById("tablaHorizontal").innerHTML;
    document.getElementById("tablaHorizontal3").rows[0].id = "renglonIndice3";
    document.getElementById("tablaHorizontal3").rows[1].id = "renglonDato3";
    celdas = document.getElementById("renglonDato3").children;

    // bubble sort descendente 
    for (var i = 0; i < celdas.length; i++) {
        for (var j = 0; j < celdas.length; j++) {
            if(parseInt(celdas[i].innerHTML) > parseInt(celdas[j].innerHTML)) {
                var temporal = celdas[i].innerHTML;
                celdas[i].innerHTML = celdas[j].innerHTML;
                celdas[j].innerHTML = temporal;
            }            
        }
    }

    for (let i = 0; i < celdas.length; i++) {
        // imprimir arreglo vertical de forma ascendente 
        var fila = document.getElementById("tablaVertical2");
        var nuevaFila = fila.insertRow(-1);
        var valor = nuevaFila.insertCell(0).innerHTML = `[${i}]`;  
        var valor1 = nuevaFila.insertCell(1).innerHTML = celdas[9-i].innerHTML;
        
        // imprimir el arreglo de vertical de forma descendente
        fila = document.getElementById("tablaVertical3");
        nuevaFila = fila.insertRow(-1);
        valor = nuevaFila.insertCell(0).innerHTML = `[${i}]`;
        valor1 = nuevaFila.insertCell(1).innerHTML = celdas[i].innerHTML;
    }

    // calcular la mediana
    var mediana = (parseInt(celdas[4].innerHTML) + parseInt(celdas[5].innerHTML))/2;

    // calcular la moda 

    var valores = document.getElementById("tablaHorizontal");
    var frecuencias = {};
    var moda = [];
    var maximaFrecuencia = 0;

    for (let i = 0; i < valores.rows[1].cells.length; i++) {
        var elementoModa = valores.rows[1].cells[i].innerHTML;
        frecuencias[elementoModa] = (frecuencias[elementoModa] || 0) +1;
        if (frecuencias[elementoModa] > maximaFrecuencia) {
            maximaFrecuencia = frecuencias[elementoModa];
            moda = [elementoModa];
        } else if( frecuencias[elementoModa] === maximaFrecuencia){
            if (!moda.includes(elementoModa)) {
                moda.push(elementoModa);
            }
        }
    }

    var modaFinal = "";
    if (maximaFrecuencia==1) {
        modaFinal = "no hay moda";
    } else {
        modaFinal = `Las modas son ${moda.join(", ")}`;
    }

    // imprimir resultados
    document.getElementById("resultados").innerHTML = `El menor es: ${menor}
    <br> El mayor es: ${mayor} 
    <br> La suma es: ${suma}
    <br> El promedio es: ${promedio}
    <br> La mediana es: ${mediana}
    <br> ${modaFinal}`;
}

