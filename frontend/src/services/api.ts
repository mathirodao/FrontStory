import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getCampaigns = async () => {
    try {
        const response = await apiClient.get('/campaigns');
        return response.data;
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        throw error;
    }
};

export const createCampaign = async (campaignData: {
    name: string;
    start_date: string;
    end_date: string;
    clicks: number;
    cost: number;
    revenue: number;
}) => {
    try {
        const response = await apiClient.post('/campaigns', campaignData);
        return response.data;
    } catch (error) {
        console.error('Error creating campaign:', error);
        throw error;
    }
};

export const deleteCampaign = async (campaignId: number) => {
    try {
        const response = await apiClient.delete(`/campaigns/${campaignId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting campaign:', error);
        throw error;
    }
};