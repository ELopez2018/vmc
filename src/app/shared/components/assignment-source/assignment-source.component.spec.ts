import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Assignment } from "src/app/core/interfaces/reuniones.interface";
import { AssignmentSourceComponent } from "./assignment-source.component";
import { WolPreviewComponent } from "./wol-preview.component";

describe("Fuentes de asignaciones", () => {
  let fixture: ComponentFixture<AssignmentSourceComponent>;
  let open: jasmine.Spy;
  let inputs: Partial<WolPreviewComponent>;
  const wolUrl = "https://wol.jw.org/es/wol/bc/r4/lp-s/202026244/1/0";

  beforeEach(async () => {
    inputs = {};
    open = jasmine.createSpy("open").and.returnValue({ componentInstance: inputs, result: Promise.resolve() });
    await TestBed.configureTestingModule({
      imports: [AssignmentSourceComponent], providers: [{ provide: NgbModal, useValue: { open } }],
    }).compileComponents();
    fixture = TestBed.createComponent(AssignmentSourceComponent);
  });

  function render(source: Partial<Assignment>): HTMLElement {
    fixture.componentRef.setInput("assignment", source);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it("prefiere HTML sanitizado, elimina scripts y conserva los enlaces", () => {
    const element = render({ sourceHtml: `<p>Fuente <a href="${wolUrl}" onclick="alert(1)">Jer 20:2</a></p><script>alert(1)</script>`, sourceText: "Alternativa" });
    expect(element.querySelector("script")).toBeNull();
    const link = element.querySelector("a")!;
    expect(link.hasAttribute("onclick")).toBeFalse();
    expect(link.href).toBe(wolUrl);
    expect(link.target).toBe("_blank");
    expect(link.rel).toBe("noopener noreferrer");
    expect(element.querySelector(".assignment-source__text")).toBeNull();
  });

  it("muestra texto plano cuando el HTML está vacío", () => {
    const element = render({ sourceHtml: "  ", sourceText: "Párrafo uno\nPárrafo dos" });
    expect(element.querySelector(".assignment-source__text")?.textContent).toContain("Párrafo uno\nPárrafo dos");
    expect(element.querySelector(".assignment-source__content")).toBeNull();
  });

  it("oculta la sección cuando no hay fuente", () => {
    expect(render({ sourceHtml: null, sourceText: null }).querySelector(".assignment-source")).toBeNull();
    expect(render({ sourceHtml: " ", sourceText: " " }).querySelector(".assignment-source")).toBeNull();
  });

  it("abre una referencia WOL anidada en un recuadro dentro de la app", () => {
    const element = render({ sourceHtml: `<a href="${wolUrl}"><strong>Jer 20:2</strong></a>` });
    const click = new MouseEvent("click", { bubbles: true, cancelable: true });
    element.querySelector("strong")!.dispatchEvent(click);
    expect(click.defaultPrevented).toBeTrue();
    expect(open).toHaveBeenCalledWith(WolPreviewComponent, jasmine.objectContaining({ size: "xl" }));
    expect(inputs.url).toBe(wolUrl);
    expect(inputs.referenceTitle).toBe("Jer 20:2");
  });

  it("conserva la apertura normal de enlaces externos y clics con Ctrl", () => {
    const element = render({ sourceHtml: `<a href="https://www.jw.org/es/">Externo</a><a href="${wolUrl}">WOL</a>` });
    const links = element.querySelectorAll("a");
    fixture.componentInstance.openReference({ button: 0, target: links[0] } as unknown as MouseEvent);
    fixture.componentInstance.openReference({ button: 0, ctrlKey: true, target: links[1] } as unknown as MouseEvent);
    expect(open).not.toHaveBeenCalled();
    expect(links[0].target).toBe("_blank");
    expect(links[0].rel).toBe("noopener noreferrer");
  });

  it("resuelve enlaces relativos usando la página original", () => {
    const element = render({ sourceUrl: "https://wol.jw.org/es/wol/d/r4/lp-s/202026244", sourceHtml: '<a href="/es/wol/bc/r4/lp-s/202026244/1/0">Jer 20:2</a>' });
    expect(element.querySelector("a")!.href).toBe(wolUrl);
  });

  it("prepara los enlaces después de ocultar y volver a mostrar la misma fuente", () => {
    const sourceHtml = `<a href="${wolUrl}">Referencia</a>`;
    render({ sourceHtml });
    render({ sourceText: "Solo texto" });
    const element = render({ sourceHtml });
    expect(element.querySelector("a")!.rel).toBe("noopener noreferrer");
  });
});
