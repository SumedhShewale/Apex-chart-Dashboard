import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function CampaignCreation() {
    const [campaignData, setCampaignData]: [string, React.Dispatch<React.SetStateAction<string>>] = useState("")
    const dispatch = useDispatch()

    const handleCampaignCreation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCampaignData(event.currentTarget.value)
    }

    const handleSubmit = () => {
        dispatch({
            type: "Add",
            payload: [{
                name: campaignData,
                installs: [
                    { day: 'monday', value: 0 },
                    { day: 'tuesday', value: 0 },
                    { day: 'wednesday', value: 0 },
                    { day: 'thursday', value: 0 },
                    { day: 'friday', value: 0 },
                    { day: 'saturday', value: 0 },
                    { day: 'sunday', value: 0 }
                ]
            }]
        })
        dispatch({ type: "Notify", payload: true })
        setCampaignData("")
    }

    return (
        <Grid container direction="column" justifyContent="center" alignItems="flex-start" spacing={2} style={{ padding: "10px" }}>
            <Grid item>
                <TextField fullWidth InputLabelProps={{ shrink: true }} label="Name" value={campaignData} size="small" variant="filled" placeholder='Enter Campaign Name' onChange={handleCampaignCreation} />
            </Grid>
            <Grid item>
                <Button variant='contained' onClick={handleSubmit} >
                    {"Submit"}
                </Button>
            </Grid>
        </Grid>
    );
}

export default CampaignCreation;