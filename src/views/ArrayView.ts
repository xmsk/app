/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 24.01.2020 18:15

interface that a View containing a ModelArray should implement (i.e. a field
holding data that is an array of Models)

it provides the functions necessary for data handling and creation in the views
have a separate View for arrays because checking for Arrays is cumbersome
*/

import {Model} from '../models/Model';

export interface ArrayView {
    /*
    take a ModelArray and assign it to the internal representation of the array;
    if the implementing class has more than one ModelArray, the function needs
    to handle the correct assignment

    arguments:
        array: ModelArray instance to use with the View

    returns:
        void

    actions:
        add the ModelArray data to the View
    */
    setModelArray(array: Model[]): void;
}
