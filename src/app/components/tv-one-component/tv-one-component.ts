import { Component } from '@angular/core';
import { DataService } from '../../services/data-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tv-one-component',
  imports: [CommonModule],
  templateUrl: './tv-one-component.html',
  styleUrl: './tv-one-component.css',
})
export class TvOneComponent {
  constructor(public dataService: DataService) {}
}
