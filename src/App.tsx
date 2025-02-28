import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Blog } from "./components";
import { Home, Login, Register, NotFound, Contact } from "./pages";
import Layout from "./components/layout/Layout";
function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
          <Route index element={
            <Layout>
             <Home />
            </Layout>
          }/>
          {/* Admin and User Authentication Protected Route */}
          <Route path="auth">
            <Route path="login" element={
              <Layout>
               <Login />
              </Layout>
            } />
            <Route path="signup/user" element={
              <Layout>
               <Register />
              </Layout>
            }/>
          </Route>
          {/* Admin Dashboard Protect Route */}
          <Route path="admin">
            <Route path="dashboard" element={
              <Layout>
                <Dashboard />
              </Layout>
            }/>
          </Route>
          {/* Nested Web Pages */}
          <Route path="pages">
            <Route path="contact" element={
              <Layout>
               <Contact />
              </Layout>
            }/>
          </Route>
          {/* Nested Components */}
          <Route path="components">
            <Route path="blog" element={
              <Layout>
               <Blog />
              </Layout>
            }/>
          </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
