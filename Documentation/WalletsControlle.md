# CONTROLADORES DE LOS MONEDEROS

## GET

# DEVUELVE LISTA DE MONEDEROS POR USUARIO (ES REQUERIDO EL ID DEL USUARIO POR URL)
"/api/walletsByUser/:id": {
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
