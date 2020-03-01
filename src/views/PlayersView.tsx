/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 05.01.2020 10:40

view for a page to display a list of players in the app;
implement filter mechanisms to filter the players and possibly allow selecting a
player to display detailed information
*/
import {
  Action,
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
  private listFont: fonts.CustomFont = fonts.large;
  private listHeadingFont: fonts.CustomFont = fonts.largeBold;

  constructor(properties: Properties<PlayersView>) {
    super();

    // need to set properties before we reference them (e.g. the model)
    this.set(properties);

    this.append(
      <$>
        <TextView id='heading' stretchX top={0} height={fonts.largeBold.viewHeight} font={fonts.largeBold} alignment='left'>NFFL Players</TextView>
        <Composite id='listHeaders' stretchX top='prev() 8' height={this.listHeadingFont.viewHeight}>
            <TextView centerY left='prev() 8' width={this.listHeadingFont.viewHeight} height={this.listHeadingFont.viewHeight} alignment='right' font={this.listHeadingFont} textColor='#212121' text='#'/>
            <TextView centerY left='prev()' width={this.listHeadingFont.viewHeight} height={this.listHeadingFont.viewHeight} alignment='centerX' font={this.listHeadingFont} textColor='#212121' text=''/>
            <TextView centerY left='prev()' right='next()' height={this.listHeadingFont.viewHeight} font={this.listHeadingFont} alignment='left' textColor='#212121' text='FirstName'/>
            <TextView centerY left='prev()' right='next()' height={this.listHeadingFont.viewHeight} font={this.listHeadingFont} alignment='left' textColor='#212121' text='LastName'/>
            <TextView centerY left='prev()' right='next()' height={this.listHeadingFont.viewHeight} font={this.listHeadingFont} alignment='left' textColor='#212121' text='TeamName'/>
        </Composite>
        <ListView id='playersList' stretchX bottom='next()' top='prev()' items={this.players}>
          <Cell highlightOnTouch onTap={
            (ev) => {
              console.log('click player');
              console.log(ev.target);
              this._openPlayerPopover(ev);
            }
          }>
            <TextView centerY left='prev() 8' width={this.listFont.viewHeight} height={this.listFont.viewHeight} alignment='right' font={this.listFont} textColor='#212121' bind-text='item.JerseyNumber'/>
            <TextView centerY left='prev()' width={this.listFont.viewHeight} height={this.listFont.viewHeight} alignment='centerX' font={this.listFont} textColor='#212121' text='-'/>
            <TextView centerY left='prev()' right='next()' height={this.listFont.viewHeight} font={this.listFont} alignment='left' textColor='#212121' bind-text='item.FirstName'/>
            <TextView centerY left='prev()' right='next()' height={this.listFont.viewHeight} font={this.listFont} alignment='left' textColor='#212121' bind-text='item.LastName'/>
            <TextView centerY left='prev()' right='next()' height={this.listFont.viewHeight} font={this.listFont} alignment='left' textColor='#212121' bind-text='item.Team.TeamName'/>
          </Cell>
        </ListView>
      </$>
    );
    // assign ListView for easier handling
    this._playersListView = this._find(ListView).filter('#playersList').only();
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
          <Page title={player.Identification}/>
        </NavigationView>
      </Popover>
    );
    let page = popover.contentView.find('Page').only();
    playerView.appendTo(page);
  }
}
