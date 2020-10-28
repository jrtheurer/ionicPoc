import { Component, OnInit } from '@angular/core';
import { ScannerService } from './scanner.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  data = {};
  constructor(private readonly scanner: ScannerService) {}

  ngOnInit() {
    const barcodeData = this.scanner.getBarcodeData();
    this.data = !!barcodeData ? barcodeData.text : '';
  }
}
