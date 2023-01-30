//Referencias
botonesNumeros = Array.from(document.getElementsByClassName("numero"));
botonesOperaciones = Array.from(document.getElementsByClassName("operacion"));
pantallaElement = document.getElementById("pantalla");
indicadorOperacionElement = document.getElementById("indicadorOperacion");

//Otras variables
let pantalla = 0;
let numeroAnterior;
let numeroReinicia = false;

//Eventos
botonesNumeros.forEach((boton) => {
  boton.addEventListener("click", (e) =>
    numeroClickado(parseInt(e.target.textContent))
  );
});
botonesOperaciones.forEach((boton) => {
  boton.addEventListener("click", (e) =>
    operacionClickeada(e.target.textContent)
  );
});
document.getElementById("clear").addEventListener("click", limpiarNumeroActual);
document.getElementById("allClear").addEventListener("click", reset);
document.addEventListener("keydown", (e) => {
  console.log(e.key);
  switch (e.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      numeroClickado(parseInt(e.key));
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      operacionClickeada(e.key);
      break;
    case "Enter":
      operacionClickeada("=");
      break;
		case "Escape":
		case "Backscape":
      limpiarNumeroActual()
      break;
  }
});

function numeroClickado(numero) {
  if (numeroReinicia) {
    pantalla = 0;
    numeroReinicia = false;
  }
  // console.log("Numero", numero);
  numeroPantalla = parseInt(pantalla);
  if (!isNaN(numeroPantalla)) {
    pantalla = parseInt(pantalla.toString() + numero);
    actualizarPantalla();
  }
  console.log(numeroPantalla);
}

function operacionClickeada(operacion) {
  // console.log("Operación",operacion)
  console.log(numeroAnterior, pantalla);
  if (!numeroAnterior) {
    if (pantalla === 0) return; //Apreté una operación sin tener número
    numeroAnterior = pantalla;
    indicadorOperacionElement.textContent = operacion;
    actualizarPantalla(0);
  } else {
    let resultado;
    switch (indicadorOperacionElement.textContent) {
      case "+":
        resultado = numeroAnterior + pantalla;
        break;
      case "-":
        resultado = numeroAnterior - pantalla;
        break;
      case "*":
        resultado = numeroAnterior * pantalla;
        break;
      case "/":
        if (pantalla === 0) {
          resultado = 0;
          break;
        }
        resultado = numeroAnterior / pantalla;
        break;
    }
    console.log(
      numeroAnterior,
      indicadorOperacionElement.textContent,
      pantalla,
      "=",
      resultado
    );
    numeroAnterior = resultado;
    actualizarPantalla(resultado);
    indicadorOperacionElement.textContent = operacion;
    if (operacion === "=") {
      indicadorOperacionElement.textContent = undefined;
      numeroAnterior = undefined;
    }
    numeroReinicia = true;
    console.log("Numero anterior", numeroAnterior);
  }
}

function actualizarPantalla(mensaje = pantalla) {
  pantalla = mensaje;
  pantallaElement.textContent = pantalla;
}

function limpiarNumeroActual() {
  actualizarPantalla(0);
}

function reset() {
  limpiarNumeroActual();
  (numeroAnterior = undefined),
    (indicadorOperacionElement.textContent = undefined);
}

//Ejecución
actualizarPantalla(0);
