<?php

namespace Controllers;

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
        $alertas=[];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $usuario->sincronizar($_POST);

            $alertas = $usuario->validarNuevacuenta();

            if (empty($alertas)) {
               //Verificar que el usuario no este registrado
               $resultado = $usuario->existeUsuario();

               if ($resultado->num_rows) {
                   $alertas = Usuario::getAlertas();
               }
            }

        }

        $router->render('auth/crear-cuenta', [
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }
}
