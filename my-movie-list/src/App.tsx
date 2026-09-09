import { useState } from "react"
import jsonData from "./data/movies.json"
import MovieCard from "./components/MovieCard"
import "./App.css"

function App() {

  const [watched, setWatched] = useState<number[]>([])
  const [filter, setFilter] = useState("all")

  const [ratings, setRatings] = useState<Record<number, number>>({})

  const filteredMovies = jsonData.filter((movie) => {
    if (filter === "watched") {
      return watched.includes(movie.id)
    }

    if (filter === "unwatched") {
      return !watched.includes(movie.id)
    }

    return true
  })

const niukZaznaczone = () => {
  setWatched([])
  setRatings({})
  setFilter("all")
}

  const markAsWatched = (id: number) => {
    if (watched.includes(id)) {
      return
    }

    setWatched((prev) => [...prev, id])
  }

  const rateMovie = (id: number, rating: number) => {
    setRatings((prev) => ({
      ...prev,
      [id]: rating,
    }))
  }

  return (
    <div>
      <h1>
        Obejrzane: {watched.length} / {jsonData.length}
      </h1>

      <button onClick={() => setFilter("all")}>
        Wszystkie
      </button>

      <button onClick={() => setFilter("watched")}>
        Obejrzane
      </button>

      <button onClick={() => setFilter("unwatched")}>
        Nieobejrzane
      </button>
      <button onClick={niukZaznaczone} className="reset-button">
  Reset
</button>


      {filteredMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          year={movie.year}
          genre={movie.genre}
          watched={watched.includes(movie.id)}
          onWatched={() => markAsWatched(movie.id)}
          rating={ratings[movie.id] || 0}
          onRate={(rating) => rateMovie(movie.id, rating)}
        />
      ))}
    </div>
  )
}

export default App
