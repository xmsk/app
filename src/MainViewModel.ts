/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 04.01.2020 09:19

sample view model for a page in the app
*/
import {
  injectable,
  property
} from 'tabris-decorators';

@injectable
export class MainViewModel {

  @property public message: string = '';
  @property public buttonText: string = '';

  public continue() {
    if (this.message === '') {
      this.message = 'Tabris.js rocks!';
    } else {
      this.message = '';
    }
  }

}
