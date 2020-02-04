/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 05.01.2020 10:40

view for a page to display a list of players in the app;
implement filter mechanisms to filter the players and possibly allow selecting a
player to display detailed information
*/
import {
  Action,
  Button,
  ChangeListeners,
  CollectionView,
  Composite,
  NavigationView,
  Page,
  Popover,
  Properties,
  TextView,
  Widget,
  WidgetTapEvent,
} from 'tabris';
import {
  component,
  event,
  property,
} from 'tabris-decorators';
import { Player } from '../models/Player';
import { PlayerStats } from '../models/PlayerStats';
import * as fonts from '../utils/fonts';
import { ArrayView } from './ArrayView';
import {PlayerView} from './PlayerView';

@component // Enabled data binding syntax
export class PlayersView extends Page implements ArrayView {

  @property public players: Player[] = [];
  @event public onPlayersChanged: ChangeListeners<PlayersView, 'players'>;
  private _playersCollectionView: CollectionView;

  constructor(properties: Properties<PlayersView>) {
    super();

    // need to set properties before we reference them (e.g. the model)
    this.set(properties);
    this.onPlayersChanged(
      () => this._rebuildPlayersCollectionView()
    );

    // create and add collection to display the players
    this._playersCollectionView = new CollectionView({
      layoutData: 'stretchX',
      // height: 500,
      bottom: 'next()',
      top: 'prev() 8',
      itemCount: this.players.length,
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
        () => this.refreshPlayers()
      ),
      this._playersCollectionView
    );
  }

  public setModelArray(array: Player[]): void {
    this.players = array;
  }

  public refreshPlayers() {
    Player.arrayFactory.constructToView("", this, Player);
  }

  private _createPlayerCell() {
    let cell = new Composite({
      highlightOnTouch: true
    }).onTap(
      (ev) => {
        console.log('click player');
        console.log(ev.target);
        this._openPlayerPopover(ev);
      }
    );

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
    const player = this.players[index];
    const tv_JerseyNumber: TextView = cell.find(TextView).only('#JerseyNumber');
    const tv_FirstName: TextView = cell.find(TextView).only('#FirstName');
    const tv_LastName: TextView = cell.find(TextView).only('#LastName');

    tv_JerseyNumber.text = String(player.JerseyNumber);
    tv_FirstName.text = player.FirstName;
    tv_LastName.text = player.LastName;
  }

  private _rebuildPlayersCollectionView() {
    this._playersCollectionView.itemCount = this.players.length;
  }

  private _openPlayerPopover(ev: WidgetTapEvent<Widget>) {
    console.log("function open player popover");
    const playerIndex = this._playersCollectionView.itemIndex(ev.target);
    const player = this.players[playerIndex];
    const playerView = <PlayerView stretch/>;
    Player.factory.constructToView(player, playerView, Player);
    PlayerStats.factory.constructToView(player.PlayerId, playerView, PlayerStats);
    const popover = Popover.open(
      <Popover>
        <NavigationView stretch>
          <Action placement='navigation' title='Close' onSelect={() => popover.close()}/>
          <Page title='Popover'/>
        </NavigationView>
      </Popover>
    );
    let page = popover.contentView.find('Page').only();
    playerView.appendTo(page);
  }
}
