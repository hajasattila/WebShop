import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[setBackground]'
})
export class HighlightDirective {
  constructor(private elementRef: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.style.backgroundColor = '#C8E6C9';
    this.elementRef.nativeElement.style.cursor = 'pointer';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.style.backgroundColor = '';
    this.elementRef.nativeElement.style.cursor = '';
  }
}