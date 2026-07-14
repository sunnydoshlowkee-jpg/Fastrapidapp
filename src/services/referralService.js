import api from './api';

export const getReferrals = () => {
    return api.get('/user/referrals');
};
