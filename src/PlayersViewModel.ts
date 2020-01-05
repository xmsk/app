/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 05.01.2020 10:40

view model for a list of players (PlayersView)
*/
import {
  ChangeListeners
} from 'tabris';
import {
  event,
  property
} from 'tabris-decorators';
import {
  restGET
} from './utils/rest';

export class PlayersViewModel {

  // "config" options
  public static _restPlayerEndpoint: string =
    'http://intra.xmsk.ch:8081/player/';

  @property public players: any[];
  @event public onPlayersChanged: ChangeListeners<PlayersViewModel, 'players'>;
  @property public heading: string = 'NFFL Players';

  constructor() {
    this.players = [];
    this._getPlayers();
  }

  public refreshPlayers() {
    this._getPlayers();
  }

  private _getPlayers() {
    restGET(PlayersViewModel._restPlayerEndpoint).then(
      (p) => {
        this.players = p;
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

}
