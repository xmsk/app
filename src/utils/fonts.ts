/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 04.01.2020 09:19

collection of fonts to be used in the app
naming convention is <size>-<weight> where
    * <size>: is the description of the font size, e.g. small, medium, large,
        etc.
    * <weight>: is the weight of the font, e.g. 'light', 'bold', etc.; 'normal'
        can be omitted
*/
import {Font} from 'tabris';

export class CustomFont extends Font {
    get viewHeight() {
        return this.size + 8;
    }

    get inputHeight() {
        return this.size + 36;
    }

    get buttonHeight() {
        return this.size + 30;
    }

    get pickerHeight() {
        return this.size + 34;
    }
}

// global definitions
let sizeSmall: number = 8;
let sizeMedium: number = 16;
let sizeLarge: number = 24;

export let small: CustomFont = new CustomFont(sizeSmall, [], 'normal');

export let medium: CustomFont = new CustomFont(sizeMedium, [], 'normal');

export let large: CustomFont = new CustomFont(sizeLarge, [], 'normal');
