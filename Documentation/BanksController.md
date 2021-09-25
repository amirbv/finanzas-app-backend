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