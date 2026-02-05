import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
const apiUrl = environment.ApiUrl;
const endPoint = 'order';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  GetOrderForm(orderGroupNumber: string, facilityCode: string, patientVisibleId: string) {
    return this.http.get(
      `${apiUrl}/${endPoint}?orderGroupNumber=${orderGroupNumber}&facilityCode=${facilityCode}&patientVisibleId=${patientVisibleId}`,
      { responseType: 'text' }
    );
  }
}
