import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {fetchCocktails} from './cocktailsThunk.ts';
import CocktailItem from './components/CocktailItem.tsx';
import Spinner from '../../components/Spinner.tsx';
import {Box, Typography} from '@mui/material';
import Navbar from "./components/Navbar.tsx";
import {selectUser} from "../users/usersSlice.ts";

const Cocktails = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const {cocktails, fetchLoading, query} = useAppSelector((state) => state.cocktailsStore);

    useEffect(() => {
        dispatch(fetchCocktails(query));
    }, [dispatch, query]);

    return (
        <div>
            {user && <Navbar/>}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4,1fr)',
                    gap: '20px',
                }}
            >
                {fetchLoading ? (
                    <Spinner/>
                ) : (
                    cocktails.map((item) => <CocktailItem key={item._id} cocktail={item}/>)
                )}
            </Box>
            {!fetchLoading && cocktails.length <= 0 &&
                <Typography variant='h3' sx={{textAlign: 'center', mt: '10%', whiteSpace: 'nowrap'}}>Nothing was
                    found</Typography>}
        </div>
    );
};

export default Cocktails;
