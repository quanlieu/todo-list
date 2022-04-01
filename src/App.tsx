import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TodoTable from './pages/TodoTable/TodoTable';
import TodoDetail from './pages/TodoDetail/TodoDetail';
import Toast from './containers/Toast/Toast';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route path="/todos" element={<TodoTable />} />
        <Route path="/todos/:uuid" element={<TodoDetail />} />
        <Route path="/" element={<Navigate replace to="/todos" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
