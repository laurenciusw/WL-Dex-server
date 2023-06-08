# My news App Server

My Assets App is an application to manage your assets. This app has :

- RESTful endpoint for asset's CRD operation
- JSON formatted response

&nbsp;

## RESTful endpoints

### GET /getpoke

> Get all assets

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
     {
        "entry_number": 1,
        "pokemon_species": {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
        }
    },
    {
        "entry_number": 2,
        "pokemon_species": {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon-species/2/"
        }
    },
]
```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}
```

### GET /getpoke/:id

_Request Header_

```
not needed
```

_Request Body_

```
{
  id : req.params.id
}
```

_Response (200)_

```
{
    "abilities": [array of object],
    "base_experience": 64,
    "forms": [array of object],
    "game_indices":[array of object],
    "height": 7,
    "held_items": [array of object],
    "id": 1,
    "is_default": true,
    "location_area_encounters": "https://pokeapi.co/api/v2/pokemon/1/encounters",
    "moves":[array of object],
    "name": "bulbasaur",
    "order": 1,
    "past_types": [array of object],
    "species":{ object },
    "sprites":{ object },
    "stats":[array of object],
    "types":[array of object],
    "weight": 69
}
```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}
```

### PATCH /subscribe

_Request Header_

```
{
  "access_token": "string"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
  "message": "User with id 1 is a subscriber now"
]
```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}
```

## POST /addpokemon

_Request Header_

```
{
  "access_token": "string"
}
```

_Request Body_

```
{
  pokeName : string,
  pokeImg : string
}
```

_Response (201 - Created)_

```
{
"message": "Succes to Add poke"
}
```

_Response (403 - Foribidden)_

```
{
     message: "You are not authorized"
}
```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}
```

## POST /register

Request:

- body:

```
{
  "email": "string",
  "password": "string",
}
```

_Response (201 - Created)_

```
{
  "message": "user with email (user.email) has been created"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "email is required"
}
{
  "message": "password is required"
}
{
  "message": "email must be unique"
}
```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}
```

## POST /login

Request:

- body:

```
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```
{
  "access_token": "string",
  "email": "string",
}
```

_Response (400 - Bad Request)_

```
{
  "message": "email is required"
}
{
  "message": "password is required"
}
```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}
```
