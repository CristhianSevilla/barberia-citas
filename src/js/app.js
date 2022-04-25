let paso = 1;

const pasoInicial = 1;
const pasoFinal = 3;

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    mostrarSecion(); //muestra y oculta las secciones
    tabs(); //Cambia la seccion cuando se presiona el tab
    botonesPaginador(); //Agrega o quita los botones del paginador
    paginaSiguiente();
    paginaAnterior();
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