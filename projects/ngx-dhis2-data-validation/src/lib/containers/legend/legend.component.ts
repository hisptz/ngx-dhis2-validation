import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css']
})
export class LegendComponent implements OnInit {
  @Input() violationBgrColor: string;
  @Input() discrepancyBgrColor: string;
  @Input() successBgrColor: string;
  constructor() {}

  ngOnInit() {}
}
