import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationSnackbarComponent } from 'src/app/shared/notification-snackbar/notification-snackbar.component';
import { NotifyOptions, NotifyType } from '../../interfaces/reuniones.interface';


@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly snack = inject(MatSnackBar);

  show(options: NotifyOptions) {
    const type: NotifyType = options.type ?? 'info';
    const durationMs = options.durationMs ?? 5000;

    const ref = this.snack.openFromComponent(NotificationSnackbarComponent, {
      duration: durationMs,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['vmc-snackbar', `vmc-snackbar--${type}`],
      data: {
        type,
        title: options.title,
        message: options.message,
        actionText: options.actionText,
        durationMs,
      },
    });

    return ref; // por si quieres ref.onAction().subscribe(...)
  }

  success(message: string, title = 'Listo', durationMs?: number) {
    return this.show({ type: 'success', title, message, durationMs });
  }

  info(message: string, title = 'Info', durationMs?: number) {
    return this.show({ type: 'info', title, message, durationMs });
  }

  warning(message: string, title = 'Atención', durationMs?: number) {
    return this.show({ type: 'warning', title, message, durationMs });
  }

  error(message: string, title = 'Error', durationMs?: number) {
    return this.show({ type: 'error', title, message, durationMs: durationMs ?? 10000 });
  }
}
