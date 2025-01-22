import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Dashboard, Blog } from "./components";
import { Home, Login, Register, NotFound, Contact } from "./pages"
function App() {
  // const location = useLocation();
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound/>}/>
        <Route path="auth">
          <Route path=":login" element={<Login />} />
          <Route path=":signup/user" element={<Register />} />

        </Route>
        {/* Nested Routes */}
        <Route path="admin">
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
          <Route path="*" element={<NotFound/>}/>
        <Route path="pages">
           <Route path=":contact" element={<Contact/>}/>
        </Route>
        <Route path="components">
          <Route path=":blog" element={<Blog/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
