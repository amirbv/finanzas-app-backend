# CONTROLADORES DE DIVISAS

## GET

## Devuelve la lista de divisas

"/api/currencies": {

- IDCurrencyType,
- name 
- symbol
- letterSymbol
    
}

## Devuelve una sola divisa, se requiere el id de la divisa por parametro
"/api/currency/:id": {
    "IDCurrencyType": 1,
    "name": "Bolivar Digital",
    "symbol": "Bs.",
    "letterSymbol": "VED"

}

## POST
## Crea una divisa
"/api/currency/"{
- name
- symbol
- letterSymbol

}

## PUT

## Actualiza una divisa, se requiere el id de la divisa por parametro
"/api/currency/:id"{
- name
- symbol
- letterSymbol

}

## DELETE

## Borra un estado
"/api/currency/:id"

