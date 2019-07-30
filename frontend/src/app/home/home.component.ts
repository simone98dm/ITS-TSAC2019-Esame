import { Component, OnInit } from '@angular/core';
import { IMeasurement } from '../models/measurement';
import { ProviderService } from '../services/provider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'MondoClean Conveyor Dashboard';
  m: IMeasurement[] = [];
  alert: { message: string; component: IMeasurement };
  constructor(private s: ProviderService) {}

  ngOnInit(): void {
    this.fetchData();
    setTimeout(() => this.fetchData(), 30000);
  }

  showAlert() {
    this.s.getAlert().subscribe(arg => {
      console.log(arg);
      this.alert.component = arg.msg;
    });
  }

  fetchData() {
    this.s.getConveyors().subscribe(
      r => {
        this.m = r;
      },
      err => console.error(err)
    );
  }
}
