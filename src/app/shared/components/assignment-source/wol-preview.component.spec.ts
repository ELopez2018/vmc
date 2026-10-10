import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { WolPreviewComponent } from "./wol-preview.component";

describe("Vista previa WOL", () => {
  let fixture: ComponentFixture<WolPreviewComponent>;
  let http: HttpTestingController;
  const url = "https://wol.jw.org/es/wol/bc/r4/lp-s/202026244/1/0";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WolPreviewComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), NgbActiveModal],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(WolPreviewComponent);
    fixture.componentRef.setInput("url", url);
    fixture.componentRef.setInput("referenceTitle", "Jer 20:2");
  });

  afterEach(() => http.verify());

  it("muestra carga y el documento en un iframe srcdoc aislado", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain("Cargando");
    const request = http.expectOne((candidate) => candidate.url.endsWith("/meetings/wol-preview"));
    expect(request.request.params.get("url")).toBe(url);
    request.flush({ url, html: '<!doctype html><html><head><base href="https://wol.jw.org/"><style>p { color: blue; }</style></head><body><p>Referencia</p><a href="/es/">Otro enlace</a></body></html>' });
    fixture.detectChanges();
    const iframe = fixture.nativeElement.querySelector("iframe") as HTMLIFrameElement;
    expect(iframe.hasAttribute("src")).toBeFalse();
    expect(iframe.srcdoc).toContain("Referencia");
    expect(iframe.srcdoc).toContain("<style>");
    expect(iframe.srcdoc).toContain('target="_blank"');
    expect(iframe.sandbox.contains("allow-scripts")).toBeFalse();
    expect(iframe.sandbox.contains("allow-same-origin")).toBeFalse();
    expect(iframe.title).toBe("Jer 20:2");
    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeNull();
  });

  it("permite reintentar cuando el API falla", () => {
    fixture.detectChanges();
    http.expectOne((candidate) => candidate.url.endsWith("/meetings/wol-preview"))
      .flush({}, { status: 500, statusText: "Server Error" });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain("No se pudo cargar");
    fixture.nativeElement.querySelector('[role="alert"] button').click();
    http.expectOne((candidate) => candidate.url.endsWith("/meetings/wol-preview")).flush({ url, html: "<p>Disponible</p>" });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("iframe").srcdoc).toContain("Disponible");
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeNull();
  });

  it("muestra un mensaje si el preview no tiene contenido", () => {
    fixture.detectChanges();
    http.expectOne((candidate) => candidate.url.endsWith("/meetings/wol-preview")).flush({ url, html: " " });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("iframe")).toBeNull();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain("no tiene contenido");
  });

  it("cancela la llamada al cerrar el recuadro", () => {
    fixture.detectChanges();
    const request = http.expectOne((candidate) => candidate.url.endsWith("/meetings/wol-preview"));
    fixture.destroy();
    expect(request.cancelled).toBeTrue();
  });

  for (const invalid of ["http://wol.jw.org/es/", "https://wol.jw.org.example.com/", "javascript:alert(1)", "https://user:pass@wol.jw.org/", "https://www.jw.org/"]) {
    it(`rechaza la URL no permitida ${invalid}`, () => {
      fixture.componentRef.setInput("url", invalid);
      fixture.detectChanges();
      http.expectNone((candidate) => candidate.url.endsWith("/meetings/wol-preview"));
      expect(fixture.componentInstance.error).toContain("válida");
      expect(fixture.nativeElement.querySelector("a")).toBeNull();
    });
  }
});
