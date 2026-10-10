import { Component, DestroyRef, Input, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { MeetingsService } from "src/app/core/services/meetings/meetings.service";
import { isWolPreviewUrl } from "./wol-preview-url.util";

@Component({
  selector: "vmc-wol-preview",
  standalone: true,
  templateUrl: "./wol-preview.component.html",
  styleUrls: ["./wol-preview.component.scss"],
})
export class WolPreviewComponent implements OnInit {
  @Input() public url = "";
  @Input() public referenceTitle = "Referencia WOL";
  public loading = false;
  public error = "";
  public previewHtml: SafeHtml | null = null;
  private readonly destroyRef = inject(DestroyRef);
  private request?: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    private meetingsService: MeetingsService,
    private sanitizer: DomSanitizer,
  ) {}

  public ngOnInit(): void {
    this.loadPreview();
  }

  public loadPreview(): void {
    this.request?.unsubscribe();
    this.previewHtml = null;
    this.error = "";
    this.loading = false;
    if (!isWolPreviewUrl(this.url)) {
      this.error = "Esta referencia no tiene una dirección WOL válida.";
      return;
    }

    this.loading = true;
    this.request = this.meetingsService.getWolPreview(this.url).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (response) => {
        this.loading = false;
        if (!response?.html?.trim()) {
          this.error = "La referencia no tiene contenido disponible para la vista previa.";
          return;
        }
        // El API sanitiza el documento completo. Se conserva su formato dentro
        // de un iframe sin scripts ni acceso al origen de la aplicación.
        const document = new DOMParser().parseFromString(response.html, "text/html");
        // Los enlaces del documento no deben navegar el iframe hacia WOL,
        // que impide ser incrustado directamente con SAMEORIGIN.
        document.querySelectorAll("a[href], base").forEach((element) => {
          element.setAttribute("target", "_blank");
          element.setAttribute("rel", "noopener noreferrer");
        });
        this.previewHtml = this.sanitizer.bypassSecurityTrustHtml(`<!doctype html>${document.documentElement.outerHTML}`);
      },
      error: () => {
        this.loading = false;
        this.error = "No se pudo cargar la referencia. Puedes reintentar o abrirla en WOL.";
      },
    });
  }

  public get canOpenOriginal(): boolean {
    return isWolPreviewUrl(this.url);
  }
}
