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
    property
} from 'tabris-decorators';
import * as fonts from './fonts';
import {PlayerViewModel} from './PlayerViewModel';

@component // Enabled data binding syntax
export class PlayerView extends Composite {

    @property public model: PlayerViewModel;

    // placeholder for where the image can be in the future
    private _image: Composite;

    constructor(properties: Properties<PlayerView>) {
        super();

        // need to set properties before we reference them (e.g. the model)
        this.set(properties);
        this.model.onPlayerChanged(
            () => this._redraw()
        );
        this.model.onStatsChanged(
            () => this._redraw()
        );

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
                <Composite stretchX height={300} top={0} background='linear-gradient(45deg, #0288d1 10%, #00dfff)'/>
                <Composite id='playerName' stretchX top='prev() 8' height={35}>
                    <TextView id='Name' left={16} width={150} font={fonts.medium}>{this.model.player.FirstName + " " + this.model.player.LastName}</TextView>
                </Composite>
                <Composite id='stats' stretch top='prev() 8' bottom='next()'>
                    <Composite id='Games' stretchX top={0} height={35}>
                        <TextView id='gmLabel' left={16} width={150} font={fonts.medium}>Games: </TextView>
                        <TextView id='gmNumber' left='prev() 8' width={50} font={fonts.medium}>{this.model.stats.Games}</TextView>
                    </Composite>
                    <Composite id='touchdowns' stretchX top='prev() 8' height={35}>
                        <TextView id='tdLabel' left={16} width={150} font={fonts.medium}>Touchdowns: </TextView>
                        <TextView id='tdNumber' left='prev() 8' width={50} font={fonts.medium}>{this.model.stats.Touchdowns}</TextView>
                    </Composite>
                    <Composite id='onePointTrys' stretchX top='prev() 8' height={35}>
                        <TextView id='optLabel' left={16} width={150} font={fonts.medium}>One Point Trys: </TextView>
                        <TextView id='optNumber' left='prev() 8' width={50} font={fonts.medium}>{this.model.stats.OnePointTrys}</TextView>
                    </Composite>
                    <Composite id='twoPointTry' stretchX top='prev() 8' height={35}>
                        <TextView id='tptLabel' left={16} width={150} font={fonts.medium}>Two Point Trys: </TextView>
                        <TextView id='tptNumber' left='prev() 8' width={50} font={fonts.medium}>{this.model.stats.TwoPointTrys}</TextView>
                    </Composite>
                    <Composite id='interceptions' stretchX top='prev() 8' height={35}>
                        <TextView id='intLabel' left={16} width={150} font={fonts.medium}>Interceptions: </TextView>
                        <TextView id='intNumber' left='prev() 8' width={50} font={fonts.medium}>{this.model.stats.Interceptions}</TextView>
                    </Composite>
                    <Composite id='sacks' stretchX top='prev() 8' height={35}>
                        <TextView id='sxLabel' left={16} width={150} font={fonts.medium}>Sacks: </TextView>
                        <TextView id='sxNumber' left='prev() 8' width={50} font={fonts.medium}>{this.model.stats.Sacks}</TextView>
                    </Composite>
                </Composite>
            </$>
        );
    }

    private _redraw() {
        // implement;
    }

}
