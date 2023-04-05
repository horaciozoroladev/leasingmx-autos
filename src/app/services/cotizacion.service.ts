import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDistribuidores } from '../interfaces/distribuidores.interface';
import { environment } from 'src/environments/environment';
import { ICotizacion } from '../interfaces/cotizacion.interface';


@Injectable({
    providedIn: 'root'
})
export class CotizacionService {
    constructor(
        private http: HttpClient,
    ) { }

    public cotizacion_post(cotizacion: ICotizacion): Observable<any> {
        return this.http.post<any>(environment.endpoints.cotizacion, cotizacion);
    }

}