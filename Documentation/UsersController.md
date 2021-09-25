# CONTROLADORES DE USUARIOS

## GET 
Devuelve al de usuario por el id

"/api/users/:id" : { 
  - id del usuario por url (:id) 

}

## PUT 

## Actualizar informacion basica del usuario

"/api/users/update/:id" : { 
  - id del usuario por url (:id), 
  - fullName, 
  - stateIDStates, 
  - city

}


## Actualizar contraseña del usuario

"/api/users/updatePass/:id": {
  - id del usuario por url (:id), 
  - password,
  - newPassword,
  - confirmPassword

}

## DELETE 

## Borrar al usuario por el ID

"/api/users/delete/:id" : { 
  - id del usuario por url (:id)

}