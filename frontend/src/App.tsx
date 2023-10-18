import Layout from './components/Layout.tsx';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Register from './features/users/Register.tsx';
import Login from './features/users/Login.tsx';
import Cocktails from './features/cocktails/Cocktails.tsx';
import CocktailInfo from './features/cocktails/CocktailInfo.tsx';
import CocktailForm from "./features/cocktails/components/CocktailForm.tsx";

const App = () => {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <Layout>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/" element={<Cocktails/>}/>
                        <Route path="/:id" element={<CocktailInfo/>}/>
                        <Route path="/create" element={<CocktailForm/>}/>
                        <Route path="/edit" element={<CocktailForm/>}/>
                    </Routes>
                </Layout>
            </ThemeProvider>
        </>
    );
};

export default App;
