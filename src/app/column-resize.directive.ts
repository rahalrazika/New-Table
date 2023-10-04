import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColumnResize]'
})
export class ColumnResizeDirective {
  private isResizing = false;
  private initialX = 0;
  private initialWidth = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isResizing = true;
    this.initialX = event.pageX;
    this.initialWidth = this.el.nativeElement.offsetWidth;

    // resizable handle
    const handle = this.renderer.createElement('div');
    this.renderer.addClass(handle, 'resize-handle');
    this.renderer.appendChild(this.el.nativeElement, handle);

    // Prevent text selection while resizing
    this.renderer.setStyle(document.body, 'user-select', 'none');

    // Listen to mousemove and mouseup events
    this.renderer.listen('document', 'mousemove', this.onMouseMove.bind(this));
    this.renderer.listen('document', 'mouseup', this.onMouseUp.bind(this));
  }

  onMouseMove(event: MouseEvent) {
    if (this.isResizing) {
      const newWidth = this.initialWidth + (event.pageX - this.initialX);
      this.renderer.setStyle(this.el.nativeElement, 'width', newWidth + 'px');
    }
  }

  onMouseUp() {
    if (this.isResizing) {
      this.isResizing = false;
      this.renderer.removeStyle(document.body, 'user-select');
    }
  }
}
