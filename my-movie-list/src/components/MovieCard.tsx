type MovieCardProps = {
  title: string
  year: number
  genre: string
  watched: boolean
  onWatched: () => void
  rating: number
  onRate: (rating: number) => void
}

function MovieCard({
  title,
  year,
  genre,
  watched,
  onWatched,
  rating,
  onRate,
}: MovieCardProps) {
  return (
   <div className={`movie-card ${watched ? "watched" : ""}`}>


      <p>{title}</p>
      <p>{year}</p>
      <p>{genre}</p>
      <br></br>
      <button onClick={onWatched}>
        {watched ? "✓ Obejrzany" : "Oznacz jako obejrzany"}
      </button>

      <div>
        <p>Ocena:</p>

        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate(star)}
          >
            {star <= rating ? "★" : "☆"}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MovieCard
