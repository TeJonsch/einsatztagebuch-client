import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChuckNorrisModel } from '../model/chuck-norris.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ChuckNorrisService {
    private static readonly CHUCK_NORRIS_FACTS_URL = 'https://api.chucknorris.io/jokes/random';

    constructor(private readonly httpClient: HttpClient) {}

    public getFact(): Observable<ChuckNorrisModel> {
        return this.httpClient.get<ChuckNorrisModel>(ChuckNorrisService.CHUCK_NORRIS_FACTS_URL);
    }
}
