import { Injectable } from '@angular/core';
import { BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';

@Injectable()
export class ScannerService {
  private data: BarcodeScanResult;
  constructor() {}

  setBarcodeData(data: BarcodeScanResult) {
    this.data = data;
  }

  getBarcodeData(): BarcodeScanResult {
    return this.data;
  }
}
