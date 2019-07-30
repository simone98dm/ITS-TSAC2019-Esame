import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMeasurement } from '../models/measurement';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(private http: HttpClient, private socket: Socket) {}

  /**
   * Get all conveyors measurements
   */
  getConveyors(): Observable<IMeasurement[]> {
    return this.http.get<IMeasurement[]>(`http://localhost:3000/api/conveyor`);
  }

  /**
   * Get conveyor id measuurements
   * @param id converyor id
   */
  getConveyor(id: number): Observable<IMeasurement[]> {
    return this.http.get<IMeasurement[]>(
      `http://localhost:3000/api/conveyor/` + id
    );
  }

  getAlert() {
    return this.socket.fromEvent<any>('alert');
  }
}
