import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'vmc-icon-close',
  standalone: true,
  imports: [],
  templateUrl: './icon-close.component.html',
  styleUrls: ['./icon-close.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCloseComponent implements OnInit {

  ngOnInit(): void { }

}
