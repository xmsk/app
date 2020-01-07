/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 05.01.2020 19:15

view model for a single player (PlayerView)
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

// allow passing the player by id or with an existing player object
export type passPlayerType = number | object;

export class PlayerViewModel {

    // "config" options
    public static restPlayerEndpoint: string =
    'http://192.168.0.192:8081/player/';
    // 'http://intra.xmsk.ch:8081/player/';
    public static _restPlayerStatsEndpoint(id: number): string {
        return PlayerViewModel.restPlayerEndpoint + id + '/stats';
    }

    // player object
    @property public player: any;
    @event public onPlayerChanged: ChangeListeners<PlayerViewModel, 'player'>;
    @property public stats: any;
    @event public onStatsChanged: ChangeListeners<PlayerViewModel, 'stats'>;

    constructor(player: passPlayerType) {
        this._setPlayer(player);
        this._setStats(player);
    }

    public refreshData(player: passPlayerType) {
        this._setPlayer(player);
        this._setStats(player);
    }

    private _setPlayer(player: passPlayerType) {
        if (typeof player === "number") {
            restGET(PlayerViewModel.restPlayerEndpoint + player).then(
                (p) => {
                    this.player = p;
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            );
        } else if (typeof player === "object") {
            this.player = player;
        } else {
            // cannot happen
            throw TypeError(
                "Player can only be passed with type number ot object"
            );
        }
    }

    private _setStats(player: passPlayerType) {
        // set default stats, later we should get them from the REST endpoint
        this.stats = {
            Games: 10,
            Touchdowns: 0,
            OnePointTrys: 0,
            TwoPointTrys: 0,
            Interceptions: 0,
            Sacks: 9
        };
        //
        let playerId: number;
        if (typeof player === "number") {
            playerId = player;
        } else if (typeof player === "object") {
            playerId = player.PlayerId;
        } else {
            // cannot happen
            throw TypeError(
                "Player can only be passed with type number ot object"
            );
        }
        // restGET(PlayerViewModel.restPlayerStatsEndpoint(playerId)).then(
        //     (p) => {
        //         this.stats = p;
        //     }
        // ).catch(
        //     (err) => {
        //         console.log(err);
        //     }
        // );
    }

}
