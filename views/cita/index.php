<h1 class="nombre-pagina">Agendar cita</h1>
<p class="descripcion-pagina">Hola <span><?php echo $nombre; ?></span>, aquí puedes agendar tu cita</p>

<div class="app">

    <nav class="tabs">
        <button type="button" data-paso="1" >Servicios</button>
        <button type="button" data-paso="2" >Cita</button>
        <button type="button" data-paso="3" >Resumen</button>
    </nav>

    <div id="paso-1" class="seccion">
        <h2>Servicios</h2>
        <p class="text-center" >Elige tus servicios</p>
        <div id="servicios" class="listado-servicios"></div>
    </div>
    <div id="paso-2" class="seccion">
        <h2>Datos y cita</h2>
        <p class="text-center" >Coloca tus datos y la fecha para tu cita</p>

        <form class="formulario">
            
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input 
                    type="text"
                    id="nombre"
                    disabled
                    value="<?php echo $nombre; ?>"
                />
            </div>

            <div class="campo">
                <label for="fecha">Fecha</label>
                <input 
                    type="date"
                    id="fecha"
                />
            </div>

            <div class="campo">
                <label for="hora">Hora</label>
                <input 
                    type="time"
                    id="hora"
                />
            </div>

        </form>
    </div>
    <div id="paso-3" class="seccion">
    <h2>Resumen</h2>
        <p class="text-center" >Verifica que la información sea correcta</p>
    </div>

    <div class="paginacion">
        <button
            id="anterior"
            class="boton"
        >&laquo; Anterior</button>

         <button
            id="siguiente"
            class="boton"
        >Siguiente &raquo;</button>
    </div>
</div>

<?php 

$script = "
    <script src='build/js/app.js' ></script>
";

?>