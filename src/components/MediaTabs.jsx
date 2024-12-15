import { useState } from 'react'

function MediaTabs({ trailer, review, screenshots }) {
  const [activeTab, setActiveTab] = useState('trailer')

  const VideoPlayer = ({ video, type }) => {
    if (!video) return <p>No {type} available</p>

    return (
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${video.videoId}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="mt-2">
          <h3 className="font-semibold">{video.title}</h3>
          <p className="text-sm text-gray-500">By {video.channelTitle}</p>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'trailer':
        return <VideoPlayer video={trailer} type="trailer" />
      case 'review':
        return <VideoPlayer video={review} type="review" />
      default:
        return null
    }
  }

  return (
    <div className="mt-8">
      <div className="flex justify-center mb-4 space-x-2">
        <button
          className={`btn ${activeTab === 'trailer' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('trailer')}
        >
          <span className="mr-2">🎬</span>
          Trailer
        </button>
        <button
          className={`btn ${activeTab === 'review' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('review')}
        >
          <span className="mr-2">📝</span>
          Review
        </button>
      </div>
      <div className="bg-base-200 rounded-lg p-4">
        {renderContent()}
      </div>
    </div>
  )
}

export default MediaTabs 