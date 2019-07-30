import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from '../services/provider.service';
import { IMeasurement } from '../models/measurement';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: number;
  m: IMeasurement[] = [];
  constructor(private route: ActivatedRoute, private s: ProviderService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.fetchData();
    setTimeout(() => this.fetchData(), 30000);
  }

  fetchData() {
    this.s.getConveyor(this.id).subscribe(
      r => {
        this.m = r;
      },
      err => {
        console.error(err);
      }
    );
  }
}
