function Generar(){
    document.getElementById("cuadrado").innerHTML = "";

    var tabla = document.getElementById("cuadrado");
    var lados = parseInt(document.getElementById("lados").value);
    var celda = "", nuevaFila = "", r=0, c=0
    for(r=0; r<lados; r++){
        nuevaFila = tabla.insertRow(-1);
        celda = nuevaFila.insertCell(0);
        celda.innerHTML = "";
        celda.style.border = "none";
        for(c=0; c < lados; c++){
            celda = nuevaFila.insertCell(-1);
            var entrada = document.createElement("input");
            entrada.setAttribute("type","number");
            entrada.setAttribute("value", Aleatorio());
            entrada.setAttribute("required","required");
            entrada.setAttribute("style", "width:50px; color:purple");
            celda.appendChild(entrada);

        }
        var celda = nuevaFila.insertCell(-1);
        celda.innerHTML = "suma";
    }
    nuevaFila = tabla.insertRow(-1);
    for(c = 0; c < lados+2; c++){
        celda = nuevaFila.insertCell(-1);
        celda.innerHTML = "suma";   
    }
    tabla.rows[lados].cells[c-1].innerHTML = "diagonal";
    tabla.rows[lados].cells[0].innerHTML = "diagonal";
}
function Aleatorio(){
    return Math.floor(Math.random()*100);   
}
function EjemploMagico(){
    var tabla = document.getElementById("cuadrado");
    for (let r = 0; r< document.getElementById("lados").value; r++){
        for(let c = 1; c <= document.getElementById("lados").value; c++){
            tabla.rows[r].cells[c].querySelector('input').value = document.getElementById("lados").value;
        }
    }
    document.getElementById("verificar").innerHTML = "Si es un cuadrado magico!";
    document.getElementById("verificar").style = "color: lime";
}

function EjemploCuadrado(){
    var tabla = document.getElementById("cuadrado");
    var r = 0, c = 0;
    for (r = 0; r< document.getElementById("lados").value; r++){
        for(c = 1; c <= document.getElementById("lados").value; c++){
            tabla.rows[r].cells[c].querySelector('input').value = Aleatorio();
        }
    }
    tabla.rows[r-1].cells[c-1].querySelector('input').value = -1;
    document.getElementById("verificar").innerHTML = "No es cuadrado magico!";
    document.getElementById("verificar").style = "color: crimson";
}

function Calcular(){
    var tabla = document.getElementById("cuadrado");
    var lado = tabla.rows.length - 1;  // Excluir la fila de sumas
    var r = 0, c = 0, sumaFila = 0, sumaColumna = 0;
    var sumaDiagonal1 = 0, sumaDiagonal2 = 0;

    // Sumar filas y calcular suma de las diagonales
    for(r = 0; r < lado; r++){    
        sumaFila = 0;
        for(c = 1; c <= lado; c++){
            var valor = parseInt(tabla.rows[r].cells[c].querySelector('input').value);
            sumaFila += valor;

    // Suma para la diagonal principal (izquierda a derecha)
            if (r === c - 1) {
                sumaDiagonal1 += valor;
            }

    // Suma para la diagonal secundaria (derecha a izquierda)
            if (r + c === lado) {
                sumaDiagonal2 += valor;
            }
        }
        tabla.rows[r].cells[lado+1].innerHTML = sumaFila;  // Escribir la suma de la fila
    }

    // Sumar columnas
    for(c = 1; c <= lado; c++){
        sumaColumna = 0;
        for(r = 0; r < lado; r++){
            sumaColumna += parseInt(tabla.rows[r].cells[c].querySelector('input').value);
        }

        tabla.rows[lado].cells[c].innerHTML = sumaColumna;  // Escribir la suma de la columna
    }

// Mostrar las sumas de las diagonales
tabla.rows[lado].cells[lado+1].innerHTML = sumaDiagonal1;   // Diagonal principal
tabla.rows[lado].cells[0].innerHTML = sumaDiagonal2;      // Diagonal secundaria

if (sumaColumna === sumaDiagonal1 && sumaDiagonal1 === sumaDiagonal2 && sumaDiagonal2 === sumaFila) {
    document.getElementById("verificar").innerHTML = "¡Sí, es un cuadrado mágico!";
    document.getElementById("verificar").style.color = "lime";
} else {
    document.getElementById("verificar").innerHTML = "¡No es un cuadrado mágico!";
    document.getElementById("verificar").style.color = "crimson";
}

}
