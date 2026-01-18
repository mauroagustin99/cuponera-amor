import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiphyServiceService {
// REEMPLAZÁ ESTO CON TU API KEY DE GIPHY
  private apiKey = 'rVcn0cjLmfZJImodSuYEykhdBjF9mamn'; 
  private apiUrl = 'https://api.giphy.com/v1/gifs/search';

  constructor(private http: HttpClient) {}

  getRandomGif(query: string, ratingLevel: string = 'g'): Observable<string> {

    const randomOffset = Math.floor(Math.random() * 50);

    const params = {
      api_key: this.apiKey,
      q: query,
      limit: '10',
      offset: randomOffset.toString(),
      rating: ratingLevel, // Filtro moderado (g = apto todo publico)
      lang: 'es'
    };

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
        const data = response.data;
      if (data && data.length > 0) {
          // De esos 10 que trajimos (que ya son variados por el offset),
          // elegimos uno al azar para asegurar más variedad aún.
          const randomIndex = Math.floor(Math.random() * data.length);
          return data[randomIndex].images.original.url;
        } else {
          // Si nos pasamos de offset y no hay nada, devolvemos uno genérico
          return 'https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif';
        }
      })
    );
  }
}
