export const API_KEY = "ef6daf13b403d25f8d9b2bd964951968"
export const BASE_URL = "https://api.themoviedb.org/3"

export interface Movie {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  credits: {
    cast: {
      adult: boolean
      gender: number | null
      id: number
      known_for_department: string
      name: string
      original_name: string
      popularity: number
      profile_path: string | null
      character: string
      credit_id: string
      order: number
    }[]
    crew: {
      adult: boolean
      gender: number | null
      id: number
      known_for_department: string
      name: string
      original_name: string
      popularity: number
      profile_path: string | null
      credit_id: string
      department: string
      job: string
    }[]
  }
  genres: {
    id: number
    name: string
  }[]
  runtime: number
  tagline: string
  videos: {
    results: {
      iso_639_1: string
      iso_3166_1: string
      name: string
      key: string
      site: string
      size: number
      type: string
      official: boolean
      published_at: string
      id: string
    }[]
  }
}

export interface MovieListResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export const getPosterUrl = (posterPath: string | null): string | null => {
  return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null
}

export const getBackdropUrl = (backdropPath: string | null): string | null => {
  return backdropPath ? `https://image.tmdb.org/t/p/original${backdropPath}` : null
}

export const getProfileUrl = (profilePath: string | null): string | null => {
  return profilePath ? `https://image.tmdb.org/t/p/w185${profilePath}` : null
}

export async function fetchTrending(timeWindow: "day" | "week" = "day", page = 1): Promise<MovieListResponse> {
  const response = await fetch(`${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}&page=${page}`, {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies")
  }

  return response.json()
}

export async function fetchPopularMovies(page = 1): Promise<MovieListResponse> {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`, {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies")
  }

  return response.json()
}

export async function fetchTopRatedMovies(page = 1): Promise<MovieListResponse> {
  const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`, {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch top rated movies")
  }

  return response.json()
}

export async function fetchUpcomingMovies(page = 1): Promise<MovieListResponse> {
  const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`, {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch upcoming movies")
  }

  return response.json()
}

export async function fetchMovieDetails(movieId: number): Promise<Movie> {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`, {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details for movie ID: ${movieId}`)
  }

  return response.json()
}
