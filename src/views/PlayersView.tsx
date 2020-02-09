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
  NavigationView,
  Page,
  Popover,
  Properties,
  TextView,
  Widget,
  WidgetTapEvent,
} from 'tabris';
import {
  Cell,
  component,
  List,
  ListView,
  property,
} from 'tabris-decorators';
import { Player } from '../models/Player';
import { PlayerStats } from '../models/PlayerStats';
import * as fonts from '../utils/fonts';
import { ModelListSettable } from './ModelListSettable';
import {PlayerView} from './PlayerView';

@component // Enabled data binding syntax
export class PlayersView extends Page implements ModelListSettable {

  @property public players: List<Player> = new List<Player>();
  private _playersListView: ListView<Player>;

  constructor(properties: Properties<PlayersView>) {
    super();

    // need to set properties before we reference them (e.g. the model)
    this.set(properties);

    // create and add ListView to display the players
    this._playersListView = <ListView stretchX bottom='next()' top='prev() 8' items={this.players}>
      <Cell highlightOnTouch onTap={
        (ev) => {
          console.log('click player');
          console.log(ev.target);
          this._openPlayerPopover(ev);
        }
      }>
        <TextView centerY left={0} width={40} alignment='right' font={fonts.large} textColor='#212121' bind-text='item.JerseyNumber'/>
        <TextView centerY left='prev() 12' width={150} alignment='left' font={fonts.large} textColor='#212121' bind-text='item.FirstName'/>
        <TextView centerY left='prev() 8' width={150} alignment='left' font={fonts.large} textColor='#212121' bind-text='item.LastName'/>
      </Cell>
    </ListView>;

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
      this._playersListView
    );
  }

  public setModelList(list: List<Player>): void {
    this.players = list;
    // have to update ListView items because assignment destroys the object?
    this._playersListView.items = this.players;
  }

  public refreshPlayers() {
    Player.listFactory.constructToView("", this, Player);
  }

  private _openPlayerPopover(ev: WidgetTapEvent<Widget>) {
    console.log("function open player popover");
    const playerIndex = this._playersListView.itemIndex(ev.target);
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
