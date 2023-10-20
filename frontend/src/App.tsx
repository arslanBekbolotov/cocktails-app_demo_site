import Layout from './components/Layout.tsx';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Register from './features/users/Register.tsx';
import Login from './features/users/Login.tsx';
import Cocktails from './features/cocktails/Cocktails.tsx';
import CocktailInfo from './features/cocktails/CocktailInfo.tsx';
import CocktailForm from './features/cocktails/components/CocktailForm.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import AdminTable from './features/cocktails/components/admin/AdminTable.tsx';
import {useAppSelector} from './app/hooks.ts';
import {selectUser} from './features/users/usersSlice.ts';

const App = () => {
  const user = useAppSelector(selectUser);
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Cocktails />} />
            <Route path="/:id" element={<CocktailInfo />} />
            <Route
              path="/edit"
              element={
                <ProtectedRoute isAllowed={Boolean(user)}>
                  <CocktailForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute isAllowed={Boolean(user)}>
                  <CocktailForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminTable"
              element={
                <ProtectedRoute isAllowed={user?.role === 'admin'}>
                  <AdminTable />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default App;
