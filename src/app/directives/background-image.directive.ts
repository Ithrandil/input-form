import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';


@Directive({
    selector: '[appBackgroundImage]',

})
export class BackgroundImageDirective implements OnChanges{
    private el: HTMLElement;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
        // el.nativeElement.style.backgroundImage = `url(` + this.backgroundImage + `.jpg)`;
        // el.nativeElement.style.backgroundColor = 'yellow';
    }

    @Input('appBackgroundImage') backgroundImage: string;

    
    @HostListener('change') ngOnChanges(changes: SimpleChanges) {
        console.log('setBackgroundImage with value =>', this.backgroundImage);
        this.el.style.backgroundImage = `url(` + this.backgroundImage + `.jpg)`;
        if (changes.input) {
            // this.setBackgroundImage();
        }
    }
    
    setBackgroundImage(){
        // this.renderer.setStyle(this.el, 'backgroundImage', `url(${ this.backgroundImage })`);
        this.el.style.backgroundImage = `url(` + this.backgroundImage + `.jpg)`;
      }
}