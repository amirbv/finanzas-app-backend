# finanzas-app-backend


## POST 
"/api/auth/signup" : { fullName, email, password, city, stateIDStates }

"/api/wallets/": { name, description, amount, bankIDBank, userIDUsers }

## PUT
"/api/wallets/update/:id": { req.params.id, name, description, amount, bankIDBank, userIDUsers }

## DELETE
"/api/wallets/delete/:id": { req.params.id }

# INICIO DE SESION USUARIO COMUN

## POST
"/api/auth/signin" : { email, password }

# INICIO DE SESION USUARIO ADMINISTRADOR

## POST
"/api/auth/signin/admin" : { email, password }



# RUTAS DISPONIBLES PARA ADMINISTRADORES

## GET
"/api/users/" : { Devuelve JSON de todos los usuarios }

"/api/wallets/" : { Devuelve JSON de todas las carteras}
