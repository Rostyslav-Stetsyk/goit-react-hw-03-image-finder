import axios from 'axios';

const MAIN_DOMEN = 'https://pixabay.com/api/'
const DEFAULT_PARAMS = {
    key: '38365301-8fc0cf151ce2e32a6ee0bdda0',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12
}

axios.defaults.params = DEFAULT_PARAMS;
axios.defaults.baseURL = `${MAIN_DOMEN}`;

export const getImages = async (q, page) => {
    const resp = await axios.get('', {
        params: {
            q,
            page
        }
    })
    return resp.data
}