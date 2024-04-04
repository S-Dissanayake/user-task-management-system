
import Router from './routes/sections';
import ThemeProvider from './theme';

// import styles
import './App.css'

function App() {

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  )
}

export default App
