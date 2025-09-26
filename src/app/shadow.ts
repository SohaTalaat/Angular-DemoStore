import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[shadow]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class ShadowDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, 'shadow-lg');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease');
  }

  onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'shadow-lg');
  }
}
