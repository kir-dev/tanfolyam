import fetch from "node-fetch"
import { URLSearchParams } from "url"

export interface FilmData {
  Title: string
  Year: string
  Poster: string
  imdbID: string
}

export class OMDB_Api {
  static instance: OMDB_Api = null
  
  private constructor() {}

  private readonly apiUrl = "http://www.omdbapi.com/"
  private readonly apiKey = process.env.OMDB_API_KEY

  /** Return a singleton instance of the service */
  public static getInstance() {
    return (this.instance)? this.instance : new OMDB_Api()
  }

  /** Return mock data for developement purposes */
  private mockdb(): FilmData[] {
    return [
      {
        Title: "The Cat Redemption",
        Year: "1994",
        imdbID: "tt0111161",
        Poster: "https://i.ytimg.com/vi/ATd93kekvGw/hqdefault.jpg"
      },
      {
        Title: "The Cat Father",
        Year: "1972",
        imdbID: "tt0068646",
        Poster: "https://i.ytimg.com/vi/PsSWGV3HwUM/maxresdefault.jpg"
      },
      {
        Title: "The Dark Night",
        Year: "2008",
        imdbID: "tt0468569",
        Poster: "https://i.kym-cdn.com/photos/images/original/001/723/096/29b.jpg"
      }
    ]
  }

  /** Return mock data for now */
  public async search(name?: string, year?: string): Promise<FilmData[]> {
    // return this.mockdb();

    //TODO use OMDB API to get list of movies
    if (!name) return []

    const params = new URLSearchParams({
      s: name,
      y: year,
      apikey: this.apiKey
    })

    const url = `${this.apiUrl}?${params}`

    return fetch(url)
      .then(res => res.json())
      .then(res => res.Search)
  }


  public async getById(id: string): Promise<FilmData> {
    //return this.mockdb().filter(m => m.imdbID === id)[0]


    const params = new URLSearchParams({
      i: id,
      apikey: this.apiKey
    })

    const url = `${this.apiUrl}?${params}`

    return fetch(url)
      .then(res => res.json())
  }

}