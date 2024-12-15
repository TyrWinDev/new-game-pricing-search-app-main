import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchGameById, fetchYouTubeVideo, fetchYouTubeReview, fetchGameScreenshots, fetchDeals } from '../api'
import MediaTabs from '../components/MediaTabs'

function GameDetailsPage() {
  const { id } = useParams()
  const [game, setGame] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [review, setReview] = useState(null)
  const [screenshots, setScreenshots] = useState([])
  const [cheapestDeal, setCheapestDeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadGameDetails = async () => {
      try {
        const fetchedGame = await fetchGameById(id)
        setGame(fetchedGame)

        // Fetch YouTube trailer and review
        const [trailerData, reviewData] = await Promise.all([
          fetchYouTubeVideo(fetchedGame.name),
          fetchYouTubeReview(fetchedGame.name)
        ])

        // Fetch screenshots
        const screenshotsData = await fetchGameScreenshots(id)
        setScreenshots(screenshotsData.results)

        // Fetch cheapest deal
        const dealResponse = await fetchDeals(fetchedGame.name)
        const cheapest = dealResponse.reduce((prev, curr) => (prev.salePrice < curr.salePrice ? prev : curr), dealResponse[0])
        setCheapestDeal(cheapest)

        // Extract video IDs from search results
        setTrailer({
          videoId: trailerData.id.videoId,
          title: trailerData.snippet.title,
          thumbnail: trailerData.snippet.thumbnails.high.url,
          channelTitle: trailerData.snippet.channelTitle
        })

        setReview({
          videoId: reviewData.id.videoId,
          title: reviewData.snippet.title,
          thumbnail: reviewData.snippet.thumbnails.high.url,
          channelTitle: reviewData.snippet.channelTitle
        })

        setLoading(false)
      } catch (err) {
        console.error('Error loading game details:', err)
        setError('Failed to load game details')
        setLoading(false)
      }
    }
    loadGameDetails()
  }, [id])

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
          {cheapestDeal && (
            <p className="mb-4">
              <strong>Cheapest Price:</strong> ${cheapestDeal.salePrice} 
              <a href={cheapestDeal.storeLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 underline">Buy Now</a>
            </p>
          )}
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>

      <MediaTabs trailer={trailer} review={review} screenshots={screenshots} />
    </div>
  )
}

export default GameDetailsPage