import './Home.css';
import React, { useState, useEffect } from 'react';
import Searched from '../Searched/Searched';

export default function Home({ ApiCatcher }) {
    const [search, setSearch] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(false);
    const [recipes, setRecipes] = useState([]);

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
        setResults(false);
        const resultsPerPage = 100; // Increase the number of results per page
    
        try {
            if (search.length > 0) {
                const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${await ApiCatcher()}&query=${search}&number=${resultsPerPage}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                console.log(data.results); // Log all fetched results
                setRecipes(data.results); 
            } else {
                // Handle case when search query is empty
                console.log('Search query is empty');
            }
        } catch (error) {
            console.error(error); // Log any errors
            setError(error.message);
        } finally {
            setLoading(false);
            setSubmitted(false); // Reset submitted state after search
            setResults(true);
        }
    };
    useEffect(() => {
        if (submitted) {
            handleSearch(); // Call handleSearch when submitted state changes
        }
    }, [submitted]);
    return (
        <>
            {results ? (
                <div>
                    <Searched
                        recipes={recipes}
                        setRecipes={setRecipes}
                        search={search}
                        setSearch={setSearch}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        loading={loading}
                        error={error}
                        ApiCatcher={ApiCatcher}
                    />
                </div>
            ) : (
                <div>
                    <h1 className='title'>Flavor Quest</h1>
                    <h2 className='subTitle'>Have what you want, when you want it, how you want it.</h2>
                    <form onSubmit={handleSubmit} className="search-form">
                        <input
                            onChange={handleChange}
                            type="text"
                            placeholder="Search for a flavor"
                            aria-label="Search for a flavor"
                            value={search}
                            disabled={loading}
                            className="search-input"
                        />
                        <button type="submit" disabled={loading} className="search-button">
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </form>
                    {error && <p className="error">{error}</p>}
                </div>
            )}
        </>
    );
}     