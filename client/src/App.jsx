
import { Routes, Route } from "react-router-dom";
import ThemeProvider from './theme';

import DashboardLayout from './layout/dashboard/index';
import Dashboard from './pages/dashboard/view/Dashboard';
import PageNotFound from './pages/pageNotFound/PageNotFound';
import Login from './pages/login/Login';

// import styles
import './App.css'

function App() {

  return (
    <ThemeProvider>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
