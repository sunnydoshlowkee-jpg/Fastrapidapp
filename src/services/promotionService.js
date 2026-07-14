import api from './api';

export const getPromotions = () => {
    return api.get('/promotions');
};
