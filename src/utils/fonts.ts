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

// global definitions
let sizeSmall = 8;
let sizeMedium = 16;
let sizeLarge = 24;

export let small: Font = Font.from({
    size: sizeSmall,
    weight: 'normal'
});

export let medium: Font = Font.from({
    size: sizeMedium,
    weight: 'normal'
});

export let large: Font = Font.from({
    size: sizeLarge,
    weight: 'normal'
});
