import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider ,defaultSystem } from "@chakra-ui/react";


import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signup/SignUpPage";
import PublicPostPage from './pages/posts/public/PublicPostPage';

function App() {

  return (
    <>
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/posts" element={<PublicPostPage />} />

          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  )
}

export default App
