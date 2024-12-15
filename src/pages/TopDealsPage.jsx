import GameCard from '../components/GameCard'

const topDeals = [
  {
    id: 5,
    title: "Cyberpunk 2077",
    image: "https://via.placeholder.com/300x200",
    rating: "7.2",
    publisher: "CD Projekt",
    releaseDate: "December 10, 2020",
    platforms: ["PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X/S", "PC"],
    price: "$29.99"
  },
  {
    id: 6,
    title: "Hades",
    image: "https://via.placeholder.com/300x200",
    rating: "9.2",
    publisher: "Supergiant Games",
    releaseDate: "September 17, 2020",
    platforms: ["Nintendo Switch", "PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X/S", "PC"],
    price: "$19.99"
  },
  // Add more top deals here
]

function TopDealsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Top Deals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topDeals.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  )
}

export default TopDealsPage