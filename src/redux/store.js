import { configureStore } from '@reduxjs/toolkit';
import logger from "redux-logger";

const initialState = { campaignData: [], notify: false, hasCampaignDataFetched: false }

const campaignReducer = function (state = initialState, action) {
    switch (action.type) {
        case "Add":
            return { ...state, campaignData: [...state.campaignData, ...action.payload] };
        case "Notify":
            return { ...state, notify: action.payload };
        case "CampaignFetchStatus":
            return { ...state, hasCampaignDataFetched: action.payload };
        default:
            return { ...state };
    }
};

const store = configureStore({
    reducer: campaignReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;