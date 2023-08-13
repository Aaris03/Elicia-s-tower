function iniciarJuego(){

    /* Variables globales de HTML*/
        // Contenedores
        let contenedorBody;
        let contenedorPantallaCarga;
        let contenedorSeleccionEnemigo;
        let contenedorEstadisticasPersonaje;
        let contenedorEscenaInicial;
        // Botones
        let botonEscenaEstadSelectEnemigo;
        // Texto
        let barraCarga;
        // Auxiliares
        let aumentoExtra = 0;
        let cargaLista = false;
    /* Variables globales de HTML*/

    /* Seleccion de elementos */
        contenedorPantallaCarga = document.querySelector("#pantallaCarga")
        contenedorSeleccionEnemigo = document.querySelector("#seleccionEnemigo");
        contenedorEstadisticasPersonaje = document.querySelector("#estadisticasPersonaje");
        barraCarga = document.querySelector("#barraCarga");
        iconoCarga = document.querySelector("#iconoCarga");
        contenedorEscenaInicial = document.querySelector("#escenaInicioJuego");
        contenedorBody = document.querySelector("body");
    /* Seleccion de elementos */

    /* Cambio de escena */
        // Se toman todos los contenedores o escenas principales; Se encapsulan en variables y se eliminan para ser llamadas cuando se necesite.
        function eliminacionInicial(){
            //contenedorEstadisticasPersonaje.remove();
            contenedorSeleccionEnemigo.remove();
            contenedorEscenaInicial.remove();
        }
        
    /* Cambio de escena */ 

    /* Carga falsa */
        function cargaFalsa1(){
            setTimeout(function(){
                barraCarga.innerHTML = "Cargando recursos del juego";
                setTimeout(function(){
                    barraCarga.innerHTML = "Seguimos cargando recursos";
                    setTimeout(function(){
                        barraCarga.innerHTML = "Falta poco";
                        setTimeout(function(){
                            barraCarga.innerHTML = "Sabes que no estamos cargando nada ¿verdad?";
                            setTimeout(function(){
                                barraCarga.innerHTML = "Ya pues dejemos la tonteria, ahora si";
                                setTimeout(function(){
                                    iconoCarga.setAttribute("src","src/img/carga.gif")
                                    barraCarga.setAttribute("class","salida")
                                    setTimeout(function(){
                                        contenedorPantallaCarga.remove();
                                        contenedorBody.appendChild(contenedorEscenaInicial)
                                        cargaLista = true;
                                        console.log("Ya soy true");
                                        return cargaLista;
                                    },2000)
                                },2000)
                            },1500)
                        },1000)
                    },3000)
                },2500)
            },2000)
        }
    /* Carga falsa */

    function hola (a){
        console.log("no puedo creer que esto salga")
        if (cargaLista){
            console.log("entro")
        }
    }

    function corrida(){
        eliminacionInicial();
        hola(cargaFalsa1());
       
    }

    corrida();
    
    const enemigo = {
        ataque: 20,
        defensa: 30,
        vida: 300
    }

    const personaje = {
        nivel: 1,
        ataque: 1,
        defensa: 1,
        vida: 100,
        nivelesDisponibles: 15
    }

    function mostrarEstadisticasIniciales (){
        document.getElementById("nivelPersonaje").innerHTML = personaje.nivel;
        document.getElementById("ataquePersonaje").innerHTML = personaje.ataque;
        document.getElementById("defensaPersonaje").innerHTML = personaje.defensa;
        document.getElementById("vidaPersonaje").innerHTML = personaje.vida;
        document.getElementById("nivelesDisponibles").innerHTML = "+" + personaje.nivelesDisponibles;
    }

    mostrarEstadisticasIniciales();

    function numeroRamdomRango (max, min){
        return Math.floor(Math.random()*(max-min)+min)
    }

    function numeroRandom (max){
        return Math.floor(Math.random()* max)+1
    }

    function multiplo (divisor, nivel){
        if (nivel % divisor == 0){        
            aumentoExtra = aumentoExtra + numeroRandom(4)
            return true
        }else{
            return false
        }
    }

    let botonAumentoAtaque = document.getElementById("aumentoAtaque");
    botonAumentoAtaque.addEventListener("click", sumarAtaquePersonaje)
    let botonAumentoDefensa = document.getElementById("aumentoDefensa");
    botonAumentoDefensa.addEventListener("click", sumarDefensaPersonaje)
    let botonAumentoVida = document.getElementById("aumentoVida");
    botonAumentoVida.addEventListener("click", sumarVidaPersonaje)

    function ajustesNiveles (){
        personaje.nivel = personaje.nivel + 1
        personaje.nivelesDisponibles = personaje.nivelesDisponibles - 1
    }

    function aumentoAtaque (valorCreciente){
        personaje.ataque = personaje.ataque + valorCreciente  
        ajustesNiveles()
        document.getElementById("nivelPersonaje").innerHTML = personaje.nivel;
        document.getElementById("ataquePersonaje").innerHTML = personaje.ataque;
        document.getElementById("nivelesDisponibles").innerHTML = "+" + personaje.nivelesDisponibles;
    }

    function aumentoDefensa (valorCreciente){
        personaje.defensa = personaje.defensa + valorCreciente
        ajustesNiveles()
        document.getElementById("nivelPersonaje").innerHTML = personaje.nivel;
        document.getElementById("defensaPersonaje").innerHTML = personaje.defensa;
        document.getElementById("nivelesDisponibles").innerHTML = "+" + personaje.nivelesDisponibles;
    }

    function aumentoVida (valorCreciente){
        personaje.vida = personaje.vida + valorCreciente
        ajustesNiveles()
        document.getElementById("nivelPersonaje").innerHTML = personaje.nivel;
        document.getElementById("vidaPersonaje").innerHTML = personaje.vida;
        document.getElementById("nivelesDisponibles").innerHTML = "+" + personaje.nivelesDisponibles;
    }

    function sumarAtaquePersonaje(){
        let aumento = 0;
        if(personaje.nivelesDisponibles > 0){
            if(multiplo(4, personaje.nivel)){
                aumento = numeroRamdomRango((5+aumentoExtra),(1+aumentoExtra))
                aumentoAtaque(aumento);
                disparadorDeEventos()
            }else{
                aumento = numeroRamdomRango(5,1)
                aumentoAtaque(aumento);
                disparadorDeEventos()
            }
        }
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

    let botonRestrablecerEncedido = false;

    let botonRestablecer;

    function añadirBotonRestablecer (){
        if(personaje.nivelesDisponibles > 1 && botonRestrablecerEncedido == false){
            
            let contenedorBoton = document.querySelector(".botonRestablecer")
            let botonNuevo = document.createElement("button")

            botonNuevo.setAttribute("id", "restablecer")
            botonNuevo.setAttribute("class", "btn btn-light")
            botonNuevo.setAttribute("type", "button")
            botonNuevo.innerHTML = "Restablecer"
            contenedorBoton.appendChild(botonNuevo)

            botonRestrablecerEncedido = true;

            botonRestablecer = document.getElementById("restablecer");
            botonRestablecer.addEventListener("click", restablecerValores)
        }
    }

    function disparadorDeEventos(){
        añadirBotonRestablecer()
        quitarBtnAumento()
    }

    let botonSeleccionaEnemigoEncendido = false;
    let botonSeleccionaEnemigo;


    function añadirBotonSeleccionaEnemigo (){
        if(personaje.nivelesDisponibles == 0 && botonSeleccionaEnemigoEncendido == false){
            let contenedorBotonSeleccionEnemigo = document.querySelector(".botonSeleccionaEnemigo")
            let botonNuevoSeleccion = document.createElement("button")

            botonNuevoSeleccion.setAttribute("id", "seleccionaEnemigo")
            botonNuevoSeleccion.setAttribute("class", "btn btn-light")
            botonNuevoSeleccion.setAttribute("type", "button")
            botonNuevoSeleccion.innerHTML = "Seleccion de enemigo"
            contenedorBotonSeleccionEnemigo.appendChild(botonNuevoSeleccion)

            botonSeleccionaEnemigoEncendido = true;

            botonSeleccionaEnemigo = document.getElementById("seleccionaEnemigo");
            botonSeleccionaEnemigo.addEventListener("click", cambioSeleccionEnemigos)

        }
    }

    let contenedorEstadisticasPersonajeEncendido = true;

    function cambioSeleccionEnemigos(){
        restablecerValores()
        contenedorEstadisticasPersonaje.remove();
        contenedorEstadisticasPersonajeEncendido = false;
    }

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

    function quitarBtnAumento (){
        if(personaje.nivelesDisponibles == 0){
            botonAumentoAtaque.remove();
            botonAumentoDefensa.remove();
            botonAumentoVida.remove();
            añadirBotonSeleccionaEnemigo();
        }    
    }

    let btnUpAtaque = document.getElementById("cajaBtnAumentoAtaque")
    let btnUpDefensa = document.getElementById("cajaBtnAumentoDefensa")
    let btnUpVida = document.getElementById("cajaBtnAumentoVida")

    function añadirBtnAumento (){
        btnUpAtaque.appendChild(botonAumentoAtaque)
        btnUpDefensa.appendChild(botonAumentoDefensa)
        btnUpVida.appendChild(botonAumentoVida)
    }   

    function transformacionHtml (){

    }

}

window.addEventListener("load",iniciarJuego)