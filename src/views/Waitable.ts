/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 24.01.2020 18:15

interface that a View has to implement if it wants to be able to go into "wait
mode", i.e. change the view in a way that indicates we are waiting for
something, e.g. the finishing of a REST request
*/

export interface Waitable {
    /**
     * hide/unhide all necessary elements when entering/leaving an async action
     *
     * one way of implementing this in a View is to have a private boolean field
     * indicating whether the View is currently in wait mode; the View can then
     * implement all components that have to change with either a class
     * 'waitState' (indicating the visible flag of this component should be
     * equal to the waitState variable) or 'notWaitState' (indicating the
     * visible flag of this component should be the opposite of the waitState
     * variable)
     */
    toggleWaitMode(): void;
}
