/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 11.01.2020 19:40

abstract base class for the sub views that are attached to the RefereeView;
needed to have a type that is both a Composite and implements Waitable
*/
import { Composite } from 'tabris';
import { Waitable } from '../Waitable';

export abstract class RefereeSubView extends Composite implements Waitable {

    private waitMode: boolean = false;

    /** default implementation for the sub classes */
    public toggleWaitMode(): void {
        this.waitMode = !this.waitMode;

        this._find('.waitMode').forEach(
            (item) => item.visible = this.waitMode
        );
        this._find('.notWaitMode').forEach(
            (item) => item.visible = !this.waitMode
        );
    }
}
