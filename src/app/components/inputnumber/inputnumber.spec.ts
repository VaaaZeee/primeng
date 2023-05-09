import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InputNumber } from './inputnumber';

@Component({
    template: `<p-inputNumber [(ngModel)]="val" [readonly]="readonly"></p-inputNumber>`
})
class TestInputNumberComponent {
    val: number;
    readonly: boolean = true;
}

describe('InputNumber', () => {
    let inputNumber: InputNumber;
    let testComponent: TestInputNumberComponent;
    let fixture: ComponentFixture<TestInputNumberComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, FormsModule],
            declarations: [InputNumber, TestInputNumberComponent]
        });

        fixture = TestBed.createComponent(TestInputNumberComponent);
        inputNumber = fixture.debugElement.children[0].componentInstance;
        testComponent = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const inputMaskEl = fixture.debugElement.query(By.css('input'));
        expect(inputMaskEl.nativeElement).toBeTruthy();
    });

    it('should disable', () => {
        inputNumber.disabled = true;
        expect(inputNumber.focused).toBe(false);
    });

    it('should return the currency expression', () => {
        inputNumber.currency = 'EUR';
        const ret = inputNumber.getCurrencyExpression();

        expect(ret).not.toBeNull();
    });

    describe('formatValue()', () => {
        it("should return '-'", () => {
            const ret = inputNumber.formatValue('-');
            expect(ret).toEqual('-');
        });
    });

    describe('onUpButtonKeyDown', () => {
        const keyEvent = new KeyboardEvent('keydown', { keyCode: 32 });

        it('should call repeat', () => {
            spyOn(inputNumber, 'repeat');
            inputNumber.onUpButtonKeyDown(keyEvent);
        });
    });

    describe('formatValue()', () => {
        it("should return '-'", () => {
            const ret = inputNumber.formatValue('-');
            expect(ret).toEqual('-');
        });
    });

    it('should return add prefix to formatted value', () => {
        inputNumber.prefix = 'macska';
        const ret = inputNumber.formatValue('asdada-');

        expect(ret).toEqual('macskaNaN');
    });

    it('should return add suffix to formatted value', () => {
        inputNumber.suffix = 'macska';
        const ret = inputNumber.formatValue('asdada-');

        expect(ret).toEqual('NaNmacska');
    });

    it('should return the input value', () => {
        inputNumber.format = false;
        const ret = inputNumber.formatValue('asdada-');
        expect(ret).toEqual('asdada-');
    });

    describe('getPrefixExpression', () => {
        it('should set the prefixChar value', () => {
            inputNumber.prefix = 'asd';
            inputNumber.getPrefixExpression();
            expect(inputNumber.prefixChar).toEqual(inputNumber.prefix);
        });
    });

    describe('getSuffixExpression', () => {
        it('should set the prefixChar value', () => {
            inputNumber.suffix = 'asd';
            inputNumber.getSuffixExpression();
            expect(inputNumber.suffixChar).toEqual(inputNumber.suffix);
        });
    });

    describe('parseValue()', () => {
        it('should return null if the filtered text is not a - sign', () => {
            const ret = inputNumber.parseValue('asdasd');
            console.log(ret);
        });
    });

    describe('parseValue()', () => {
        it('should return null if the filtered text is not a - sign', () => {
            const ret = inputNumber.parseValue('asdasd');
            expect(ret).toBeNull();
        });

        it('should return null if the filtered text is not a - sign', () => {
            const ret = inputNumber.parseValue('asdasd');
            expect(ret).toBeNull();
        });

        it('should return a - sign', () => {
            const ret = inputNumber.parseValue('-');
            expect(ret).toEqual('-');
        });
    });

    describe('allowMinusSign', () => {
        it('should return true, when min value is undefined', () => {
            const ret = inputNumber.allowMinusSign();
            expect(ret).toBe(true);
        });
        it('should return true, when min is negative', () => {
            inputNumber.min = -1;
            const ret = inputNumber.allowMinusSign();
            expect(ret).toBe(true);
        });
        it('should return false, when min is positive', () => {
            inputNumber.min = 1;
            const ret = inputNumber.allowMinusSign();
            expect(ret).toBe(false);
        });
    });

    describe('isDecimalMode', () => {
        it('should be in decimal mode', () => {
            inputNumber.mode = 'decimal';
            const ret = inputNumber.isDecimalMode();
            expect(ret).toBe(true);
        });
    });

    describe('isValueChanged', () => {
        it('should return true if the value is changed', () => {
            const ret = inputNumber.isValueChanged('1', '2');
            expect(ret).toBe(true);
        });

        it('should return true if the new value null', () => {
            const ret = inputNumber.isValueChanged('1', null);
            expect(ret).toBe(true);
        });

        it('should return false if the new value is null and the curent value is nul', () => {
            const ret = inputNumber.isValueChanged(null, null);
            expect(ret).toBe(false);
        });

        it('should return true if th value are not changed', () => {
            const ret = inputNumber.isValueChanged('1', '1');
            expect(ret).toBe(true);
        });
    });

    describe('validateValue', () => {
        it('should return null if the value i - sign', () => {
            const ret = inputNumber.validateValue('-');
            expect(ret).toBeNull();
        });
        it('should return null if the value i - sign', () => {
            const ret = inputNumber.validateValue('-');
            expect(ret).toBeNull();
        });
        it('should return the min attribute if it is bigger than the value', () => {
            inputNumber.min = 2;
            const ret = inputNumber.validateValue(1);
            expect(ret).toBe(2);
        });
        it('should return the max attribute if it is smaller than the value', () => {
            inputNumber.max = 2;
            const ret = inputNumber.validateValue(4);
            expect(ret).toBe(2);
        });
        it('should return the value if it is smaller than min the value', () => {
            inputNumber.max = 2;
            const ret = inputNumber.validateValue(1);
            expect(ret).toBe(1);
        });
    });
    describe('onUpButtonKeyUp', () => {
        it('should call clear Timer', () => {
            spyOn(inputNumber, 'clearTimer');
            inputNumber.onUpButtonKeyUp();
            expect(inputNumber.clearTimer).toHaveBeenCalled();
        });
    });
    describe('onDownButtonMouseUp', () => {
        it('should call clear Timer', () => {
            spyOn(inputNumber, 'clearTimer');
            inputNumber.onDownButtonMouseUp();
            expect(inputNumber.clearTimer).toHaveBeenCalled();
        });
    });
    describe('onDownButtonMouseLeave', () => {
        it('should call clear Timer', () => {
            spyOn(inputNumber, 'clearTimer');
            inputNumber.onDownButtonMouseLeave();
            expect(inputNumber.clearTimer).toHaveBeenCalled();
        });
    });
    describe('onDownButtonKeyUp', () => {
        it('should call clear Timer', () => {
            spyOn(inputNumber, 'clearTimer');
            inputNumber.onDownButtonKeyUp();
            expect(inputNumber.clearTimer).toHaveBeenCalled();
        });
    });
    describe('onUserInput', () => {
        let keyEvent = new KeyboardEvent('keydown', { key: 'a' });

        it('should return if the input is readonly', () => {
            inputNumber.readonly = true;
            const ret = inputNumber.onUserInput(keyEvent);
            expect(ret).toBeUndefined;
        });
        it('should set isSpecialChar to false', () => {
            inputNumber.readonly = false;
            inputNumber.lastValue = 'a';
            const ret = inputNumber.onUserInput(keyEvent);
            expect(inputNumber.isSpecialChar).toBe(false);
        });
    });
    describe('onInputKeyDown', () => {
        let mockEvemt = {
            target: { value: 'asd', selectionStart: 1, selectionEnd: 1 },
            shiftKey: true
        };

        it('should return if the input is readonly', () => {
            inputNumber.readonly = true;
            const ret = inputNumber.onInputKeyDown(mockEvemt);
            expect(ret).toBeUndefined;
        });
    });

    describe('deleteRange', () => {
        it('should return empty string', () => {
            const value = { length: 3, slice: (tmp = 0, tmp2 = 0) => 'asd' };
            const ret = inputNumber.deleteRange(value, 1, 2);
            expect(ret).toEqual('asdasd');
        });
        it('should return empty string', () => {
            const value = { length: 1, slice: (tmp = 0, tmp2 = 0) => 'asd' };
            const ret = inputNumber.deleteRange(value, 0, 2);
            expect(ret).toEqual('asd');
        });
    });
});
