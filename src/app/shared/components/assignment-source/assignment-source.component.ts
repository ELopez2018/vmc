import { AfterViewChecked, Component, ElementRef, Input, Renderer2, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Assignment } from "src/app/core/interfaces/reuniones.interface";
import { environment } from "src/environments/environment";

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

  constructor(private renderer: Renderer2) {}

  public ngAfterViewChecked(): void {
    const currentHtml = this.assignment?.sourceHtml ?? null;

    if (currentHtml === this.lastHtml) {
      return;
    }

    this.lastHtml = currentHtml;
    this.prepareLinks();
  }

  public get hasSource(): boolean {
    return Boolean(this.assignment?.sourceHtml || this.assignment?.sourceText);
  }

  public get sourceText(): string {
    return this.assignment?.sourceText?.trim() ?? "";
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

    if (!trimmedHref || trimmedHref.startsWith("#") || /^https?:\/\//i.test(trimmedHref)) {
      return trimmedHref;
    }

    if (trimmedHref.startsWith("//")) {
      return `https:${trimmedHref}`;
    }

    const baseUrl = environment.wolBaseUrl.replace(/\/+$/, "");
    const relativePath = trimmedHref.replace(/^\/+/, "");

    return `${baseUrl}/${relativePath}`;
  }
}
