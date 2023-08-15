/* Valores iniciales de enemigos y personaje jugable */
    enemigo = {
        ataque: 20,
        defensa: 30,
        vida: 300
    }
    personaje = {
        nivel: 1,
        ataque: 1,
        defensa: 1,
        vida: 100,
        nivelesDisponibles: 15
    }
/* Valores iniciales de enemigos y personaje jugable */

/* Variables globales de HTML*/
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
    // Texto
        let barraCarga;
    // Auxiliares
        let aumentoExtra = 0;
        let cargaLista = false;
        let nivelPersonajeVisual;
        let enemigoSeleccionado;
        let enemigoSeleccVisual;
/* Variables globales de HTML*/

/* Seleccion de elementos */
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
/* Seleccion de elementos */

/* Eventos de click */
    botonAumentoAtaque.addEventListener("click", sumarAtaquePersonaje);
    botonAumentoDefensa.addEventListener("click", sumarDefensaPersonaje);
    botonAumentoVida.addEventListener("click", sumarVidaPersonaje);
/* Eventos de click */

/* Cambio de escena */
    // Se toman todos los contenedores o escenas principales; Se encapsulan en variables y se eliminan para ser llamadas cuando se necesite.
    function eliminacionInicial(){
        mostrarEstadisticasIniciales();
        contenedorEstadisticasPersonaje.remove();
        contenedorSeleccionEnemigo.remove();
        contenedorEscenaPrincipal.remove();
        modal.remove();
    }
    // Eliminacion de la pantalla de carga y se muestra la seleccion de estadisticas
    function cambioEscenaEstadisticas(){
        contenedorPantallaCarga.remove();
        contenedorBody.appendChild(contenedorEscenaPrincipal)
        contenedorEscenaPrincipal.appendChild(contenedorEstadisticasPersonaje)
    
        /*if (cargaLista){
            console.log("esto")
        }else{
            console.log("no funciona")
        }*/
    }
    // Se muestran la seleccion de enemigos y se elimina el contenedor de las estadisticas
    function cambioSeleccionEnemigos(){
        contenedorEstadisticasPersonaje.remove();
        contenedorEstadisticasPersonajeEncendido = false;
        contenedorSeleccionEnemigoEncendido = true;
        contenedorEscenaPrincipal.appendChild(contenedorSeleccionEnemigo)
    }
/* Cambio de escena */ 

/* Numero random */
    /* Devuelve un numero random unico entre 1 y un numero maximo pasado por parametros */
    function numeroRandom (max){
        return Math.floor(Math.random()* max)+1
    }
/* Numero random */

/* Numero random rango */
    /* Devuelve un numero random en un rango, indicandole un parametro de minimo y maximo */
    function numeroRamdomRango (max, min){
        return Math.floor(Math.random()*(max-min)+min)
    }
/* Numero random rango */

/* Numero random exacto */
    /* Devuelve un numero random en un rango, indicandole un parametro de minimo y maximo; Y el multiplo del cual este debe ser exacto */
    function numeroRamdomRangoExacto (max, min, multiplo){
        let numero = Math.floor(Math.random()*(max-min)+min)

        return Math.ceil(numero/multiplo)*multiplo;
    }
/* Numero random exacto */

/* Retardo */
    function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
/* Retardo */

/* Carga falsa */
    async function cargaFalsa1(tiempo,multiplo){
        cargaLista = false;
        barraCarga.innerHTML = "Cargando recursos del juego";
        await sleep(numeroRamdomRangoExacto(1,tiempo,multiplo));
        barraCarga.innerHTML = "Seguimos cargando recursos";
        await sleep(numeroRamdomRangoExacto(1,tiempo,multiplo));
        barraCarga.innerHTML = "Falta poco";
        await sleep(numeroRamdomRangoExacto(1,tiempo,multiplo));
        barraCarga.innerHTML = "Sabes que no estamos cargando nada ¿verdad?";
        await sleep(numeroRamdomRangoExacto(1,tiempo,multiplo));
        barraCarga.innerHTML = "Ya pues dejemos la tonteria, ahora si";
        await sleep(numeroRamdomRangoExacto(1,tiempo,multiplo));
        iconoCarga.setAttribute("src","src/img/carga.gif")
        barraCarga.setAttribute("class","salida")
        await sleep(2000);
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
                    aumento = numeroRamdomRango((10+aumentoExtra),(5+aumentoExtra))
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

/* Restablecimiento de los valores iniciales en la seleccion de estadisticas */
    function restablecerValores(){
        personaje.ataque = 1
        personaje.defensa = 1
        personaje.nivel = 1
        personaje.vida = 100
        personaje.nivelesDisponibles = 15

        aumentoExtra = 0;
        
        botonRestrablecerEncedido = false;
        botonSeleccionaEnemigoEncendido = false;

        botonRestablecer.remove();
        botonSeleccionaEnemigo.remove();

        mostrarEstadisticasIniciales();
        añadirBtnAumento ();
    }
/* Restablecimiento de los valores iniciales en la seleccion de estadisticas */

/* Se añaden los botones de aumento de estadisticas */
    function añadirBtnAumento (){
        btnUpAtaque.appendChild(botonAumentoAtaque)
        btnUpDefensa.appendChild(botonAumentoDefensa)
        btnUpVida.appendChild(botonAumentoVida)
    }  
/* Se añaden los botones de aumento de estadisticas */

/* Deteccion de seleccion de enemigo */
    function seleccionEnemigo (e){
        if (contenedorSeleccionEnemigoEncendido){
            enemigoSeleccionado = e.target;
            if (enemigoSeleccionado.getAttribute("id") == "hechicero" || enemigoSeleccionado.getAttribute("id") == "guerrero" || enemigoSeleccionado.getAttribute("id") == "ninja"){
                enemigoSeleccionado = enemigoSeleccionado.getAttribute("id");
                console.log(enemigoSeleccionado);
                contenedorBody.appendChild(modal);
                document.getElementById("enemigoSelecc").innerHTML = enemigoSeleccionado;
            }else{ 
                if(enemigoSeleccionado.getAttribute("alt") == "hechicero" || enemigoSeleccionado.getAttribute("alt") == "guerrero" || enemigoSeleccionado.getAttribute("alt") == "ninja"){
                    enemigoSeleccionado = enemigoSeleccionado.getAttribute("alt");
                    console.log(enemigoSeleccionado);
                    contenedorBody.appendChild(modal);
                    document.getElementById("enemigoSelec").innerHTML = enemigoSeleccionado;
                }else{
                    enemigoSeleccionado = null;
                }
            }
        }   
    }
    document.addEventListener("click",seleccionEnemigo);
/* Deteccion de seleccion de enemigo */

async function iniciarJuego(){

    eliminacionInicial();
    await cargaFalsa1(1000,500);
    cambioEscenaEstadisticas();
}

window.addEventListener("load",iniciarJuego)