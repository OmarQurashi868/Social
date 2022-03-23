import "./App.css";
import { Register } from "./auth/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import { AuthRouter } from "./auth/AuthRouter";
import { Home } from "./home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <AuthRouter>
                <Home />
              </AuthRouter>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
