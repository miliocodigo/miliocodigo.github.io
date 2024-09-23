var contador=0;

function Capturar() {
    // Imprimimos el arreglo de forma horizontal.
    var renglonIndice = document.getElementById("renglonIndice");
    var indice = renglonIndice.insertCell(-1).innerHTML = `[${contador}]`;

    var renglonDato = document.getElementById("renglonDato");
    var dato = renglonDato.insertCell(-1).innerHTML = document.getElementById("elementoInput").value;

    // Imprimimos el arreglo de forma vertical
    var tabla = document.getElementById("tablaVertical");
    var renglonVertical = tabla.insertRow(-1);

    var celda1 = renglonVertical.insertCell(0).innerHTML = `[${contador}]`;
    var celda2 = renglonVertical.insertCell(1).innerHTML = document.getElementById("elementoInput").value;

    if(contador>=9){
        document.getElementById("capturarBoton").disabled = true;
        document.getElementById("elementoInput").disabled = true;
        document.getElementById("generarBoton").disabled = false;
    } else {
        document.getElementById("contador").innerHTML = `Elemento [${++contador}]`;
    }
}

function Aleatorio(){
    document.getElementById("elementoInput").value = Math.floor(Math.random()*1000);
}

function Reiniciar() {
    contador=0;
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

function Calcular(){
    document.getElementById("tablaVertical2").innerHTML = "";
    document.getElementById("tablaVertical3").innerHTML = "";
    var celdas = document.getElementById("renglonDato").children;
    var menor = parseInt(celdas[0].innerHTML);
    var mayor = parseInt(celdas[0].innerHTML);
    var suma = 0;
    var promedio = 0;
    for (var i = 0; i < celdas.length; i++) {
        if(menor > parseInt(celdas[i].innerHTML)) {
            menor = parseInt(celdas[i].innerHTML);
        }
        if(mayor < parseInt(celdas[i].innerHTML)) {
            mayor = parseInt(celdas[i].innerHTML);
        }
        suma+=parseInt(celdas[i].innerHTML);
    }
    promedio=suma/celdas.length;

    // Bubble sort ascendente.
    for (var i = 0; i < celdas.length; i++) {
        for (var j = 0; j < (celdas.length-i-1); j++) {
            if (parseInt(celdas[j].innerHTML) > parseInt(celdas[j+1].innerHTML)) {
                var temporal = celdas[j].innerHTML;
                celdas[j].innerHTML = celdas[j+1].innerHTML;
                celdas[j+1].innerHTML = temporal;
            }
        }
    }

    // Se copia la tabla horizontal para imprimirlo descendente.
    document.getElementById("tablaHorizontal2").innerHTML = document.getElementById("tablaHorizontal").innerHTML;
    document.getElementById("tablaHorizontal3").rows[0].id = "renglonIndice2";
    document.getElementById("tablaHorizontal3").rows[1].id = "renglonDato2";
    celdas = document.getElementById("renglonDato3").children;

    // Bubble sort descendente.
    for (var i = 0; i < celdas.length; i++) {
        for (var j = 0; j < (celdas.length-i-1); j++) {
            if (parseInt(celdas[j].innerHTML) < parseInt(celdas[j+1].innerHTML)) {
                var temporal = celdas[j].innerHTML;
                celdas[j].innerHTML = celdas[j+1].innerHTML;
                celdas[j+1].innerHTML = temporal;
            }
        }
    }

    for (let i = 0; i < celdas.length; i++) {
        var fila = document.getElementById("tablaVertical2");
        var nuevaFila = fila.insertRow(-1);
        var valor = nuevaFila.insertCell(0).innerHTML = `[${i}]`;
        var valor = nuevaFila.insertCell(1).innerHTML = celdas[i].innerHTML;

        // Imprimir el arreglo vertical de forma descendente.
        var fila = document.getElementById("tablaVertical3");
        var nuevaFila = fila.insertRow(-1);
        var valor = nuevaFila.insertCell(0).innerHTML = `[${i}]`;
        var valor = nuevaFila.insertCell(1).innerHTML = celdas[i].innerHTML;
    }

    // Calcular la mediana.
    var mediana = (parseInt(celdas[4].innerHTML) + parseInt(celdas[5].innerHTML))/2;

    // Calcular la moda.
    var valores = document.getElementById("tablaHorizontal");
    var frecuencias = {};
    var moda = [];
    var maxFrecuencia = 0;

    for (let i = 0; i < valores.rows[1].cells.length; i++) {
        var elementoModa = valores.rows[1].cells[i].innerHTML;
        frecuencias[elementoModa] = (frecuencias[elementoModa] || 0) + 1;
        if (frecuencias[elementoModa] > maxFrecuencia) {
            maxFrecuencia = frecuencias[elementoModa];
            moda = [elementoModa];
        } else if (frecuencias[elementoModa] === maxFrecuencia) {
            if (!moda.includes(elementoModa)) {
                moda.push(elementoModa);
            }
        }
    }

    var modaFinal="";
    if (maxFrecuencia==1) {
        modaFinal = "No hay moda";
    } else {
        modaFinal = `Las modas son: ${moda.join(", ")}`;
    }

    // Imprimir resultados.
    document.getElementById("resultados").innerHTML = `El menor es: ${menor}
        <br> El mayor es: ${mayor}
        <br> La suma es: ${suma}
        <br> El promedio es: ${promedio}
        <br> La mediana es: ${mediana}
        <br> ${modaFinal}`;
}
