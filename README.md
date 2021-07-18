# finanzas-app-backend

# RUTAS DISPONIBLES PARA USUARIOS Y ADMINISTRADORES

## GET
"/api/states": { devuelve: IDStates, name }

"/api/roles": { devuelve: IDRoles, name }

"/api/currencies": { devuelve: IDCurrencyType, name, symbol, letterSymbol }

"/api/countries": { devuelve: IDCountries, shortName, name }

"/api/banks": {devuelve: IDBank, name, shortName, photoURL, CurrencyTypes:{ IDCurrencyType, name, symbol, letterSymbol }, Countries:{ IDCountries, shortName, name }}

"/api/walletsByUser/:id": {req.params.id, devuelve JSON de las carteras por el id del usuario}

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

## GET
"/api/users/:id" : { req.params.id }

## PUT
"/api/users/update/:id" : { req.params.id req.body.key_a_modificar }

## DELETE
"/api/users/delete/:id" : { req.params.id }

# RUTAS DISPONIBLES PARA ADMINISTRADORES

## GET
"/api/users/" : { Devuelve JSON de todos los usuarios }
"/api/wallets/" : { Devuelve JSON de todas las carteras}
