import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDistribuidores } from '../interfaces/distribuidores.interface';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class DistribuidoresService {
    constructor(
        private http: HttpClient,
    ) { }

    public distribuidores_get(): Observable<IDistribuidores> {
        return this.http.get<IDistribuidores>(environment.endpoints.distribuidores);
    }

}