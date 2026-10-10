import { AfterViewChecked, Component, ElementRef, Input, Renderer2, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Assignment } from "src/app/core/interfaces/reuniones.interface";
import { environment } from "src/environments/environment";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { WolPreviewComponent } from "./wol-preview.component";
import { isWolPreviewUrl } from "./wol-preview-url.util";

@Component({
  selector: "vmc-assignment-source",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./assignment-source.component.html",
  styleUrls: ["./assignment-source.component.scss"],
})
export class AssignmentSourceComponent implements AfterViewChecked {
  @Input() public assignment?: Assignment | null;
  @Input() public compact = false;

  @ViewChild("sourceContent") private sourceContent?: ElementRef<HTMLElement>;

  private lastHtml?: string | null;
  private lastSourceUrl?: string | null;
  private lastElement?: HTMLElement;

  constructor(private renderer: Renderer2, private modal: NgbModal) {}

  public ngAfterViewChecked(): void {
    const currentHtml = this.assignment?.sourceHtml ?? null;

    const element = this.sourceContent?.nativeElement;
    const sourceUrl = this.assignment?.sourceUrl;
    if (currentHtml === this.lastHtml && sourceUrl === this.lastSourceUrl && element === this.lastElement) {
      return;
    }

    this.lastHtml = currentHtml;
    this.lastSourceUrl = sourceUrl;
    this.lastElement = element;
    this.prepareLinks();
  }

  public get hasSource(): boolean {
    return Boolean(this.sourceHtml || this.sourceText);
  }

  public get sourceHtml(): string {
    return this.assignment?.sourceHtml?.trim() ?? "";
  }

  public get sourceText(): string {
    return this.assignment?.sourceText?.trim() ?? "";
  }

  public openReference(event: MouseEvent): void {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }
    const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
    const href = link?.getAttribute("href") ?? "";
    if (!isWolPreviewUrl(href)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const preview = this.modal.open(WolPreviewComponent, {
      centered: true, size: "xl", fullscreen: "sm", ariaLabelledBy: "wol-preview-title",
    });
    preview.componentInstance.url = href;
    preview.componentInstance.referenceTitle = link?.textContent?.trim() || "Referencia WOL";
    preview.result.catch((): void => undefined);
  }

  private prepareLinks(): void {
    const element = this.sourceContent?.nativeElement;

    if (!element) {
      return;
    }

    element.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");

      if (href) {
        this.renderer.setAttribute(link, "href", this.resolveWolHref(href));
      }

      this.renderer.setAttribute(link, "target", "_blank");
      this.renderer.setAttribute(link, "rel", "noopener noreferrer");
    });
  }

  private resolveWolHref(href: string): string {
    const trimmedHref = href.trim();

    if (!trimmedHref || trimmedHref.startsWith("#") || /^[a-z][a-z\d+.-]*:/i.test(trimmedHref)) {
      return trimmedHref;
    }

    if (trimmedHref.startsWith("//")) {
      return `https:${trimmedHref}`;
    }

    try {
      const baseUrl = this.assignment?.sourceUrl || `${environment.wolBaseUrl.replace(/\/+$/, "")}/`;
      return new URL(trimmedHref, baseUrl).href;
    } catch {
      return trimmedHref;
    }
  }
}
