import { useState } from 'react'

function MediaTabs({ trailer, review, screenshots }) {
  const [activeTab, setActiveTab] = useState('trailer')

  const renderContent = () => {
    switch (activeTab) {
      case 'trailer':
        return trailer ? (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer.videoId}`}
            title={trailer.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>No trailer available</p>
        )
      case 'review':
        return review ? (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${review.videoId}`}
            title={review.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>No review available</p>
        )
      case 'screenshots':
        return screenshots && screenshots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {screenshots.map((screenshot, index) => (
              <img
                key={screenshot.id}
                src={screenshot.image}
                alt={`Screenshot ${index + 1}`}
                className="w-full rounded-lg shadow-lg"
              />
            ))}
          </div>
        ) : (
          <p>No screenshots available</p>
        )
      default:
        return null
    }
  }

  return (
    <div className="mt-8">
      <div className="flex justify-end mb-4">
        <button
          className={`btn ${activeTab === 'trailer' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('trailer')}
        >
          Trailer
        </button>
        <button
          className={`btn ml-2 ${activeTab === 'review' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('review')}
        >
          Review
        </button>
        <button
          className={`btn ml-2 ${activeTab === 'screenshots' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('screenshots')}
        >
          Screenshots
        </button>
      </div>
      <div className="video-container bg-base-200 rounded-lg p-4">
        {renderContent()}
      </div>
    </div>
  )
}

export default MediaTabs 