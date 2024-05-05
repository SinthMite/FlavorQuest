import React, { useState, useEffect } from 'react';
import './Searched.css';

export default function Searched({ recipes, setRecipes, search, setSearch, handleSubmit, handleChange, loading, error, ApiCatcher }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [recipeIds, setRecipeIds] = useState([]);
    const resultsPerPage = 10; // Number of results to display per page

    // Logic to calculate the index of the first and last result on the current page
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = recipes.slice(indexOfFirstResult, indexOfLastResult);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    function setRecipe() {
        const ids = recipes.map(recipe => recipe.id);
        setRecipeIds(ids);
    }

    // Call setRecipe when the component mounts or when recipes change
    useEffect(() => {
        setRecipe();
    }, [recipes]);

    // Fetch recipe information when recipeIds change
    useEffect(() => {
        async function fetchData() {
            const data = await fetchRecipeInformation(recipeIds);
            console.log(data); // Log the fetched recipe information
        }
        fetchData();
    }, [recipeIds]);

    async function fetchRecipeInformation(recipeIds) {
        const recipeIdString = recipeIds.join(','); // Convert the array of recipe IDs into a comma-separated string
        const url = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${ApiCatcher()}&ids=${recipeIdString}`;
    
        try {
            const response = await fetch(url);
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching recipe information:', error);
            return null;
        }
    }

    return (
        <div className='SearchedSection'>
            <form onSubmit={handleSubmit} className="search-form">
                <div className="input-wrapper">
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
                </div>
            </form>
            <ul className='items'>
                {error && <p className="error">{error}</p>}
                {currentResults.map((recipe) => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <img src={recipe.image} alt={recipe.title} />
                    </li>
                ))}
            </ul>
            {/* Pagination */}
            <nav>
                <ul className="pagination">
                    {Array.from({ length: Math.ceil(recipes.length / resultsPerPage) }, (_, i) => (
                        <li key={i} className="page-item">
                            <button onClick={() => paginate(i + 1)} className="page-link">
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
