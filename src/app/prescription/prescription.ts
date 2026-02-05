import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrescriptionService } from '../../services/prescription.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.html',
  styleUrls: ['./prescription.css'],
  standalone: false,
})
export class Prescription implements OnInit {
  @ViewChild('frame') frame!: ElementRef<HTMLIFrameElement>;

  constructor(private route: ActivatedRoute, private prescriptionService: PrescriptionService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.loadForm(
        params['prescriptionId'],
        params['facilityCode'],
        params['patientVisibleId'],
        params['visitNumber']
      );
    });
  }

  loadForm(prescriptionId: string, facilityCode: string, patientVisibleId: string, visitNumber: string) {
    this.prescriptionService
      .GetPrescription(prescriptionId, facilityCode, patientVisibleId, visitNumber)
      .subscribe((html) => {
        const w = window;
        if (!w) return;

        // ✅ gắn event TRƯỚC khi print
        w.addEventListener('afterprint', () => {
          w.close();
        });

        w.document.open();
        w.document.write(html);
        w.document.close();

        setTimeout(() => {
          w.print();
        }, 100);
      });
  }
}
