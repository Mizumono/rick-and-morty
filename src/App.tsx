import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
