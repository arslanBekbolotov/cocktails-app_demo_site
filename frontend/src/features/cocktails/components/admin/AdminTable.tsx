import {useEffect} from "react";
import {fetchAll} from "../../cocktailsThunk.ts";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {Box, Typography} from "@mui/material";
import Spinner from "../../../../components/Spinner.tsx";
import TableItem from "./TableItem.tsx";

const AdminTable = () => {
    const dispatch = useAppDispatch();
    const {fetchLoading, cocktails} = useAppSelector(state => state.cocktailsStore)

    useEffect(() => {
        dispatch(fetchAll());
    }, [dispatch]);

    return (
        <div>
            <Box>
                {fetchLoading ? (
                    <Spinner/>
                ) : (
                    cocktails.map((item) => <TableItem key={item._id} cocktail={item}/>)
                )}
            </Box>
            {!fetchLoading && cocktails.length <= 0 &&
                <Typography variant='h3' sx={{textAlign: 'center', mt: '10%', whiteSpace: 'nowrap'}}>Nothing was
                    found</Typography>}
        </div>
    );
};

export default AdminTable;