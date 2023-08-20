/** Valores iniciales de enemigos y personaje jugable */
    enemigo = {
        ataque: 30,
        defensa: 20,
        vida: 300,
        enfriamientoBase: 12000,
        probCritico: 3,
        critico: 0.4
    }
    personaje = {
        nivel: 1,
        ataque: 1,
        defensa: 1,
        vida: 100,
        nivelesDisponibles: 15,
        enfriamientoBase: 5000
    }

/**
 * Variables globales de HTML
 */
// Contenedores
    let contenedorBody;
    let contenedorPantallaCarga;
    let contenedorSeleccionEnemigo;
    let contenedorSeleccionEnemigoEncendido = false;
    let contenedorEstadisticasPersonaje;
    let contenedorEscenaInicial;
    let contenedorEstadisticasPersonajeEncendido = true;
    let contenedorBotonSeleccionEnemigo;
    let modal;
    let contenedorCombate;
    let ContenedorbtnAtaqueBasicoJugador;
// Botones
    let botonEscenaEstadSelectEnemigo;
    let botonAumentoAtaque;
    let botonAumentoDefensa;
    let botonAumentoVida;
    let botonRestrablecerEncedido = false;
    let botonRestablecer;
    let botonSeleccionaEnemigoEncendido = false;
    let botonSeleccionaEnemigo;   
    let botonNuevoSeleccion; 
    let btnUpAtaque; 
    let btnUpDefensa;
    let btnUpVida;
    let btnCambiarEnemigo;
    let btnIniciarCombate;
    let btnAtaqueBasicoJugador;
// Texto
    let barraCarga;
// Auxiliares
    let aumentoExtra = 0;
    let cargaLista = false;
    let nivelPersonajeVisual;
    let enemigoSeleccionado;
    let enemigoSeleccVisual;
    let scriptTag;
    let vidaJugadorBarra;
    let freno;
// Combate
    let enemigoEnfriamiento;
    let enemigoAtaqueListo = false;
    let ataqueEnemigo;
    let personajeVidaActual;
    let enemigoVidaActual;
    let golpeCriticoEnemigo;
    let dañoAjustadoEnemigo;
    let dañoEnemigo;
    let dañoJugador;
    let vidaPersonajeBase;
    let combateActivo = false;
//Elementos graficos
    let barraVidaPersonaje;
    let barraVidaEnemigo;
    let inidicadorDañoPersonaje;

/**
 *  Seleccion de elementos
 */ 
contenedorPantallaCarga = document.querySelector("#pantallaCarga")
contenedorSeleccionEnemigo = document.querySelector("#seleccionEnemigo");
contenedorEstadisticasPersonaje = document.querySelector("#estadisticasPersonaje");
barraCarga = document.querySelector("#barraCarga");
iconoCarga = document.querySelector("#iconoCarga");
contenedorEscenaPrincipal = document.querySelector("#escenaPrincipal");
contenedorBody = document.querySelector("body");
botonAumentoAtaque = document.getElementById("aumentoAtaque");
botonAumentoDefensa = document.getElementById("aumentoDefensa");
botonAumentoVida = document.getElementById("aumentoVida");
btnUpAtaque = document.getElementById("cajaBtnAumentoAtaque");
btnUpDefensa = document.getElementById("cajaBtnAumentoDefensa");
btnUpVida = document.getElementById("cajaBtnAumentoVida");
modal = document.getElementById("modal");
btnCambiarEnemigo = document.getElementById("cambiarEleccionEnemigo");
btnIniciarCombate = document.getElementById("iniciarCombate");
contenedorCombate = document.getElementById("escenaCombate");
barraVidaPersonaje = document.getElementById("barraVidaMovilPersonaje");
barraVidaEnemigo = document.getElementById("barraVidaMovil");
scriptTag = document.querySelector("script");
vidaJugadorBarra = document.querySelector("#indicadorVidaJugador");
vidaEnemigoBarra = document.querySelector("#indicadorVidaEnemigo");
ContenedorbtnAtaqueBasicoJugador = document.getElementById("btnAtaqueJugador");
btnAtaqueBasicoJugador = document.getElementById("btnAtaque");
indicadorDañoPersonaje = document.getElementById("indic2");
/**
 * Eventos de click
 */
botonAumentoAtaque.addEventListener("click", sumarAtaquePersonaje);
botonAumentoDefensa.addEventListener("click", sumarDefensaPersonaje);
botonAumentoVida.addEventListener("click", sumarVidaPersonaje);
document.addEventListener("click",seleccionEnemigo);
btnCambiarEnemigo.addEventListener("click",cambiarEnemigo);
btnIniciarCombate.addEventListener("click",prepararEscenaCombate);
btnAtaqueBasicoJugador.addEventListener("click", ataqueBasicoJugador);

/* Cambio de escenas */
    // Se toman todos los contenedores o escenas principales; Se encapsulan en variables y se eliminan para ser llamadas cuando se necesite.
    function eliminacionInicial(){
        mostrarEstadisticasIniciales();
        contenedorEstadisticasPersonaje.remove();
        contenedorSeleccionEnemigo.remove();
        contenedorEscenaPrincipal.remove();
        contenedorCombate.remove();
        modal.remove();
    }
    // Eliminacion de la pantalla de carga y se muestra la seleccion de estadisticas
    function cambioEscenaEstadisticas(){
        contenedorPantallaCarga.remove();
        contenedorBody.insertBefore(contenedorEscenaPrincipal, scriptTag)
        contenedorEscenaPrincipal.appendChild(contenedorEstadisticasPersonaje)
    }
    // Se muestran la seleccion de enemigos y se elimina el contenedor de las estadisticas
    function cambioSeleccionEnemigos(){
        contenedorEstadisticasPersonaje.remove();
        contenedorEstadisticasPersonajeEncendido = false;
        contenedorSeleccionEnemigoEncendido = true;
        contenedorEscenaPrincipal.appendChild(contenedorSeleccionEnemigo)
    }
    // Se cambia a la escena de combate
    function prepararEscenaCombate(){
        modal.remove();
        contenedorEscenaPrincipal.remove();
        contenedorBody.insertBefore(contenedorCombate, scriptTag);
        document.getElementById("vidaPer").innerHTML = personaje.vida;
        document.getElementById("ataquePer").innerHTML = personaje.ataque;
        document.getElementById("defensaPer").innerHTML = personaje.defensa;
        document.getElementById("vidaEne").innerHTML = enemigo.vida;
        document.getElementById("ataqueEne").innerHTML = enemigo.ataque;
        document.getElementById("defensaEne").innerHTML = enemigo.defensa;
        vidaPersonajeBase = personaje.vida;
        enemigoVidaActual = enemigo.vida;
        vidaJugadorBarra.innerHTML = personaje.vida + " / " + vidaPersonajeBase;
        vidaEnemigoBarra.innerHTML = enemigoVidaActual + " / " + enemigo.vida;
        combateActivo = true;
        combateEnemigo();
        combateJugador();
    }

/**
 * Numero random 
 * Devuelve un numero random unico entre 1 y un numero maximo
 * @param {number} max - Numero maximo random que queremos obtener.
 */
function numeroRandom (max){
    return Math.floor(Math.random()* max)+1
}

/**
 * Numero random rango
 * Devuelve un numero random en un rango, indicandole un parametro de minimo y maximo.
 * @param {number} max - Numero maximo random que queremos obtener.
 * @param {number} min - Numero minimo random que queremos obtener.
 */
function numeroRamdomRango (max, min){
    return Math.floor(Math.random()*(max-min)+min)
}

/**
 * Numero random exacto 
 * Devuelve un numero random en un rango, indicandole un parametro de minimo y maximo; Y el multiplo del cual este debe ser exacto.
 * @param {number} max - Numero maximo random que queremos obtener.
 * @param {number} min - Numero minimo random que queremos obtener.
 * @param {number} multiplo - Numero del cual queremos que el numero random sea multiplo
 */
function numeroRamdomRangoExacto (max, min, multiplo){
    let numero = Math.floor(Math.random()*(max-min)+min)

    return Math.ceil(numero/multiplo)*multiplo;
}

/* Retardo */
    function duerme(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
/* Retardo */

/* Carga falsa */
    async function cargaFalsa1(tiempo,multiplo){
        cargaLista = false;
        barraCarga.innerHTML = "Cargando recursos del juego";
        await duerme(numeroRamdomRangoExacto(1,tiempo,multiplo));
        barraCarga.innerHTML = "Seguimos cargando recursos";
        await duerme(numeroRamdomRangoExacto(1,tiempo,multiplo));
        barraCarga.innerHTML = "Falta poco";
        await duerme(numeroRamdomRangoExacto(1,tiempo,multiplo));
        barraCarga.innerHTML = "Sabes que no estamos cargando nada ¿verdad?";
        await duerme(numeroRamdomRangoExacto(1,tiempo,multiplo));
        barraCarga.innerHTML = "Ya pues dejemos la tonteria, ahora si";
        await duerme(numeroRamdomRangoExacto(1,tiempo,multiplo));
        iconoCarga.setAttribute("src","src/img/carga.gif")
        barraCarga.setAttribute("class","salida")
        await duerme(2000);
        cargaLista = true;
        return cargaLista;
    }
/* Carga falsa */

/* Se muestras las estadisticas iniciales del personaje jugable */
    function mostrarEstadisticasIniciales (){
        document.getElementById("nivelPersonaje").innerHTML = personaje.nivel;
        document.getElementById("ataquePersonaje").innerHTML = personaje.ataque;
        document.getElementById("defensaPersonaje").innerHTML = personaje.defensa;
        document.getElementById("vidaPersonaje").innerHTML = personaje.vida;
        document.getElementById("nivelesDisponibles").innerHTML = "+" + personaje.nivelesDisponibles;
    }
/* Se muestras las estadisticas iniciales del personaje jugable */

/* Ajusta los niveles del personaje jugable - aumentando el nivel principal y disminuyendo los niveles disponibles */
    function ajustesNiveles (){
        personaje.nivel = personaje.nivel + 1
        personaje.nivelesDisponibles = personaje.nivelesDisponibles - 1
    }
/* Ajusta los niveles del personaje jugable - aumentando el nivel principal y disminuyendo los niveles disponibles */

/* Muestra los niveles adquiridos y los disponibles cada vez que estos sufren un cambio */
    function dibujadoDeNiveles (){
        document.getElementById("nivelPersonaje").innerHTML = personaje.nivel;
        document.getElementById("nivelesDisponibles").innerHTML = "+" + personaje.nivelesDisponibles;
    }
/* Muestra los niveles adquiridos y los disponibles cada vez que estos sufren un cambio */

/* Calcula si el nivel del persona es multiplo del parametro pasado para ver si el personaje recibira un aumento extra de estadisticas */
    function multiplo (divisor, nivel){
        if (nivel % divisor == 0){        
            aumentoExtra = aumentoExtra + numeroRandom(4)
            return true
        }else{
            return false
        }
    }
/* Calcula si el nivel del persona es multiplo del parametro pasado para ver si el personaje recibira un aumento extra de estadisticas */

/*  Eventos de click - aumentan los atributos del personaje jugable */
    /* Ataque */
        function aumentoAtaque (valorCreciente){
            personaje.ataque = personaje.ataque + valorCreciente  
            ajustesNiveles();
            dibujadoDeNiveles();
            document.getElementById("ataquePersonaje").innerHTML = personaje.ataque;   
        }
        function sumarAtaquePersonaje(){
            let aumento = 0;
            if(personaje.nivelesDisponibles > 0){
                if(multiplo(4, personaje.nivel)){
                    aumento = numeroRamdomRango((5+aumentoExtra),(1+aumentoExtra))
                    aumentoAtaque(aumento);
                    disparadorDeEventos();
                }else{
                    aumento = numeroRamdomRango(5,1)
                    aumentoAtaque(aumento);
                    disparadorDeEventos();
                }
            }
        }
    /* Ataque */
    /* Defensa */
        function aumentoDefensa (valorCreciente){
            personaje.defensa = personaje.defensa + valorCreciente
            ajustesNiveles();
            dibujadoDeNiveles();
            document.getElementById("defensaPersonaje").innerHTML = personaje.defensa;
        }
        function sumarDefensaPersonaje() {
            let aumento = 0;
            if(personaje.nivelesDisponibles > 0){
                if(multiplo(4, personaje.nivel)){
                    aumento = numeroRamdomRango((4+aumentoExtra),(1+aumentoExtra))
                    aumentoDefensa(aumento);
                    disparadorDeEventos()
                }else{
                    aumento = numeroRamdomRango(5,3)
                    aumentoDefensa(aumento);
                    disparadorDeEventos()
                }
            }      
        }
    /* Defensa */
    /* Vida */
        function aumentoVida (valorCreciente){
            personaje.vida = personaje.vida + valorCreciente
            ajustesNiveles();
            dibujadoDeNiveles();
            document.getElementById("vidaPersonaje").innerHTML = personaje.vida;
        }
        function sumarVidaPersonaje (){
            let aumento = 0;
            if(personaje.nivelesDisponibles > 0){
                if(multiplo(3, personaje.nivel)){
                    aumento = numeroRamdomRango((50+aumentoExtra),(25+aumentoExtra))
                    aumentoVida(aumento);
                    disparadorDeEventos()
                }else{
                    aumento = numeroRamdomRango(40,25)
                    aumentoVida(aumento);
                    disparadorDeEventos()
                }
            }      
        }
    /* Vida */
/*  Eventos de click - aumentan los atributos del personaje jugable */

/* Se agrega el boton para restablecer las estadisticas bases del personaje */
    function añadirBotonRestablecer (){
        if(personaje.nivelesDisponibles > 1 && botonRestrablecerEncedido == false){
            
            let contenedorBoton = document.querySelector(".botonRestablecer")
            let botonNuevo = document.createElement("button")

            botonNuevo.setAttribute("id", "restablecer")
            botonNuevo.innerHTML = "Restablecer"
            contenedorBoton.appendChild(botonNuevo)

            botonRestrablecerEncedido = true;

            botonRestablecer = document.getElementById("restablecer");
            botonRestablecer.addEventListener("click", restablecerValores)
        }
    }
/* Se agrega el boton para restablecer las estadisticas bases del personaje */

/* Una vez que el jugador se quede sin niveles disponibles para subir se eliminan los botones de aumento */
    function quitarBtnAumento (){
        if(personaje.nivelesDisponibles == 0){
            botonAumentoAtaque.remove();
            botonAumentoDefensa.remove();
            botonAumentoVida.remove();
            añadirBotonSeleccionaEnemigo();
        }    
    }
/* Una vez que el jugador se quede sin niveles disponibles para subir se eliminan los botones de aumento */

/* Funcion auxiliar para disparar dos eventos en simultaneo; Agregar boton de restablecer estadisticas y quitar botones de aumento de nivel */
    function disparadorDeEventos(){
        añadirBotonRestablecer()
        quitarBtnAumento()
    }
/* Funcion auxiliar para disparar dos eventos en simultaneo; Agregar boton de restablecer estadisticas y quitar botones de aumento de nivel */

/* Se añade el boton para elegir enemigo una vez que se hayan gastado todos lo niveles disponibles */
    function añadirBotonSeleccionaEnemigo (){
        if(personaje.nivelesDisponibles == 0 && botonSeleccionaEnemigoEncendido == false){
            contenedorBotonSeleccionEnemigo = document.querySelector(".botonSeleccionaEnemigo")
            botonNuevoSeleccion = document.createElement("button")

            botonNuevoSeleccion.setAttribute("id", "seleccionaEnemigo")
            botonNuevoSeleccion.innerHTML = "Seleccion de enemigo"
            contenedorBotonSeleccionEnemigo.appendChild(botonNuevoSeleccion)

            botonSeleccionaEnemigoEncendido = true;

            botonSeleccionaEnemigo = document.getElementById("seleccionaEnemigo");
            botonSeleccionaEnemigo.addEventListener("click", cambioSeleccionEnemigos)
        }
    }
/* Se añade el boton para elegir enemigo una vez que se hayan gastado todos lo niveles disponibles */

/**
 * Restablecimiento de los valores iniciales en la seleccion de estadisticas
 * Todos los valores involucrados vuelven a sus valores base
 */
function restablecerValores(){
    personaje.ataque = 1
    personaje.defensa = 1
    personaje.nivel = 1
    personaje.vida = 100
    personaje.nivelesDisponibles = 15

    aumentoExtra = 0;

    botonRestablecer.remove();
    if (botonSeleccionaEnemigoEncendido == true){
        botonSeleccionaEnemigo.remove();
        botonSeleccionaEnemigoEncendido = false;
    }   

    botonRestrablecerEncedido = false;
    
    mostrarEstadisticasIniciales();
    añadirBtnAumento ();
}

/**
 * Se añaden los botones de aumento de estadisticas
 */
function añadirBtnAumento (){
    btnUpAtaque.appendChild(botonAumentoAtaque);
    btnUpDefensa.appendChild(botonAumentoDefensa);
    btnUpVida.appendChild(botonAumentoVida);
}  

/**
 * Deteccion de seleccion de enemigo
 * La funcion toma el evento click y lo evalua para saber que fue lo que se clickeo.
 * Y asi poder determinar que ememigo fue elegido.
 * @param {*} e - Elemento clickeado en x momento
 */
function seleccionEnemigo (e){
    if (contenedorSeleccionEnemigoEncendido){
        enemigoSeleccionado = e.target;
        if (enemigoSeleccionado.getAttribute("id") == "hechicero" || enemigoSeleccionado.getAttribute("id") == "guerrero" || enemigoSeleccionado.getAttribute("id") == "ninja"){
            enemigoSeleccionado = enemigoSeleccionado.getAttribute("id");
            contenedorBody.appendChild(modal);
            document.getElementById("enemigoSelecc").innerHTML = enemigoSeleccionado;
            document.getElementById("imagenEnemigo").setAttribute("src","src/img/"+enemigoSeleccionado+".png");
        }else{ 
            if(enemigoSeleccionado.getAttribute("alt") == "hechicero" || enemigoSeleccionado.getAttribute("alt") == "guerrero" || enemigoSeleccionado.getAttribute("alt") == "ninja"){
                enemigoSeleccionado = enemigoSeleccionado.getAttribute("alt");
                contenedorBody.appendChild(modal);
                document.getElementById("enemigoSelec").innerHTML = enemigoSeleccionado;
                document.getElementById("imagenEnemigo").setAttribute("src","src/img/"+enemigoSeleccionado+".png");
            }else{
                enemigoSeleccionado = null;
            }
        }
    }   
}

/**
 * Cambiar enemigo seleccionado
 * Esta funcion cierra el modal de seleccion y vacia la seleccion previa
 */ 
function cambiarEnemigo(){
    modal.remove();
    enemigoSeleccionado = null;
}

/* */
async function combateEnemigo(){
    while (personaje.vida > 1 && enemigoVidaActual > 1){
        await ataqueEnemigoBaseCalculo();
        if(combateActivo){
            if (ataqueCritico(enemigo.probCritico)){
                ataqueEnemigoCritico();
                pintadoBarraPersonaje()
            }else{
                ataqueEnemigoBase();
                pintadoBarraPersonaje()
            }
        }else{
            break;
        }
        
    }
    console.log("termino el combate")
    btnAtaqueBasicoJugador.setAttribute("disabled", "");
}

/** 
 * Calculo de ataque enemigo base
 * Primero debe cumplirse el enfriamiento del enmigo para luego calcular el daño a hacer
 */
async function ataqueEnemigoBaseCalculo(){
    await duerme(enemigo.enfriamientoBase);
    ataqueEnemigo = enemigo.ataque - personaje.defensa;
}

/**
 * Verificacion de ataque critico por parte del enemigo
 * @param {number} critico - probabilidad de que se de un golpe critico
 * @returns {boolean} retornara true si fue un golpe critico y false si no lo fue.
 */
function ataqueCritico(critico){
    let probCritico = numeroRamdomRango (10, 1);
    if(probCritico <= critico){
        console.log("fue critico")
        if (personaje.defensa > 0){
            personaje.defensa = personaje.defensa - 1
            document.getElementById("defensaPer").innerHTML = personaje.defensa;
        } 
        return golpeCriticoEnemigo = true;
    }else{
        return golpeCriticoEnemigo = false;
    }
}

/**
 * Calculo de daño critico
 * Es caso de que el ataque sea critico se calcula el mismo, 
 * con el aumento critico del enemigo, para posteriormente,
 * verificar dicho daño para que no sea un daño negativo.
 */
function ataqueEnemigoCritico(){
    dañoEnemigo = (ataqueEnemigo +(Math.floor(ataqueEnemigo * enemigo.critico)))
    dañoBaseVerficacion(dañoEnemigo); 
}

/**
 * Ejecucion de un golpe basico
 * Es caso de que el ataque no sea critico,
 * se iguala el daño al ataque base calculado previamente,
 * y se verifica que dicho daño no sea negativo.
 */
function ataqueEnemigoBase(){
    dañoEnemigo = ataqueEnemigo;
    dañoBaseVerficacion(dañoEnemigo); 
}

/**
 * Verificacion del daño base
 * Si el daño base a realizar es menor a cero este se iguala a 1
 * @param {number} ataque - Daño obtenido de la resta del ataque base del enemigo menos la defensa del jugador.
 */
function dañoBaseVerficacion(ataque){
    if (ataque <= 0){
        //dañoAjustadoEnemigo = enemigo.ataque/10
        dañoAjustadoEnemigo = 1;
        calculoDeDañoPersonajeRecibido(dañoAjustadoEnemigo);
    }else{
        calculoDeDañoPersonajeRecibido(ataque);
    }
}

/**
 * Calculo final de daño a recibir
 * Se recibe el daño final y se le resta a la vida del jugador.
 * @param {number}  dañoFinal - Es el valor final en cuanto a daño que recibira el jugador.
 */
function calculoDeDañoPersonajeRecibido(dañoFinal){
    personajeVidaActual = personaje.vida - dañoFinal;
    if (personajeVidaActual < 0){
        personajeVidaActual = 0;
        personaje.vida = 0;
        document.getElementById("vidaPer").innerHTML = personaje.vida;
    }else{
        personaje.vida = personajeVidaActual;
        document.getElementById("vidaPer").innerHTML = personaje.vida;
    }
}

/**
 * Pintado de barra del personaje
 * Dependiendo de los valores actuales de la vida del personaje, la funcion va disminuyendo
 * el width de la barra de vida
 */
function pintadoBarraPersonaje(){
    let valorBarra = (personajeVidaActual*100)/vidaPersonajeBase;
    barraVidaPersonaje.style.width = valorBarra+"%";
    vidaJugadorBarra.innerHTML = personaje.vida + "/" + vidaPersonajeBase;
    pintadoDañoPersonaje();
}

/**
 * Pintado de daño recibido por el jugador
 */
function pintadoDañoPersonaje(){
    indicadorDañoPersonaje.className = "indic2";
    if(dañoEnemigo > 0){
        indicadorDañoPersonaje.innerHTML = `-${dañoEnemigo}`;
    }else{
        indicadorDañoPersonaje.innerHTML = `-${dañoAjustadoEnemigo}`; 
    }
    setTimeout(function(){
        indicadorDañoPersonaje.classList.remove("indic2");
    },3000)
}

/**
 * 
 */
async function ataqueBasicoJugador(){
    dañoJugador = personaje.ataque - enemigo.defensa;
    if(dañoJugador<0){
        dañoJugador = 1;
    }
    enemigoVidaActual = enemigoVidaActual - dañoJugador;
    if(enemigoVidaActual<0){
        enemigoVidaActual = 0;
        combateActivo = false;
    }
    console.log("El jugador hizo " + dañoJugador + " de daño");
    pintadoBarraEnemigo();
    btnAtaqueBasicoJugador.setAttribute("disabled", "");
    jugadorListoParaAtacar();
}   

/** 
 * 
*/
function pintadoBarraEnemigo(){
    let valorBarra = (enemigoVidaActual*100)/enemigo.vida;
    barraVidaEnemigo.style.width = valorBarra+"%";
    vidaEnemigoBarra.innerHTML = enemigoVidaActual + "/" + enemigo.vida;
}

/**
 * 
 */
async function jugadorListoParaAtacar(){
    await duerme(personaje.enfriamientoBase);
    btnAtaqueBasicoJugador.removeAttribute("disabled");
    console.log("ataque listo");
}

async function combateJugador(){
    jugadorListoParaAtacar();
}

async function iniciarJuego(){

    eliminacionInicial();
    await cargaFalsa1(2000,500);
    cambioEscenaEstadisticas();
}

window.addEventListener("load",iniciarJuego)