import { API_KEY, BASE_URL, type MovieListResponse } from "./tmdb"

// Function to fetch anime content
export async function fetchAnime(page = 1): Promise<MovieListResponse> {
  const response = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_keywords=210024|287501&page=${page}`,
    {
      next: { revalidate: 3600 },
    },
  )

  if (!response.ok) {
    throw new Error("Failed to fetch anime")
  }

  return response.json()
}

// Function to fetch cartoon content
export async function fetchCartoons(page = 1): Promise<MovieListResponse> {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&without_keywords=210024|287501&page=${page}`,
    {
      next: { revalidate: 3600 },
    },
  )

  if (!response.ok) {
    throw new Error("Failed to fetch cartoons")
  }

  return response.json()
}

// Function to fetch web series
export async function fetchWebSeries(page = 1): Promise<MovieListResponse> {
  const response = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&without_genres=16&sort_by=popularity.desc&page=${page}`,
    {
      next: { revalidate: 3600 },
    },
  )

  if (!response.ok) {
    throw new Error("Failed to fetch web series")
  }

  return response.json()
}

// Enhanced search function that searches across movies, TV shows, anime, etc.
export async function searchAll(
  query: string,
  page = 1,
): Promise<{
  movies: MovieListResponse
  tvShows: MovieListResponse
}> {
  const [moviesResponse, tvShowsResponse] = await Promise.all([
    fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`, {
      next: { revalidate: 3600 },
    }),
    fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`, {
      next: { revalidate: 3600 },
    }),
  ])

  if (!moviesResponse.ok || !tvShowsResponse.ok) {
    throw new Error("Failed to search content")
  }

  const movies = await moviesResponse.json()
  const tvShows = await tvShowsResponse.json()

  return { movies, tvShows }
}
