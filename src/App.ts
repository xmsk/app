/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 04.01.2020 09:19

create the class for the nffl app including the top layer UI elements
*/
import {
  contentView,
  drawer,
  CollectionView,
  Composite,
  NavigationView,
  Page,
  TextView
} from 'tabris';
import {inject} from 'tabris-decorators';
import * as fonts from './fonts';
import {MainViewModel} from './MainViewModel';
import {MainView} from './MainView';

export class App {

  private _navigationView: NavigationView = new NavigationView({
    layoutData: 'stretch',
    drawerActionVisible: true
  });

  // mapping of items available in the app
  private _items: Page[] = [
    new MainView({
      layoutData: 'stretch',
      title: 'Main',
      model: this._main
    })
    ,
    new MainView({
      layoutData: 'stretch',
      title: 'Second',
      model: this._second
    })
  ];

  // collection view for the items listed in the drawer
  private _drawerCollectionView: CollectionView = new CollectionView ({
    layoutData: 'stretchX',
    top: 'prev() 8',
    bottom: 0,
    itemCount: this._items.length,
    cellHeight: 48,
    createCell: () => this._createCell(),
    updateCell: (cell: Composite, index: number) => this._updateCell(cell, index)
  });

  /*
    configure options of the app, possibly with arguments passed
    to the constructor, and add the necessary UI components
  */
  constructor(
    @inject private _main: MainViewModel,
    @inject private _second: MainViewModel
  ) {
    this._main.buttonText = 'cant touch this!';
    this._second.buttonText = 'touch this!';

    // add navigation view with default page
    this._navigationView.append(this._items[0]);
    contentView.append(
      this._navigationView
    );

    // set up drawer
    drawer.enabled = true;
    drawer.append(
      new Composite({
        layoutData: 'stretchX',
        height: 128,
        background: 'linear-gradient(45deg, #0288d1 10%, #00dfff)'
      }),
      this._drawerCollectionView
    );
  }

  private _createCell() {
    // cuold just add a TextView here but we might want to add images later
    const composite = new Composite({
      highlightOnTouch: true
    }).onTap(
      (ev) => {
        const target_index = this._drawerCollectionView.itemIndex(ev.target);
        const target_page = this._items[target_index];
        this._showPage(target_page);
      }
    );
    const textView = new TextView({
      centerY: 0,
      left: 72,
      font: fonts.medium,
      textColor: '#212121'
    });
    composite.append(textView);

    return composite;
  }

  private _updateCell(cell: Composite, index: number) {
    const item = this._items[index];
    const textView = cell.find(TextView).only();

    textView.text = item.title;
  }

  private _showPage(page: Page) {
    drawer.close();
    this._navigationView.pages().detach();
    this._navigationView.append(page);
  }

}
