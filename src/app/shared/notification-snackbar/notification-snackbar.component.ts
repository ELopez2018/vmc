import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NotifyType } from 'src/app/core/interfaces/reuniones.interface';


export interface NotifySnackData {
  type: NotifyType;
  title?: string;
  message: string;
  actionText?: string;
  durationMs: number;
}

@Component({
  selector: 'vmc-notification-snackbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="toast">
      <div class="left">
        <div class="icon" aria-hidden="true">
          <mat-icon>{{ icon }}</mat-icon>
        </div>

        <div class="content">
          <div class="title" *ngIf="data.title">{{ data.title }}</div>
          <div class="message">{{ data.message }}</div>

          <button
            *ngIf="data.actionText"
            mat-button
            class="action"
            type="button"
            (click)="onAction()"
          >
            {{ data.actionText }}
          </button>
        </div>
      </div>

      <button
        mat-icon-button
        type="button"
        class="close"
        aria-label="Cerrar notificación"
        (click)="dismiss()"
      >
        <mat-icon>close</mat-icon>
      </button>

      <div class="progress" aria-hidden="true"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationSnackbarComponent {
  readonly data = inject<NotifySnackData>(MAT_SNACK_BAR_DATA);
  private readonly ref = inject(MatSnackBarRef<NotificationSnackbarComponent>);

  @HostBinding('style.--vmc-toast-duration-ms')
  get durationCssVar() {
    return `${this.data.durationMs}ms`;
  }

  get icon(): string {
    switch (this.data.type) {
      case 'success': return 'check_circle';
      case 'info': return 'info';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  }

  dismiss() {
    this.ref.dismiss();
  }

  onAction() {
    this.ref.dismissWithAction();
  }
}
