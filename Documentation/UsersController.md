# CONTROLADORES DE USUARIOS

## GET 
Devuelve al usuario

"/api/users/" : { 
- fullName,
- email,
- city,
- createdAt,
- isBlocked,
- State: {
  - IDStates,
  - name
    
  },
- Role: {
    - IDRoles,
    - name
  
  }

}

## Devuelve a todos los usuarios (Se requiere ser admin)
"/api/allUsers/"

## PUT 

## Actualizar informacion basica del usuario

"/api/users/update/" : { 
  - fullName, 
  - stateIDStates, 
  - city

}


## Actualizar contraseña del usuario

"/api/users/updatePass/": {
  - password,
  - newPassword,
  - confirmPassword

}

## DELETE 

## Borrar al usuario por el ID

"/api/users/delete/"