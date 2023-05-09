import { AnimationEvent } from '@angular/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ZIndexUtils } from 'primeng/utils';
import { DomHandler } from '../dom/domhandler';
import { Image, ImageModule } from './image';

describe('Image', () => {
    let image: Image;
    let fixture: ComponentFixture<Image>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, ImageModule]
        });

        fixture = TestBed.createComponent(Image);
        image = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const imageEl = fixture.debugElement.query(By.css('.p-image'));
        expect(imageEl.nativeElement).toBeTruthy();
    });

    describe('onImageClick', () => {
        it('should set maskVisible and previewVisible to true when preview is true', () => {
            image.preview = true;
            fixture.detectChanges();

            image.onImageClick();

            expect(image.maskVisible).toBe(true);
            expect(image.previewVisible).toBe(true);
        });

        it('should not set maskVisible and previewVisible to true when preview is false', () => {
            image.preview = false;
            fixture.detectChanges();

            image.onImageClick();

            expect(image.maskVisible).toBeFalsy();
            expect(image.previewVisible).toBeFalsy();
        });
    });

    describe('onMaskClick', () => {
        it('should call closePreview when previewClick is false', () => {
            image.previewClick = false;
            const closePreviewSpy = spyOn(image, 'closePreview');
            fixture.detectChanges();

            image.onMaskClick();
            expect(closePreviewSpy).toHaveBeenCalled();
            expect(image.previewClick).toBe(false);
        });

        it('should not call closePreview when previewClick is true', () => {
            image.previewClick = true;
            const closePreviewSpy = spyOn(image, 'closePreview');
            fixture.detectChanges();

            image.onMaskClick();
            expect(closePreviewSpy).not.toHaveBeenCalled();
            expect(image.previewClick).toBe(false);
        });
    });

    describe('onMaskClick', () => {
        it('should call closePreview when previewClick is false', () => {
            image.previewClick = false;
            const closePreviewSpy = spyOn(image, 'closePreview');
            fixture.detectChanges();

            image.onMaskClick();
            expect(closePreviewSpy).toHaveBeenCalled();
            expect(image.previewClick).toBe(false);
        });

        it('should not call closePreview when previewClick is true', () => {
            image.previewClick = true;
            const closePreviewSpy = spyOn(image, 'closePreview');
            fixture.detectChanges();

            image.onMaskClick();
            expect(closePreviewSpy).not.toHaveBeenCalled();
            expect(image.previewClick).toBe(false);
        });
    });

    describe('onPreviewImageClick', () => {
        it('should set previewClick to true', () => {
            image.onPreviewImageClick();

            expect(image.previewClick).toBe(true);
        });
    });

    describe('rotateRight', () => {
        it('should increase the rotate value by 90 and set previewClick to true', () => {
            image.rotate = 90;
            fixture.detectChanges();

            image.rotateRight();

            expect(image.rotate).toBe(180);
            expect(image.previewClick).toBe(true);
        });
    });

    describe('rotateLeft', () => {
        it('should decrease the rotate value by 90 and set previewClick to true', () => {
            image.rotate = 90;
            fixture.detectChanges();

            image.rotateLeft();

            expect(image.rotate).toBe(0);
            expect(image.previewClick).toBe(true);
        });
    });

    describe('zoomIn', () => {
        it('should increase the scale value by the zoomSetting step (0.1) and set previewClick to true', () => {
            image.scale = 1;
            fixture.detectChanges();

            image.zoomIn();

            expect(image.scale).toBe(1.1);
            expect(image.previewClick).toBe(true);
        });
    });

    describe('zoomOut', () => {
        it('should decrease the scale value by the zoomSetting step (0.1) and set previewClick to true', () => {
            image.scale = 1;
            fixture.detectChanges();

            image.zoomOut();

            expect(image.scale).toBe(0.9);
            expect(image.previewClick).toBe(true);
        });
    });

    describe('onAnimationStart', () => {
        it('should set the value of the container and wrapper and should call appendContainer and moveOnTop when the event has visible value', () => {
            const button = document.createElement('button');
            const event = { toState: 'visible', element: button } as AnimationEvent;
            const appendContainerSpy = spyOn(image, 'appendContainer');
            const moveOnTopSpy = spyOn(image, 'moveOnTop');
            fixture.detectChanges();

            image.onAnimationStart(event);

            expect(image.container).toEqual(button);
            expect(image.wrapper).toEqual(button.parentElement);
            expect(appendContainerSpy).toHaveBeenCalled();
            expect(moveOnTopSpy).toHaveBeenCalled();
        });
        it('should call DomHandler addClass with the wrapper and p-component-overlay-leave', () => {
            const div = document.createElement('div');
            image.wrapper = div;
            const button = document.createElement('button');
            const event = { toState: 'void', element: button } as AnimationEvent;
            const domHandlerAddClassSpy = spyOn(DomHandler, 'addClass');
            fixture.detectChanges();

            image.onAnimationStart(event);

            expect(domHandlerAddClassSpy).toHaveBeenCalledWith(div, 'p-component-overlay-leave');
        });
    });

    describe('onAnimationEnd', () => {
        it('should emit onShow when the toState value is visible', () => {
            const button = document.createElement('button');
            const event = { toState: 'visible', element: button } as AnimationEvent;
            const onShowEmitSpy = spyOn(image.onShow, 'emit');

            fixture.detectChanges();

            image.onAnimationEnd(event);

            expect(onShowEmitSpy).toHaveBeenCalled();
        });

        it('should call zIndex clear and set the value of maskVisible, container, wrapper to default and emit onHid toState value is void', () => {
            const div = document.createElement('div');
            const button = document.createElement('button');
            const event = { toState: 'void', element: button } as AnimationEvent;
            const zIndexClearSpy = spyOn(ZIndexUtils, 'clear');
            const onHideEmitSpy = spyOn(image.onHide, 'emit');
            image.wrapper = div;
            fixture.detectChanges();

            image.onAnimationEnd(event);

            expect(zIndexClearSpy).toHaveBeenCalledWith(div);
            expect(image.maskVisible).toEqual(false);
            expect(image.container).toEqual(null);
            expect(image.wrapper).toEqual(null);
            expect(onHideEmitSpy).toHaveBeenCalled();
        });
    });

    describe('moveOnTop', () => {
        it('should call ZIndexUtil.set', () => {
            image.wrapper = {} as HTMLElement;
            const zIndexSetSpy = spyOn(ZIndexUtils, 'set');
            fixture.detectChanges();

            image.moveOnTop();

            expect(zIndexSetSpy).toHaveBeenCalledWith('modal', {}, 1100);
        });
    });

    describe('appendContainer', () => {
        it('should not call DomHandler.appendChild when the appendTo value is body', () => {
            image.wrapper = document.createElement('div');
            image.appendTo = 'body';
            const appendChildSpy = spyOn(DomHandler, 'appendChild').and.callFake(() => {});
            fixture.detectChanges();

            image.appendContainer();

            expect(appendChildSpy).not.toHaveBeenCalled();
        });

        it('should not call DomHandler.appendChild when the appendTo is not set', () => {
            image.wrapper = {} as HTMLElement;
            image.appendTo = null;
            const appendChildSpy = spyOn(DomHandler, 'appendChild').and.callFake(() => {});
            fixture.detectChanges();

            image.appendContainer();

            expect(appendChildSpy).not.toHaveBeenCalled();
        });

        it('should call DomHandler.appendChild when the appendTo is set and the value is not body', () => {
            image.wrapper = {} as HTMLElement;
            image.appendTo = 'macska';
            const appendChildSpy = spyOn(DomHandler, 'appendChild').and.callFake(() => {});
            fixture.detectChanges();

            image.appendContainer();

            expect(appendChildSpy).toHaveBeenCalled();
        });
    });

    describe('imagePreviewStyle', () => {
        it('should return the transform object', () => {
            image.rotate = 90;
            image.scale = 1;
            fixture.detectChanges();

            const result = image.imagePreviewStyle();

            expect(result).toEqual({ transform: 'rotate(90deg) scale(1)' });
        });
    });

    describe('handleToolbarClick', () => {
        it('should call event stopPropagation', () => {
            const button = document.createElement('button');
            const event = button.ownerDocument.createEvent('MouseEvents');
            const propagationSpy = spyOn(event, 'stopPropagation');

            image.handleToolbarClick(event);

            expect(propagationSpy).toHaveBeenCalled();
        });
    });

    describe('closePreview', () => {
        it('should set previewVisible, rotate, scale to default', () => {
            image.closePreview();

            expect(image.previewVisible).toEqual(false);
            expect(image.rotate).toEqual(0);
            expect(image.scale).toEqual(1);
        });
    });

    describe('imageError', () => {
        it('should emit error event', () => {
            const button = document.createElement('button');
            const event = button.ownerDocument.createEvent('ErrorEvent');
            const emitterSpy = spyOn(image.onImageError, 'emit');

            image.imageError(event);

            expect(emitterSpy).toHaveBeenCalledWith(event);
        });
    });
});
