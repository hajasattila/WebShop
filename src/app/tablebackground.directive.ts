import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[myTableBackground]'
})
export class TableBackgroundDirective {

    @Input('myTableBackground') highlightColor!: string;

    constructor(private el: ElementRef) { }

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.highlightColor || '#C8E6C9', 'mouse');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null, null);
    }

    private highlight(color: string | null, icon: string | null) {
        this.el.nativeElement.style.backgroundColor = color || '';
        this.el.nativeElement.style.backgroundImage = icon ? `url('assets/${icon}.svg')` : '';
        this.el.nativeElement.style.backgroundRepeat = 'no-repeat';
        this.el.nativeElement.style.backgroundPosition = 'center';
    }

}