import { useState, useEffect } from 'react'
import GameCard from '../components/GameCard'
import { fetchGames } from '../api'

function HomePage() {
  const [games, setGames] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    if (!search.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchGames(search);
      setGames(data.results || []);
    } catch (err) {
      setError('Failed to fetch games');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredGames = games || [];

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for games..."
          className="p-2 border rounded w-full max-w-md"
        />
        <button 
          onClick={handleSearch}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  )
}

export default HomePage