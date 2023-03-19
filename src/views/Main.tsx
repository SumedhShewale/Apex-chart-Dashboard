import React, { useState, useEffect } from 'react';
import { Grid, Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';
import Graph from '../components/Graph';
import CampaignCreation from './CampaignCreation';
import Campaigns from './Campaigns';
import Notification from '../components/Notification';

function Main() {
    const [selectedTab, setSelectedTab]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(0)
    const [overviewData, setOverviewData]: [any, React.Dispatch<React.SetStateAction<object>>] = useState()

    useEffect(() => {
        fetchOverviewData()
    }, [])

    const fetchOverviewData = (): void => {
        fetch("http://5c3db915a9d04f0014a98a79.mockapi.io/overview")
            .then(response => response.json())
            .then(jsonResponse =>
                setOverviewData(jsonResponse)
            )
            .catch(error => {
                console.log(error, " <- Error Handling")
            })
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
        setSelectedTab(newValue);
    };

    const getXaxisData = (graphData: any): void => {
        return (graphData?.map((data: { day: string; value: number }) => data?.day || "")) || []
    }

    const getYaxisData = (graphData: any): void => {
        return (graphData?.map((data: { day: string; value: number }) => data?.value || 0)) || []
    }

    return (
        <>
            <Notification />
            <Tabs value={selectedTab} onChange={handleChange}>
                <Tab label="Overview" />
                <Tab label="Campaigns" />
                <Tab label="Create" />
            </Tabs>
            {selectedTab === 0 &&
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Graph title="Installs" xAxisData={getXaxisData(overviewData?.installs)} yAxisData={getYaxisData(overviewData?.installs)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Graph title="Revenue" xAxisData={getXaxisData(overviewData?.revenue)} yAxisData={getYaxisData(overviewData?.revenue)} />
                    </Grid>
                </Grid>
            }
            {
                selectedTab === 1 &&
                <Campaigns />
            }
            {
                selectedTab === 2 &&
                <CampaignCreation />
            }
        </>
    );
}

export default Main;
