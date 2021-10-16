# CONTROLADORES DE MOVIMIENTOS

## GET

## Devuelve un movimiento, se solicita el id del movimmiento por parametro
"/api/movements/:idMovement"{
    "IDMovements": 3,
    "title": "Regalos",
    "description": "Tio transfirio",
    "amount": 50000,
    "date": "2021-10-09T16:35:10.000Z",
    "conversionAmount": 12077.29,
    "Options": {
        "IDOptions": 1,
        "name": "Ingreso"
    },
    "MovementTypes": {
        "IDMovementType": 3,
        "name": "Transferencia recibida"
    },
    "Wallets": {
        "IDWallets": 3,
        "name": "Comida",
        "description": "Cartera para compras de comida",
        "amount": 100000,
        "isActive": true,
        "bankIDBank": 1,
        "currencyTypeIDCurrencyType": 1,
        "userIDUsers": 15
    },
    "ConversionRates": {
        "IDConversionRate": 2,
        "name": "VED a USD"
    },
    "User": {
        "IDUsers": 15,
        "fullName": "Amir Bastidas",
        "email": "amir@gmail.com",
        "password": "$2a$08$ovD5o.MVvxd2.hdnzOG6B.MEDlSlLGBgRu5qNXJFNbx9h3e1A0Uc.",
        "city": "Maracaibo",
        "stateIDStates": 23,
        "isBlocked": false,
        "createdAt": "2021-06-19",
        "roleIDRoles": 2
    }
}
## Devuelve todos los movimientos
"/api/movements/"

## Devuelve la lista de movimimientos por monedero, se solicita el id del monedero por parametro
"/api/movements/:idWallet"

## POST

## Crea un movimiento, se solicita el id del monedero por parametro
"/api/movement/:idWallet"{
- optionIDOptions,
- title,
- description
- amount,
- movementTypeIDMovementType,
- conversionRateIDConversionRate,
- conversionByUser (opcional)

}


## PUT

## Actualiza un movimiento, se requiere el id del movimiento por parametro

"/api/movement/update/:idMovement"{
- title
- description
- optionIDOptions
- movementTypeIDMovementType
- amount

}
## DELETE

## Borra el movimiento, se solicita el id del movimiento por parametro
"/api/movement/delete/:idMovement"
