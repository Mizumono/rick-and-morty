import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<></>} />
      <Route path="/profile/:id" element={<></>} />
    </Routes>
  );
};

export default App;
