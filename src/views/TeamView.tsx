/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 05.01.2020 19:15

view for a page to display a single team in the app;
this view can be used to display detail information about a team, e.g. as
layover when tapping on a team

the view should contain inforamtion about the team and the team's stats
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
import { Team } from '../models/Team';
import { TeamStats } from '../models/TeamStats';
import * as fonts from '../utils/fonts';
import { ModelSettable } from './ModelSettable';

@component // Enabled data binding syntax
export class TeamView extends Composite implements ModelSettable {

    @property public team: Team;
    @property public stats: TeamStats;
    private font: fonts.CustomFont = fonts.large;
    private headFont: fonts.CustomFont = fonts.largeBold;

    // placeholder for where the image can be in the future
    // private _image: Composite;

    constructor(properties: Properties<TeamView>) {
        super();

        // need to set properties before we reference them (e.g. the model)
        this.set(properties);

        // this._image = new Composite({
        //     layoutData: 'stretchX',
        //     top: 0,
        //     height: 128,
        //     background: 'linear-gradient(45deg, #0288d1 10%, #00dfff)'
        // });
        // create and add composite to display the teams
        this.append(
            // this._image,
            <$>
                <Composite stretchX height={200} top={0} background='linear-gradient(45deg, #0288d1 10%, #00dfff)'/>
                <Composite id='matchStats' top='prev()' height={4 * this.font.viewHeight + this.headFont.viewHeight} left={8} right={0}>
                    <TextView stretchX top={0} height={this.headFont.viewHeight} font={this.headFont} alignment='left'>Matches</TextView>
                    <Composite id='Games' stretchX top='prev()' height={this.font.viewHeight}>
                        <TextView id='gmLabel' left={0} width={200} font={this.font}>Games: </TextView>
                        <TextView id='gmNumber' left='prev()' width={50} font={this.font} bind-text='stats.MatchStats.Games'/>
                    </Composite>
                    <Composite id='wins' stretchX top='prev()' height={this.font.viewHeight}>
                        <TextView id='winsLabel' left={0} width={200} font={this.font}>Wins: </TextView>
                        <TextView id='winsNumber' left='prev()' width={50} font={this.font} bind-text='stats.MatchStats.Wins'/>
                    </Composite>
                    <Composite id='losses' stretchX top='prev()' height={this.font.viewHeight}>
                        <TextView id='lossLabel' left={0} width={200} font={this.font}>Losses: </TextView>
                        <TextView id='lossNumber' left='prev()' width={50} font={this.font} bind-text='stats.MatchStats.Losses'/>
                    </Composite>
                    <Composite id='percentage' stretchX top='prev()' height={this.font.viewHeight}>
                        <TextView id='percLabel' left={0} width={200} font={this.font}>Winning percentage: </TextView>
                        <TextView id='percNumber' left='prev()' width={50} font={this.font} bind-text='stats.MatchStats.WinningPercentage'/>
                    </Composite>
                </Composite>
                <Composite id='matchEventStats' stretchX top='prev()' height={0.5 * this.font.viewHeight}/>
                <Composite id='matchEventStats' top='prev()' height={6 * this.font.viewHeight + this.headFont.viewHeight} left={8} right={0}>
                    <TextView stretchX top={0} height={this.headFont.viewHeight} font={this.headFont} alignment='left'>MatchEvents</TextView>
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
        if (model instanceof Team) {
            this.team = model;
        } else if (model instanceof TeamStats) {
            this.stats = model;
        } else {
            console.error("Unknown type of model", typeof(model));
        }
    }
}
