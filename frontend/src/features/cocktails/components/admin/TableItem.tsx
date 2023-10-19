import React from "react";
import {Card, CardMedia, Grid} from "@mui/material";
import {ICocktail} from "../../../../types";
import ClearIcon from "@mui/icons-material/Clear";
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import UnpublishedRoundedIcon from '@mui/icons-material/UnpublishedRounded';
import IconButton from "@mui/material/IconButton";
import {useAppDispatch} from "../../../../app/hooks.ts";
import {deleteCocktail, fetchAll, patchPublish} from "../../cocktailsThunk.ts";
import MouseOverPopover from "../../../../components/Popover.tsx";

interface Props {
    cocktail: ICocktail;
}

const TableItem: React.FC<Props> = ({cocktail}) => {
    const dispatch = useAppDispatch();

    const formatName = (name: string) => {
        const splitName = name.split(' ');
        return splitName.map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
    };

    const handleDelete = async () => {
        await dispatch(deleteCocktail(cocktail._id));
        await dispatch(fetchAll());
    };

    const handlePublish = async () => {
        await dispatch(patchPublish(cocktail._id));
        await dispatch(fetchAll());
    };

    return (
        <div style={{marginBottom: '20px'}}>
            <Card
                sx={{
                    maxWidth: 505,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: "center",
                    mx: 'auto',
                    justifyContent: 'flex-start',
                    p: '10px 10px'
                }}>
                <CardMedia
                    component="img"
                    height="80"
                    sx={{backgroundSize: 'contain', objectFit: 'contain', width: '30%'}}
                    image={`http://localhost:8001/${cocktail.image}`}
                    alt="cocktail picture"
                />
                <Grid container item alignItems="center">
                    <MouseOverPopover name={formatName(cocktail.name)} text={'Click to copy article'}/>
                    {cocktail.isPublished &&
                        <IconButton aria-label="delete" color="warning" size="large" sx={{ml: 'auto'}}
                                    onClick={handlePublish}>
                            <UnpublishedRoundedIcon/>
                        </IconButton>}
                    {!cocktail.isPublished &&
                        <IconButton aria-label="delete" color="success" size="large" sx={{ml: 'auto'}}
                                    onClick={handlePublish}>
                            <PublishRoundedIcon/>
                        </IconButton>}
                    <IconButton aria-label="delete" color="error" size="large" sx={{ml: '5px'}} onClick={handleDelete}>
                        <ClearIcon/>
                    </IconButton>
                </Grid>
            </Card>
        </div>
    );
};

export default TableItem;