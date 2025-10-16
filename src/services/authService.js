import ENVIRONMENT from "../config/envionment"
import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http"



export async function register(name, email, password) {
    const usuario = {
        email,
        username: name,
        password
    }

    //Queremos consumir nuesta API

    //Ordena al navegador hacer una consulta HTTP
    //recibe 2 parametros: la URL de consulta y un objeto de configuracion de consulta
    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/auth/register`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                //Como vamos a enviar JSON, configuro que mi consulta envia contenido tipo JSON
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            },
            body: JSON.stringify(usuario)
        }
    )

    //Transformamos a objeto de JS el body de la respuesta
    const response_data = await response_http.json()
    if (!response_data.ok) {
        throw new Error(response_data.message)
    }
    return response_data
}

export async function login(email, password) {
    const response = await fetch(
        `${ENVIRONMENT.API_URL}/api/auth/login`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
            },
            body: JSON.stringify({ email, password })
            
        }
    )
    const response_data = await response.json()

    if (!response.ok) {
        throw new Error(response_data.message)
    }
    return response_data
}


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"

export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Error al enviar el correo de recuperación")
    }

    return data
  } catch (error) {
    throw error
  }
}

export const resetPassword = async (token, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Error al restablecer la contraseña")
    }

    return data
  } catch (error) {
    throw error
  }
}
