# finanzas-app-backend

## RUTAS DISPONIBLES PARA USUARIOS Y ADMINISTRADORES

"api/auth/signup" : { fullName, email, password, city, stateIDStates }

"/api/auth/signin" : { email, password }

"/api/users/:id" : { req.params.id }

"/api/users/update/:id" : { req.params.id req.body.key_a_modificar }

"/api/users/delete/:id" : { req.params.id }

## RUTAS DISPONIBLES PARA ADMINISTRADORES

"/api/users/" : { Devuelve JSON de todos los usuarios }
