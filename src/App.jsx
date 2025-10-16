import { Route, Routes } from "react-router"
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen"
import { LoginScreen } from "./Screens/LoginScreen/LoginScreen"
import ForgotPasswordScreen from "./Screens/ForgotPasswordScreen/ForgotPasswordScreen"
import ResetPasswordScreen from "./Screens/ResetPasswordScreen/ResetPasswordScreen"
import AuthMiddleware from "./Middlewares/AuthMiddleware"

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/reset-password" element={<ResetPasswordScreen />} />
      <Route path="/" element={<AuthMiddleware />}>
        <Route path="/" element={<div>Home</div>} />
      </Route>
    </Routes>
  )
}

export default App
