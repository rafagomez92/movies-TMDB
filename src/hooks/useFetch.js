import { useState, useEffect } from 'react';

function useFetch(url, options) {
    const [loading, setLoading] = useState(true); // este es opcional
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);


    useEffect((() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setResult(json);
                setLoading(false);
            } catch (err) {                
                setError(err);
                setLoading(false);
            }
        }
        fetchData();

    }), [options, url]);

    return { loading, result, error };
}



export default useFetch;