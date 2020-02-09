/*
dummy view to check the implementation of the View interface/type
*/

import { Model } from '../models/Model';
import { ModelSettable } from './ModelSettable';

export class DummyView implements ModelSettable {
    public dummyModel: Model;
    public setModel(model: Model): void {
        this.dummyModel = model;
    }
}
