/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 24.01.2020 18:15

interface that a View containing a ModelList should implement (i.e. a field
holding data that is an list of Models)

it provides the functions necessary for data handling and creation in the views
*/

import { List } from 'tabris-decorators';
import {Model} from '../models/Model';

export interface ModelListSettable {
    /*
    take a ModelList and assign it to the internal representation of the list;
    if the implementing class has more than one ModelList, the function needs
    to handle the correct assignment

    arguments:
        list: ModelList instance to use with the View

    returns:
        void

    actions:
        add the ModelList data to the View
    */
    setModelList(list: List<Model>): void;
}
