# finanzas-app-backend

# RUTAS USERS

## GET (Leer al usuario por el ID)
"/api/users/:id" : { req.params.id }

## PUT (Actualizar informacion basica del usuario)
"/api/users/update/:id" : { 
  req.params.id, 
  req.body.fullName, 
  req.body.stateIDStates, 
  req.body.city
}

## PUT (Actualizar contraseña del usuario)
"/api/users/updatePass/:id": {
  req.params.id, 
  req.body.password,
  req.body.newPassword,
  req.body.confirmPassword
  }

## DELETE (Borrar al usuario por el ID)
"/api/users/delete/:id" : { req.params.id }



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



# RUTAS DISPONIBLES PARA ADMINISTRADORES

## GET
"/api/users/" : { Devuelve JSON de todos los usuarios }

"/api/wallets/" : { Devuelve JSON de todas las carteras}
