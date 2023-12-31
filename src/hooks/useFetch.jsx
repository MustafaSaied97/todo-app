import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetch({ method, url, body = {}},deps=[]) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading('loading...');
        setData(null);
        setError(null);
        const source = axios.CancelToken.source();
        axios({
            method,
            url,
            ...(body && { data: body }),
            cancelToken: source.token
        })
        .then((res) => {
            console.log('res',res);
            res?.data && setData(res.data);
        })
        .catch((err) => {
            console.log('err',err);
            setError('An error occurred. Awkward..');
        }).finally(()=>{
            setLoading(false);
        })
        return () => {
            source.cancel();
        };
    }, [...deps]);

    return { data, loading, error };
}
