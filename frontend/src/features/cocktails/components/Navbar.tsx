import {Grid, Paper} from "@mui/material";
import {useAppDispatch} from "../../../app/hooks.ts";
import {setQuery} from "../cocktailsSlice.ts";

const Navbar = () => {
    const dispatch = useAppDispatch();
    const items = [
        {name: 'Published', query: ""},
        {name: 'Your Published', query: 'userCocktails'},
        {name: 'Your Unpublished', query: "userUnpublished"},
    ];
    
    const onClick = (query: string) => {
        dispatch(setQuery(query));
    }

    return (
        <div>
            <Grid container justifyContent='flex-start' alignItems='center'>
                {items.map(item => (
                    <Paper key={Math.random()} onClick={() => onClick(item.query)} sx={{
                        p: '5px 10px',
                        m: "0 10px 15px 0",
                        fontWeight: '600',
                        fontSize: '18px',
                        cursor: 'pointer'
                    }}>{item.name}</Paper>
                ))}
            </Grid>
        </div>
    );
};

export default Navbar;