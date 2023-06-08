import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AllfundService } from 'src/app/services/allfund.service';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-invest-now',
  templateUrl: './invest-now.component.html',
  styleUrls: ['./invest-now.component.css'],
})
export class InvestNowComponent {
  constructor(
    private router: Router,
    private fund: AllfundService,
    private elementref: ElementRef
  ) {}
  mutualFunds: any;

  ngOnInit() {
    this.fund
      .getMutualFunds()

      .subscribe((data: any[]) => {
        this.mutualFunds = data;
      });
  }

  scrollElemet() {
    const element = this.elementref.nativeElement.querySelector('#fundsection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  goToSip() {
    this.router.navigate(['/sip']);
  }
  lower(str:string){
    return str.split(' ')[0].toLowerCase()
  }
}
