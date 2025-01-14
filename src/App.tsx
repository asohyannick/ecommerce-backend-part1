import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./components";
import { Home, Login, Register } from "./pages"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth">
          <Route path=":login" element={<Login />} />
          <Route path=":signup/user" element={<Register/>} />
        </Route>
        {/* Nested Routes */}
        <Route path="admin">
          <Route path="dashboard" element={<Dashboard />} />
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
