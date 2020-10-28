import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { ScannerService } from './scanner.service';

@Component({
  selector: 'app-scanner',
  template: ''
})
export class ScanComponent implements OnInit {
  constructor(
    private readonly scanner: BarcodeScanner,
    private readonly scannerService: ScannerService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.scanner.scan().then((data: BarcodeScanResult) => {
      this.scannerService.setBarcodeData(data);
      this.router.navigate(['home']);
    }).catch(r => alert(JSON.stringify(r)));
  }

}
