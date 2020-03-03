/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 05.01.2020 19:15

view for a page to display a single player in the app;
this view can be used to display detail information about a player, e.g. as
layover when tapping on a player

the view should contain inforamtion about the player and the player's stats
*/
import {
    Composite,
    Properties,
    TextView,
} from 'tabris';
import {
    component,
    property,
} from 'tabris-decorators';
import { Model } from '../models/Model';
import { Player } from '../models/Player';
import { PlayerStats } from '../models/PlayerStats';
import * as fonts from '../utils/fonts';
import { ModelSettable } from './ModelSettable';

@component // Enabled data binding syntax
export class PlayerView extends Composite implements ModelSettable {

    @property public player: Player;
    @property public stats: PlayerStats;
    private font: fonts.CustomFont = fonts.large;
    private headFont: fonts.CustomFont = fonts.largeBold;

    // placeholder for where the image can be in the future
    // private _image: Composite;

    constructor(properties: Properties<PlayerView>) {
        super();

        // need to set properties before we reference them (e.g. the model)
        this.set(properties);

        // this._image = new Composite({
        //     layoutData: 'stretchX',
        //     top: 0,
        //     height: 128,
        //     background: 'linear-gradient(45deg, #0288d1 10%, #00dfff)'
        // });
        // create and add composite to display the players
        this.append(
            // this._image,
            <$>
                <Composite stretchX height={200} top={0} background='linear-gradient(45deg, #0288d1 10%, #00dfff)'/>
                <TextView left={8} right={0} top='prev()' height={this.headFont.viewHeight} font={this.headFont} alignment='left'>Stats</TextView>
                <Composite id='stats' stretchY left={8} right='next()' top='prev()' bottom='next()'>
                    <Composite id='Games' stretchX top={0} height={this.font.viewHeight}>
                        <TextView id='gmLabel' left={0} width={200} font={this.font}>Games: </TextView>
                        <TextView id='gmNumber' left='prev()' width={50} font={this.font} bind-text='stats.Games'/>
                    </Composite>
                    <Composite id='touchdowns' stretchX top='prev()' height={this.font.viewHeight}>
                        <TextView id='tdLabel' left={0} width={200} font={this.font}>Touchdowns: </TextView>
                        <TextView id='tdNumber' left='prev()' width={50} font={this.font} bind-text='stats.MatchEventStats.Touchdowns'/>
                    </Composite>
                    <Composite id='onePointTrys' stretchX top='prev()' height={this.font.viewHeight}>
                        <TextView id='optLabel' left={0} width={200} font={this.font}>One Point Trys: </TextView>
                        <TextView id='optNumber' left='prev()' width={50} font={this.font} bind-text='stats.MatchEventStats.OnePointTrys'/>
                    </Composite>
                    <Composite id='twoPointTry' stretchX top='prev()' height={this.font.viewHeight}>
                        <TextView id='tptLabel' left={0} width={200} font={this.font}>Two Point Trys: </TextView>
                        <TextView id='tptNumber' left='prev()' width={50} font={this.font} bind-text='stats.MatchEventStats.TwoPointTrys'/>
                    </Composite>
                    <Composite id='interceptions' stretchX top='prev()' height={this.font.viewHeight}>
                        <TextView id='intLabel' left={0} width={200} font={this.font}>Interceptions: </TextView>
                        <TextView id='intNumber' left='prev()' width={50} font={this.font} bind-text='stats.MatchEventStats.Interceptions'/>
                    </Composite>
                    <Composite id='sacks' stretchX top='prev()' height={this.font.viewHeight}>
                        <TextView id='sxLabel' left={0} width={200} font={this.font}>Sacks: </TextView>
                        <TextView id='sxNumber' left='prev()' width={50} font={this.font} bind-text='stats.MatchEventStats.Sacks'/>
                    </Composite>
                    <Composite id='safeties' stretchX top='prev()' height={this.font.viewHeight}>
                        <TextView id='sfLabel' left={0} width={200} font={this.font}>Safeties: </TextView>
                        <TextView id='sfNumber' left='prev()' width={50} font={this.font} bind-text='stats.MatchEventStats.Safeties'/>
                    </Composite>
                </Composite>
            </$>
        );
    }

    public setModel(model: Model ) {
        if (model instanceof Player) {
            this.player = model;
        } else if (model instanceof PlayerStats) {
            this.stats = model;
        } else {
            console.error("Unknown type of model", typeof(model));
        }
    }
}
