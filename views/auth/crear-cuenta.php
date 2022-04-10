<h1 class="nombre-pagina">Crear cuenta</h1>
<p class="descripcion-pagina">LLena el sigueinte formulario para crear una cuenta</p>

<form action="/crear-cuenta" method="POST" class="formulario">
   
    <div class="campo">
        <label for="nombre">Nombre</label>
        <input
        type="text"
        id="nombre"
        placeholder="Tu nombre"
        name="nombre"
        />
    </div>

    <div class="campo">
        <label for="apellido">Apellido</label>
        <input
        type="text"
        id="apellido"
        placeholder="Tu apellido"
        name="apellido"
        />
    </div>

    <div class="campo">
        <label for="telefono">Teléfono</label>
        <input
        type="tel"
        id="telefono"
        placeholder="Tu teléfono"
        name="telefono"
        />
    </div>

    <div class="campo">
        <label for="email">E-mail</label>
        <input
        type="email"
        id="email"
        placeholder="Tu E-mail"
        name="email"
        />
    </div>

    <div class="campo">
        <label for="password">Password</label>
        <input
        type="password"
        id="password"
        placeholder="Tu password"
        name="password"
        />
    </div>

    <div class="alinear-derecha">
    <input type="sunmit" class="boton" value="Crear cuenta">
    </div>
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
    <a href="/olvide">¿Olvidaste tu password?</a>
</div>