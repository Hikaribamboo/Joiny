import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signup/SignUpPage";

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
