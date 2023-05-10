import * as React from 'react';
import axios from 'axios';

const useApi = endpoint => {
    const [data, setData] = React.useState([]); // initial state empty array

    // To call data when component is mounted
    React.useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await axios.get(endpoint);
        setData(response.data);
    };

    return data;
}

export default useApi;