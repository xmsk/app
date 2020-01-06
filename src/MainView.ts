/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 04.01.2020 09:19

sample view for a page in the app
*/
import {
  Button,
  Constraint,
  Page,
  Properties,
  TextView,
} from 'tabris';
import {
  bindAll,
  component,
} from 'tabris-decorators';
import * as fonts from './fonts';
import {MainViewModel} from './MainViewModel';

@component // Enabled data binding syntax
export class MainView extends Page {

  @bindAll({
    message: '#label.text',
    buttonText: '#button.text'
  })
  public model: MainViewModel;

  private _label: TextView = new TextView({
    id: 'label',
    centerX: 0,
    bottom: Constraint.next,
    padding: 16,
    font: fonts.large,
  });

  private _button: Button = new Button({
    id: 'button',
    centerX: 0,
    centerY: 0,
    text: 'Tap here',
    font: fonts.medium,
  }).onSelect(
    () => this.model.continue()
  );

  constructor(properties: Properties<MainView>) {
    super();
    this.set(properties).append(
      this._label,
      this._button
    );
  }

}
