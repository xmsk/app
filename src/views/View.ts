/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 24.01.2020 18:15

interface that a View should implement

it provides the functions necessary for data handling and creation in the views
*/

import {Model} from '../models/Model';

export interface View {
    /*
    take a model and assign it to the internal representation of the model; if
    the implementing class has more than one model, the function needs to hanfle
    the correct assignment

    arguments:
        model: Model instance to use with the View

    returns:
        void

    actions:
        add the Model data to the View
    */
    setModel(model: Model): void;
}
