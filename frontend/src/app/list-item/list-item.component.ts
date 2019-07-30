import { Component, OnInit, Input } from '@angular/core';
import { IMeasurement } from '../models/measurement';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() measurement: IMeasurement;

  constructor() {}

  ngOnInit() {}
}
