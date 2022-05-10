import "./App.css";
import Register from "./auth/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import AuthRouter from "./auth/AuthRouter";
import Home from "./home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<AuthRouter />} />
          {/* <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
