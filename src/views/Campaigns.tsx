import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Graph from '../components/Graph';

function Campaigns() {
    const [selectedCampaign, setSelectedCampaign]: [string, React.Dispatch<React.SetStateAction<string>>] = useState("")
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!state.hasCampaignDataFetched) {
            dispatch({ type: "CampaignFetchStatus", payload: true })
            fetchCampaigns()
        }
        else {
            setSelectedCampaign("0")
        }
    }, [])

    const fetchCampaigns = () => {
        fetch("http://5c3db915a9d04f0014a98a79.mockapi.io/campaigns")
            .then(response => response.json())
            .then(jsonResponse => {
                dispatch({ type: "Add", payload: jsonResponse })
                setSelectedCampaign("0")
            })
            .catch(error => {
                console.log(error, " <- Error Handling")
            })
    }

    const handleSelection = (event: SelectChangeEvent<string>) => {
        setSelectedCampaign(event.target.value)
    }

    const xAxisData = (state?.campaignData?.[selectedCampaign]?.installs?.map((data: { day: string; value: number }) => data?.day || "")) || []

    const yAxisData = (state?.campaignData?.[selectedCampaign]?.installs?.map((data: { day: string; value: number }) => data?.value || 0)) || []

    return (
        <Grid container direction="column" justifyContent="center" alignItems="flex-start" spacing={2} style={{ padding: "10px" }}>
            <Grid item>
                <FormControl variant="filled">
                    <InputLabel id="campaignSelector">Select Campaign</InputLabel>
                    <Select
                        labelId="campaignSelector"
                        value={selectedCampaign}
                        onChange={handleSelection}
                    >
                        {state?.campaignData?.map((campaign: any, index: number) => <MenuItem key={index} value={index}>{campaign.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} style={{ width: "50%" }}>
                <Graph title="Installs" xAxisData={xAxisData} yAxisData={yAxisData} />
            </Grid>
        </Grid>
    );
}

export default Campaigns;