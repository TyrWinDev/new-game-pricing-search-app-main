import { Link } from 'react-router-dom'

function GameCard({ game }) {
  // Extract platform names from the platforms array
  const platformNames = game.platforms?.map(p => p.platform.name).join(', ') || 'N/A';
  
  // Format the release date
  const formattedDate = game.released || 'TBA';
  
  // Get the first store name if available
  const store = game.stores?.[0]?.store.name || 'N/A';

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img 
          src={game.background_image} 
          alt={game.name} 
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {game.name}
          <div className="badge badge-secondary">{game.rating}</div>
        </h2>
        <p>Store: {store}</p>
        <p>Release Date: {formattedDate}</p>
        <p>Platforms: {platformNames}</p>
        <div className="card-actions justify-end">
          <Link to={`/game/${game.id}`} className="btn btn-primary">View Details</Link>
        </div>
      </div>
    </div>
  )
}

export default GameCard