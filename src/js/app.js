let paso = 1;

const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();

});

function iniciarApp() {
    mostrarSecion(); //muestra y oculta las secciones
    tabs(); //Cambia la seccion cuando se presiona el tab
    botonesPaginador(); //Agrega o quita los botones del paginador
    paginaSiguiente();
    paginaAnterior();
    consultarAPI(); //Consulta la API en el backend de PHP, para maniularla en el frontend
    idCliente();
    nombreCliente(); //Añade el nombre del cliente al objeto de cita
    seleccionarFecha(); //Añade la decha en el obj cita
    seleccionarHora(); //Añade la hora al obj cita
}

function mostrarSecion() {
    //Ocultar la seccion anterior
    const seccionAnterior = document.querySelector('.mostrar');

    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar');
    }

    //selecionar la seccion con el paso
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);

    //mostrar la seccion
    seccion.classList.add('mostrar');

    //quita la lase actual en el tab anterior
    const tabAnterior = document.querySelector('.actual');
    if (tabAnterior) {
        tabAnterior.classList.remove('actual');
    }

    //resalta el tab atual
    //seleccionar el tab atual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    //poner estilos
    tab.classList.add('actual');

}

function tabs() {
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            //seleccionar el boton 
            paso = parseInt(e.target.dataset.paso);
            mostrarSecion();
            botonesPaginador();
        });
    });
}

function botonesPaginador() {
    const pagiaAnterior = document.querySelector('#anterior');
    const pagiaSiguiente = document.querySelector('#siguiente');

    if (paso === 1) {
        pagiaAnterior.classList.add('ocultar');
        pagiaSiguiente.classList.remove('ocultar');
    } else if (paso === 3) {
        pagiaAnterior.classList.remove('ocultar');
        pagiaSiguiente.classList.add('ocultar');
        mostrarResumen();
    } else if (paso === 2) {
        pagiaSiguiente.classList.remove('ocultar');
        pagiaAnterior.classList.remove('ocultar');
    }

    mostrarSecion();
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');

    paginaAnterior.addEventListener('click', function() {

        if (paso <= pasoInicial) return;

        paso--;

        botonesPaginador();
    })
}

function paginaSiguiente() {

    const paginaSiguiente = document.querySelector('#siguiente');

    paginaSiguiente.addEventListener('click', function() {

        if (paso >= pasoFinal) return;

        paso++;

        botonesPaginador();
    })
}

async function consultarAPI() {

    try {
        //La dirección de la API
        const url = 'http://localhost:3000/api/servicios';
        //Fetch =  la función que consume la API
        //Await = Solo hasta que se descarga la API  se ejecutan las otras funciones
        const resultado = await fetch(url);
        //Obtener los resultados como json
        const servicios = await resultado.json();
        // Llamamos la funcionde que mostrara los servicios
        mostrarServicios(servicios);

    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios) {
    servicios.forEach(servicio => {
        //Destruturing a servicios
        const { id, nombre, precio } = servicio;

        //scripting
        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servcio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('p');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        //Creamos un div para los servicios
        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        //agregamos un dataset con el id del servicio
        servicioDiv.dataset.idServicio = id;
        //pasamos el servicio a travez de un callback par que solo se pase el servicio al que le damos click
        servicioDiv.onclick = function() {
            seleccionarServicio(servicio);
        };

        //agregamos el nombre y el precio del servicio al div
        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        //Mostramos los servicios en HTML
        document.querySelector('#servicios').appendChild(servicioDiv);
    });
}

function seleccionarServicio(servicio) {
    //Extraemos el arreglo de servicios del objeto cita
    const { servicios } = cita;
    //extraemos el id del servicio
    const { id } = servicio;
    //seleccionamos el div del servicio con el dataset
    const divServicio = document.querySelector(`[data-id-servicio = "${id}"]`);

    //Comprobar si un servicio ya fue agregado o quitarlo
    //some es un array method que devuelve true o false si un elemento se encuentra en el arreglo
    if (servicios.some(agregado => agregado.id === id)) {
        //Eliminar el articulo
        //filter es otro array method 
        cita.servicios = servicios.filter(agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');

    } else {
        //Agregar el articulo
        //hace una copia del arreglo y en la ultima posicion coloca el servicio nuevo
        cita.servicios = [...servicios, servicio];

        //agregar css para servicio selecionado
        divServicio.classList.add('seleccionado');

    }
}

function idCliente() {
    cita.id = document.querySelector('#id').value;
}

function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value;
}

function seleccionarFecha() {

    const inputFecha = document.querySelector('#fecha');

    const divAlertaCita = document.querySelector('#alertaCita');


    inputFecha.addEventListener('input', function(e) {

        const dia = new Date(e.target.value).getUTCDay();

        if ([6, 0].includes(dia)) {
            e.target.value = '';
            mostrarAlerta('Fines de semana no abrimos', 'error', divAlertaCita);
        } else {
            cita.fecha = e.target.value;
        }
    });

}

function seleccionarHora() {
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e) {
        const horaCita = e.target.value;
        //split es un metodo que separa, en este caso el separador es :
        const hora = horaCita.split(":")[0];

        const divAlertaCita = document.querySelector('#alertaCita');

        if (hora < 9 || hora > 18) {
            e.target.value = '';
            mostrarAlerta("Abrimos de 9:00 am a 7:00 pm", "error", divAlertaCita);
        } else {
            cita.hora = e.target.value;
        }
    });
}

function mostrarAlerta(mensaje, tipo, dondeMostrar, desaparece = true) {

    //Previene que se genere mas de una alerta
    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia) {
        alertaPrevia.remove();
    };

    //Scripting para generar la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    dondeMostrar.appendChild(alerta);

    //Eliminar la alerta
    if (desaparece) {
        setTimeout(
            () => {
                alerta.remove();
            }, 3000
        );
    }

}

function mostrarResumen() {
    const resumen = document.querySelector('.resumen-contenido');

    //limpiar el contenido de resumen
    while (resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }

    if (Object.values(cita).includes('') || cita.servicios.length === 0) {
        mostrarAlerta("Faltan datos o servicios :(", "error", resumen, false);

        return;
    }

    //Formatear el div del resumen

    //aplicamos destructuring a cita
    const { nombre, fecha, hora, servicios } = cita;



    //hacemos el scripting

    const titulo = document.createElement('H3');
    titulo.textContent = 'Tu cita';
    resumen.appendChild(titulo);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre: </span> ${nombre}`;
    resumen.appendChild(nombreCliente);

    //Formatear la fecha en español
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    const FechaUTC = new Date(Date.UTC(year, mes, dia));

    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const fechaFormateada = FechaUTC.toLocaleDateString('es-MX', opciones);


    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha: </span> ${fechaFormateada}`;
    resumen.appendChild(fechaCita);

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora: </span> ${hora} horas`;
    resumen.appendChild(horaCita);

    const titulo2 = document.createElement('H3');
    titulo2.textContent = 'Tus servicios';
    resumen.appendChild(titulo2);

    servicios.forEach(servicio => {

        const { id, nombre, precio } = servicio;

        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const nombreServicio = document.createElement('P');
        nombreServicio.innerHTML = `<span>Servicio: </span> ${nombre}`;

        const precioServicio = document.createElement('p');
        precioServicio.innerHTML = `<span>Precio: </span> $${precio} `;

        contenedorServicio.appendChild(nombreServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    });

    //boton para reservar una cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar cita';
    botonReservar.onclick = reservarCita;
    resumen.appendChild(botonReservar);

}

async function reservarCita() {

    const { nombre, fecha, hora, servicios, id } = cita;

    const idServicios = servicios.map(servicio => servicio.id);

    //forma de hacer un submit con formData();
    const datos = new FormData();


    //agregar datos
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioId', id);
    datos.append('servicios', idServicios);

    try {
        //Peticion a la API
        const url = 'http://localhost:3000/api/citas';

        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        });

        const resultado = await respuesta.json();
        console.log(resultado);

        if (resultado.resultado) {
            Swal.fire({
                icon: 'success',
                title: 'Cita Creada',
                text: 'Genial ahora tenemos una Cita!',
                button: 'OK'
            }).then(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 10);
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops Hubo un error',
            text: '¡Tu cita no se ha agendado!',
        })
    }



    //imprimir los datos que lleva el formData
    // console.log([...datos]);

}