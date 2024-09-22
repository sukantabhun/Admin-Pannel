import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import EmployeeListView from './components/EmployeeListView';
import CreateEmployee from './components/CreateEmployee';
import NotFound from './components/NotFound'
import EditEmployee from './components/EditEmployee';


const App = () => (
  <Routes>
    <Route path="/login" element={<LoginForm />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
    <Route
      path="/employee-list"
      element={
        <ProtectedRoute>
          <EmployeeListView />
        </ProtectedRoute>
      }
    />
    <Route
      path="/create-employee"
      element={
        <ProtectedRoute>
          <CreateEmployee />
        </ProtectedRoute>
      }
    />
    <Route
      path={`/edit-employee/:id`}
      element={
        <ProtectedRoute>
          <EditEmployee />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
