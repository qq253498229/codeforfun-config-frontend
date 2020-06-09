import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class EnvService {

    constructor(
        private http: HttpClient
    ) {
    }

    checkName(name: string) {
        return this.http.get(`/api/config/env/checkName/${name}`)
    }
}
