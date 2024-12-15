import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchGameDetails, fetchYouTubeVideo, fetchYouTubeReview, fetchGameScreenshots } from '../api'
import MediaTabs from '../components/MediaTabs'

function GameDetailsPage() {
  const { id } = useParams()
  const [game, setGame] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [review, setReview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    const loadGameDetails = async () => {
      try {
        const fetchedGame = await fetchGameDetails(id);
        setGame(fetchedGame);

        // Fetch YouTube trailer and review
        const [trailerData, reviewData] = await Promise.all([
          fetchYouTubeVideo(fetchedGame.name),
          fetchYouTubeReview(fetchedGame.name)
        ]);

        setTrailer({
          videoId: trailerData.id.videoId,
          title: trailerData.snippet.title,
          thumbnail: trailerData.snippet.thumbnails.high.url,
          channelTitle: trailerData.snippet.channelTitle
        });

        setReview({
          videoId: reviewData.id.videoId,
          title: reviewData.snippet.title,
          thumbnail: reviewData.snippet.thumbnails.high.url,
          channelTitle: reviewData.snippet.channelTitle
        });

        setLoading(false);
      } catch (err) {
        console.error('Error loading game details:', err);
        setError('Failed to load game details');
        setLoading(false);
      }
    };
    loadGameDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-8">Loading...</div>
  if (error) return <div className="text-center mt-8">{error}</div>
  if (!game) return <div className="text-center mt-8">Game not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{game.name}</h1>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/3 pr-4">
          <img src={game.background_image} alt={game.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="w-full md:w-2/3 mt-4 md:mt-0">
          <p className="text-xl mb-2">Rating: <span className="badge badge-lg">{game.rating}</span></p>
          <p className="mb-2"><strong>Release Date:</strong> {game.released}</p>
          <p className="mb-2"><strong>Platforms:</strong> {game.platforms.map(p => p.platform.name).join(', ')}</p>
          <p className="mb-2"><strong>Average Playtime:</strong> {game.playtime} hours</p>
          <p className="mb-4">{game.description_raw}</p>
          <div className="flex flex-wrap mb-4">
            {game.tags.slice(0, 10).map(tag => (
              <span key={tag.id} className="badge badge-outline mr-2 mb-2">{tag.name}</span>
            ))}
          </div>
          {game.cheapest && (
            <div className="flex gap-4">
              <button 
                onClick={() => window.open(game.storeLink, '_blank')}
                className="btn btn-primary"
              >
                Buy Now - ${game.cheapest}
              </button>
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`btn ${isWishlisted ? 'btn-warning' : 'btn-secondary'}`}
              >
                {isWishlisted ? (
                  <>
                    <span className="mr-2">★</span> Wishlisted
                  </>
                ) : (
                  <>
                    <span className="mr-2">☆</span> Add to Wishlist
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <MediaTabs trailer={trailer} review={review} />
    </div>
  )
}

export default GameDetailsPage