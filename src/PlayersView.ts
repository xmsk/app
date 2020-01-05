/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 05.01.2020 10:40

view for a page to display a list of players in the app;
implement filter mechanisms to filter the players and possibly allow selecting a
player to display detailed information
*/
import {
  Button,
  CollectionView,
  Page,
  Properties,
  TextView,
  Composite
} from 'tabris';
import {
  component,
  bindAll
} from 'tabris-decorators';
import {PlayersViewModel} from './PlayersViewModel';
import * as fonts from './fonts';

@component // Enabled data binding syntax
export class PlayersView extends Page {

  // need the bind statement so model is a property so it gets assigned by the
  // constructor as called in the App class
  //
  // use more binds for filter fields
  @bindAll({
    heading: '#heading.text'
  })
  public model: PlayersViewModel;

  private _playersCollectionView: CollectionView;

  constructor(properties: Properties<PlayersView>) {
    super();

    // need to set properties before we reference them (e.g. the model)
    this.set(properties);
    this.model.onPlayersChanged(
      () => this._rebuildPlayersCollectionView()
    );

    // create and add collection to display the players
    this._playersCollectionView = new CollectionView({
      layoutData: 'stretchX',
      top: 'prev() 8',
      bottom: 0,
      itemCount: this.model.players.length,
      createCell: () => this._createPlayerCell(),
      updateCell: (cell: Composite, index: number) => this._updatePlayerCell(cell, index)
    });
    this.append(
      new TextView({
        id: 'heading',
        centerX: 0,
        top: 0,
        font: fonts.large
      }),
      new Button({
        id: 'refresh',
        centerX: 0,
        top: 'prev() 8',
        text: 'Refresh',
        font: fonts.large
      }).onSelect(
        () => this.model.refreshPlayers()
      ),
      this._playersCollectionView
    );
  }

  private _createPlayerCell() {
    let cell = new Composite({
      highlightOnTouch: true
    });

    // add text boxes for player information
    const tv_JerseyNumber = new TextView({
      id: "JerseyNumber",
      centerY: 0,
      left: 0,
      width: 40,
      alignment: 'right',
      font: fonts.large,
      textColor: '#212121'
    });
    cell.append(tv_JerseyNumber);

    const tv_FirstName = new TextView({
      id: "FirstName",
      centerY: 0,
      left: 'prev() 12',
      width: 150,
      alignment: 'left',
      font: fonts.large,
      textColor: '#212121'
    });
    cell.append(tv_FirstName);

    const tv_LastName = new TextView({
      id: "LastName",
      centerY: 0,
      left: 'prev() 8',
      width: 150,
      alignment: 'left',
      font: fonts.large,
      textColor: '#212121'
    });
    cell.append(tv_LastName);

    return cell;
  }

  private _updatePlayerCell(cell: Composite, index: number) {
    const player = this.model.players[index];
    const tv_JerseyNumber: TextView = cell.find(TextView).only('#JerseyNumber');
    const tv_FirstName: TextView = cell.find(TextView).only('#FirstName');
    const tv_LastName: TextView = cell.find(TextView).only('#LastName');

    tv_JerseyNumber.text = player.JerseyNumber;
    tv_FirstName.text = player.FirstName;
    tv_LastName.text = player.LastName;
  }

  private _rebuildPlayersCollectionView() {
    this._playersCollectionView.itemCount = this.model.players.length;
  }

}
