
import React, { useState } from 'react';
import './Searched.css'


export default function Searched({ recipes, setRecipes, search, setSearch, handleSubmit, handleChange, loading, error }) {
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10; // Number of results to display per page

    // Logic to calculate the index of the first and last result on the current page
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = recipes.slice(indexOfFirstResult, indexOfLastResult);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className='SearchedSection'>
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
