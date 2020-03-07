/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 04.01.2020 09:19

create the class for the nffl app including the top layer UI elements
*/
import {
    contentView,
    drawer,
} from 'tabris';
import {
    Composite,
    NavigationView,
    Page,
    TextView,
} from 'tabris';
import { Cell, List, ListView } from 'tabris-decorators';
import {MainViewModel} from './models/MainViewModel';
import { Player } from './models/Player';
import { Team } from './models/Team';
import * as fonts from './utils/fonts';
import {MainView} from './views/MainView';
import {PlayersView} from './views/PlayersView';
import { RefereeView } from './views/RefereeView/RefereeView';
import { ScheduleView } from './views/ScheduleView/ScheduleView';
import { TeamsView } from './views/TeamsView';

export class App {

    // view models
    private _main: MainViewModel;
    // global navigation view
    private navigationView: NavigationView;
    // mapping of items available in the app
    private items: List<Page> = new List();
    // collection view for the items listed in the drawer
    private drawerListView: ListView<Page>;

    /*
        configure options of the app, possibly with arguments passed
        to the constructor, and add the necessary UI components
    */
    constructor() {
        // create view models for top level applications
        this._main = new MainViewModel();

        // main page
        let main = <MainView stretch title='Main' model={this._main}/>;
        this._main.buttonText = 'cant touch this!';
        this.items.push(main);

        // schedule page
        console.log("creating schedule");
        let schedule = <ScheduleView stretch title='Schedule'/>;
        this.items.push(schedule);

        // players page
        let players = <PlayersView stretch title='Players'/>;
        Player.listFactory.constructToView("", players, Player);
        this.items.push(players);

        // teams page
        let teams = <TeamsView stretch title='Teams'/>;
        Team.listFactory.constructToView("", teams, Team);
        this.items.push(teams);

        // page for officiating Matches
        let referee = <RefereeView stretch title='Referee'/>;
        this.items.push(referee);

        // create and add navigation view with default page
        this.navigationView = <NavigationView stretch drawerActionVisible/>;
        this.navigationView.append(this.items[1]);
        contentView.append(
            this.navigationView
        );

        // set up drawer
        this.drawerListView = <ListView stretchX top='prev() 8' bottom={0} items={this.items}>
            <Cell height={48} onTap={
                (ev) => {
                    const target_index = this.drawerListView.itemIndex(ev.target);
                    const target_page = this.items[target_index];
                    this._showPage(target_page);
                }
            }>
                <TextView centerY left={72} font={fonts.medium} textColor='#212121'bind-text='item.title'/>
            </Cell>
        </ListView>;
        drawer.enabled = true;
        drawer.append(
            new Composite({
                layoutData: 'stretchX',
                height: 128,
                background: 'linear-gradient(45deg, #0288d1 10%, #00dfff)'
            }),
            this.drawerListView
        );
    }

    private _showPage(page: Page) {
        drawer.close();
        this.navigationView.pages().detach();
        this.navigationView.append(page);
    }

}
