# CONTROLADORES DE BANCOS

## GET

## DEVUELVE LA LISTA DE BANCOS

"/api/banks": {
- IDBank, 
- name, 
- shortName, 
- photoURL, 
- CurrencyTypes:{ 
    - IDCurrencyType, 
    - name, 
    - symbol, 
    - letterSymbol 
    
    }, 
- Countries:{ 
    - IDCountries, shortName, name 
    
    }
    
}

## Devuelve un solo banco, se requiere el id del banco por parametro
"/api/bank/:id"{
    "IDBank": 2,
    "name": "Banco de Venezuela S.A.C.A. Banco Universal",
    "shortName": "Banco de Venezuela",
    "photoURL": "http://www.bancodevenezuela.com/",
    "countryIDCountries": 232

}


## POST

## Creacion de un banco
"/api/bank/"{
    "name": "Banco de Venezuela S.A.C.A. Banco Universal",
    "shortName": "Banco de Venezuela",
    "photoURL": "http://www.bancodevenezuela.com/",
    "countryIDCountries": 232

}

## PUT

## Actualizar un banco, se requiere el id del banco por parametro
"/api/bank/:id"{
    "name"
    "shortName"
    "photoURL"
    "countryIDCountries"

}

## DELETE

## Elimina un banco, se requiere el id del banco por parametro
"/api/bank/:id"