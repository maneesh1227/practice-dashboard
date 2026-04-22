import { Component } from '@angular/core';
import { DataService } from '../../services/data-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tv-two-component',
  imports: [CommonModule],
  templateUrl: './tv-two-component.html',
  styleUrl: './tv-two-component.css',
})
export class TvTwoComponent {
  constructor(public dataService: DataService) {}
}
