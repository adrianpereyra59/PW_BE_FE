import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { forgotPassword } from "../../services/authService"
import "./ForgotPasswordScreen.css"

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")
    setLoading(true)

    try {
      const response = await forgotPassword(email)
      setMessage(response.message || "Se ha enviado un correo con las instrucciones para recuperar tu contraseña")
      setEmail("")
    } catch (err) {
      setError(err.message || "Error al enviar el correo de recuperación")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Recuperar Contraseña</h2>
        <p className="forgot-password-description">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Enlace de Recuperación"}
          </button>
        </form>

        <div className="forgot-password-footer">
          <Link to="/login">Volver al inicio de sesión</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordScreen
