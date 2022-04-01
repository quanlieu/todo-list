import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TodoTable from './pages/TodoTable/TodoTable';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todos" element={<TodoTable />} />
        <Route path="/" element={<Navigate replace to="/todos" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
