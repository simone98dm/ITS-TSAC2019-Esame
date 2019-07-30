import { Component, OnInit, Input } from '@angular/core';
import { IMeasurement } from '../models/measurement';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() measurements: IMeasurement[] = [];

  constructor() {}

  ngOnInit() {}
}
