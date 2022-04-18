<?php

namespace Controllers;

use Classes\Email;
use Model\Usuario;
use MVC\Router;

class LoginController
{
    public static function login(Router $router)
    {

        $router->render('auth/login');
    }

    public static function logout()
    {
        echo "Desde Logout";
    }

    public static function olvide(Router $router)
    {
        $router->render('auth/olvide');
    }

    public static function recuperar()
    {
        echo "Desde recuperar contraseña";
    }

    public static function crear(Router $router)
    {
        $usuario = new Usuario;

        //Alertas vacias
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $usuario->sincronizar($_POST);

            $alertas = $usuario->validarNuevacuenta();

            //Verificar que el usuario no este registrado
            if (empty($alertas)) {
                $resultado = $usuario->existeUsuario();

                if ($resultado->num_rows) {
                    //el usuario esta registrado
                    $alertas = Usuario::getAlertas();
                } else {
                    //el usuario no esta registrado

                    //hashear password
                    $usuario->hashearPassword();

                    //generar un token
                    $usuario->crearToken();

                    //Enviar el email
                    $email = new Email($usuario->email, $usuario->nombre, $usuario->token);

                    $email->enviarConfirmacion();

                    //Crear usuario en BD
                    $resultado = $usuario->guardar();

                    if ($resultado) {
                        header('Location: /mensaje');
                    }
                }
            }
        }

        $router->render('auth/crear-cuenta', [
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }

    public static function mensaje(Router $router)
    {
        $router->render('auth/mensaje');
    }

    public static function confirmar(Router $router)
    {

        $alertas = [];

        //Recuperar token de la url
        $token = s($_GET['token']);

        //Buscar token en BD
        $usuario = Usuario::where('token', $token);

        if (empty($usuario)) {
            //Mostrar Mensaje de error
            Usuario::setAlerta('error', 'Token no válido');
        } else {
            //Modificar a usuario confirmado En BD

            // Se confirma
            $usuario->confirmado = "1";
            // Se borra el token para que no pueda volver a ser usado
            $usuario->token = null;
            //Y se guardan los cambios en la BD
            $usuario->guardar();

            $usuario = Usuario::setAlerta('exito', 'Cuenta confirmada correctamente');
        }

        //Obtener alertas
        $alertas = Usuario::getAlertas();

        //Renderizar la vista
        $router->render('auth/confirmar-cuenta', [
            'alertas' => $alertas
        ]);
    }
}
