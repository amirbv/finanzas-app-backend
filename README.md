# finanzas-app-backend

## RUTAS DISPONIBLES PARA USUARIOS Y ADMINISTRADORES

"api/auth/signup" : { fullName, email, password, city, stateIDStates }

## INICIO DE SESION USUARIO COMUN
"/api/auth/signin" : { email, password }

## INICIO DE SESION USUARIO ADMINISTRADOR
"/api/auth/signin/admin" : { email, password }

"/api/users/:id" : { req.params.id }

"/api/users/update/:id" : { req.params.id req.body.key_a_modificar }

"/api/users/delete/:id" : { req.params.id }

## RUTAS DISPONIBLES PARA ADMINISTRADORES

"/api/users/" : { Devuelve JSON de todos los usuarios }
