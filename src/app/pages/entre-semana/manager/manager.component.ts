import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'vmc-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerComponent implements OnInit {

  ngOnInit(): void { }

}
