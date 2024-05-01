import './Home.css';
import React, { useState, useEffect } from 'react';

export default function Home({ ApiCatcher }) {
    const [search, setSearch] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true); // Set submitted to true on form submission
    };

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        try {
            // Wrap fetch in setTimeout
            setTimeout(async () => {
                const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${await ApiCatcher()}&query=${search}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data); // Log the response data
            }, 0); // 0 second delay
        } catch (error) {
            console.error(error); // Log any errors
            setError(error.message);
        } finally {
            setLoading(false);
            setSubmitted(false); // Reset submitted state after search
        }
    };

    useEffect(() => {
        if (submitted) {
            handleSearch(); // Call handleSearch when submitted state changes
        }
    }, [submitted]);

    return (
        <>
            <div>
                <h1 className='title'>Flavor Quest</h1>
                <h2 className='subTitle'>Have what you want, when you want it, how you want it.</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    type="text"
                    placeholder="Search for a flavor"
                    aria-label="Search for a flavor"
                    value={search}
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
        </>
    );
}
