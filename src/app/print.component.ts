import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ScannerService } from './scanner.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-printer',
  templateUrl: 'print.component.html',
  styleUrls: ['print.component.scss']
})
export class PrintComponent implements OnInit{
  constructor(private readonly ble: BluetoothSerial, private readonly router: Router) { }

  PrinterCommands = {
    begin: '^XA',
    end: '^XZ',
    fieldSeparator: '^FS',
    fieldData: '^FD',
    fieldOffset: (x: string, y: string): string => `^FO${x},${y}`,
    comment: '^FX',
    changeFont: '^CF',
    graphicBox: '^GB',
    reversePrint: '^FR',
    rotate90: '^FWR',
    qrCode: (data: string): string => `^BQR,2,10^FDQA,${data}^FS`,
    rotateNormal: '^FWN',
    printWidth: '^PW9999',
    font: (f: string, height: string, width?: string): string => {
      let fontStr = `^CF${f},${height}`;
      if(!!width) fontStr = `${fontStr},${width}`;
      return fontStr;
    },
    centeredFieldBlock: '^FB830,1,0,C'
  };

  zplString = [
    this.PrinterCommands.begin,
    this.PrinterCommands.font('0', '160'),
    this.PrinterCommands.rotateNormal,
    this.PrinterCommands.centeredFieldBlock,
    this.PrinterCommands.fieldOffset('0', '55'),
    (new Date()).toLocaleDateString(),
    this.PrinterCommands.font('0', '35'),
    this.PrinterCommands.centeredFieldBlock,
    this.PrinterCommands.fieldOffset('0', '265'),
    this.PrinterCommands.fieldData,
    'Carvana',
    this.PrinterCommands.font('0', '240'),
    this.PrinterCommands.centeredFieldBlock,
    this.PrinterCommands.fieldOffset('0', '375'),
    this.PrinterCommands.fieldData,
    '(D) (140)',
    this.PrinterCommands.font('0', '180'),
    this.PrinterCommands.centeredFieldBlock,
    this.PrinterCommands.fieldOffset('0', '665'),
    this.PrinterCommands.fieldData,
    '90000',
    this.PrinterCommands.font('0', '40'),
    this.PrinterCommands.fieldOffset('25', '900'),
    this.PrinterCommands.fieldData,
    '3B7HF13Y81G193584',
    this.PrinterCommands.font('0', '80'),
    this.PrinterCommands.fieldOffset('25', '950'),
    this.PrinterCommands.fieldData,
    '2015',
    this.PrinterCommands.font('0', '50'),
    this.PrinterCommands.fieldOffset('25', '1020'),
    this.PrinterCommands.fieldData,
    'Chevrolet',
    this.PrinterCommands.font('0', '50'),
    this.PrinterCommands.fieldOffset('25', '1070'),
    this.PrinterCommands.fieldData,
    'Tahoe',
    this.PrinterCommands.font('0', '30'),
    this.PrinterCommands.fieldOffset('25', '1170'),
    `(${(new Date()).toLocaleDateString()}) (jtheurer)`,
    this.PrinterCommands.fieldOffset('530', '900'),
    this.PrinterCommands.qrCode('3B7HF13Y81G193584'),
    this.PrinterCommands.font('0', '30'),
    this.PrinterCommands.fieldOffset('715', '1170'),
    this.PrinterCommands.fieldData,
    '987654',
    this.PrinterCommands.end
  ].join('');

  ngOnInit(): void {
  }

  print() {
    this.ble.connect('AC:3F:A4:74:30:99')
    .subscribe(
      () => this.ble.write(this.zplString).then(() => {
        alert('done');
        this.ble.disconnect();
      }),
      alert
    );
  }
}
