/*
dummy view to check the implementation of the View interface/type
*/

import { Model } from '../models/Model';
import {View} from './View';

export class DummyView implements View {
    public dummyModel: Model;
    public setModel(model: Model): void {
        this.dummyModel = model;
    }
}
