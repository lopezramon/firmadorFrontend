


fetch('http://localhost/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // La solicitud fue exitosa
          response.json().then((data) => {
            console.log(data)
          })
        } else {
          // La solicitud falló
          switch (response.status) {
            case 401:
              // El usuario no está autenticado
              console.log('El usuario no está autenticado')
              break
            case 500:
              // Error interno del servidor
              console.log('Error interno del servidor')
              break
            case 422:
              // Error interno del servidor
              console.log('Error interno del credencial')
              break
            default:
              // Otro error
              console.log('Error desconocido')
          }
        }
      })
      .catch((error) => {
        // Se produjo un error de red
        console.log('Error de peticion')
      })