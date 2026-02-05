import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-request',
  templateUrl: './order-request.html',
  styleUrls: ['./order-request.css'],
  standalone: false,
})
export class OrderRequest implements OnInit {
  @ViewChild('frame') frame!: ElementRef<HTMLIFrameElement>;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.loadForm(
        params['orderGroupNumber'],
        params['facilityCode'],
        params['patientVisibleId']
      );
    });
  }

  loadForm(orderGroupNumber: string, facilityCode: string, patientVisibleId: string) {
    this.orderService
      .GetOrderForm(orderGroupNumber, facilityCode, patientVisibleId)
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
