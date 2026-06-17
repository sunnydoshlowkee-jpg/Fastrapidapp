import api from './api';

export const getFaqs = () => {
    return api.get('/faqs');
};
