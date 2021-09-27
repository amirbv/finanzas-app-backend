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

## Añadir una nueva cartera (se requiere el id del usuario por url)
"/api/wallets/:id": { 
- name, 
- description, 
- amount, 
- bankIDBank

}

