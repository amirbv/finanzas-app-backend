# CONTROLADORES DE LOS MONEDEROS

## GET

# Devuelve un monedero (ES REQUERIDO EL ID DE LA CARTERA POR URL)
"/api/wallets/:idWallet": {
- IDWallets, 
- name,
- amount,
- Banks: {
    - IDBank,
    - name,
    - shortName,
    - photoURL,
    - countryIDCountries

    }
- User: {
    - IDUsers,
    - fullName,
    - email,
    - password,
    - city,
    - stateIDStates,
    - isBlocked,
    - createdAt,
    - roleIDRoles

    }
- CurrencyType: {
    - IDCurrencyType,
    - name,
    - symbol,
    - letterSymbol

    }
}

# DEVUELVE LISTA DE MONEDEROS POR USUARIO
"/api/walletsByUser/": {
- IDWallets, 
- name,
- amount,
- Banks: {
    - IDBank,
    - name,
    - shortName,
    - photoURL,
    - countryIDCountries

    }
- User: {
    - IDUsers,
    - fullName,
    - email,
    - password,
    - city,
    - stateIDStates,
    - isBlocked,
    - createdAt,
    - roleIDRoles

    }
- CurrencyType: {
    - IDCurrencyType,
    - name,
    - symbol,
    - letterSymbol

    }

}


## POST

## Añadir un nuevo monedero
"/api/wallets/": { 
- name, 
- description, 
- amount, 
- bankIDBank,
- currencyTypeIDCurrencyType

}


## PUT

## Actualiza el monedero por id (SE REQUIERE EL ID DEL MONEDERO)

"/api/wallets/update/:id":{
- name,
- description,
- amount,
- bankIDBank,
- currencyTypeIDCurrencyType 

}

## DELETE

## Elimina el monedero y los movimientos por ID del monedero

"/api/wallets/:id":{
    Devuelve {
        message: "Monedero eliminado exitosamente"
    }

}