import { useState } from "react"
import jsonData from "./data/movies.json"
import MovieCard from "./components/MovieCard"
import "./App.css"

type Movie = {
  id: number
  title: string
  year: number
  genre: string[]
}

function App() {
  const [movies, setMovies] = useState<Movie[]>(jsonData)
  const [watched, setWatched] = useState<number[]>([])
  const [filter, setFilter] = useState("all")
  const [ratings, setRatings] = useState<Record<number, number>>({})

  const [title, setTitle] = useState("")
  const [year, setYear] = useState("")

  
  const [genres, setGenres] = useState<string[]>([""])

  const filteredMovies = movies.filter((movie) => {
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

  
  const handleGenreChange = (index: number, value: string) => {
    setGenres((prev) =>
      prev.map((genre, i) => (i === index ? value : genre))
    )
  }

  
  const addGenreField = () => {
    setGenres((prev) => [...prev, ""])
  }

  const addMovie = (e: React.FormEvent) => {
    e.preventDefault()

  
    const filledGenres = genres
      .map((genre) => genre.trim())
      .filter((genre) => genre !== "")

    if (!title.trim() || !year || filledGenres.length === 0) {
      return
    }

    const newMovie: Movie = {
      id: Date.now(),
      title: title.trim(),
      year: Number(year),
      genre: filledGenres,
    }

    setMovies((prev) => [...prev, newMovie])

    
    setTitle("")
    setYear("")
    setGenres([""])
  }

  return (
    <div>
      <h1>
        Obejrzane: {watched.length} / {movies.length}
      </h1>

      <h2>Dodaj nowy film</h2>

      <form onSubmit={addMovie} className="formularz">
        <div>
          <label>
            Tytuł:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Rok:
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>Gatunki:</label>

          {genres.map((genre, index) => (
            <div key={index}>
              <input
                type="text"
                value={genre}
                onChange={(e) =>
                  handleGenreChange(index, e.target.value)
                }
              />

              {index === genres.length - 1 && (
                <button
                  type="button"
                  onClick={addGenreField}
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>

        <button type="submit">
          Dodaj
        </button>
      </form>

      <br />

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