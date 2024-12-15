import GameCard from '../components/GameCard'

const randomDeals = [
  {
    id: 7,
    title: "Stardew Valley",
    image: "https://via.placeholder.com/300x200",
    rating: "9.0",
    publisher: "ConcernedApe",
    releaseDate: "February 26, 2016",
    platforms: ["PC", "Nintendo Switch", "PlayStation 4", "Xbox One", "iOS", "Android"],
    price: "$14.99"
  },
  {
    id: 8,
    title: "Hollow Knight",
    image: "https://via.placeholder.com/300x200",
    rating: "9.4",
    publisher: "Team Cherry",
    releaseDate: "February 24, 2017",
    platforms: ["PC", "Nintendo Switch", "PlayStation 4", "Xbox One"],
    price: "$15.99"
  },
  // Add more random deals here
]

function RandomDealsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Random Deals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {randomDeals.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  )
}

export default RandomDealsPage