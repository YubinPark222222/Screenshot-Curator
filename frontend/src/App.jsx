import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'

function App() {
  console.log("App 렌더됨");
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}


export default App
