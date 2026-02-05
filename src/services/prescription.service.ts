import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
const apiUrl = environment.ApiUrl;
const endPoint = 'prescription';
@Injectable({
  providedIn: 'root',
})
export class PrescriptionService {
  constructor(private http: HttpClient) {}
  GetPrescription(prescriptionId: string, facilityCode: string, patientVisibleId: string, visitNumber: string) {
    return this.http.get(
      `${apiUrl}/${endPoint}?prescriptionId=${prescriptionId}&facilityCode=${facilityCode}&patientVisibleId=${patientVisibleId}&visitNumber=${visitNumber}`,
      { responseType: 'text' }
    );
  }
}
