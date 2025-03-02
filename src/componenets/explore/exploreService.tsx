import axios from 'axios';

const fetch = async (token: string | null) => {
    await axios.get(`${process.env.REACT_APP_API_ADDRESS}/image/open/random`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
};

const exploreService = {
    fetch,
};
export default exploreService;
