/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 05.01.2020 10:40

view for a page to display a list of players in the app;
implement filter mechanisms to filter the players and possibly allow selecting a
player to display detailed information
*/
import {
    Page,
    Properties,
    TextInput,
    WidgetCollection,
  } from 'tabris';
import { Match } from '../../models/Match';
import {
    rest,
    restHostname
} from '../../utils/rest';
import { Waitable } from '../Waitable';
import { RefereeInitView } from './RefereeInitView';
import { RefereeMainView } from './RefereeMainView';
import { RefereeSubView } from './RefereeSubView';

export class RefereeView extends Page implements Waitable {

    /** the current Composite that is appended to the RefereeView */
    private currentComposite: RefereeSubView;

    constructor(properties: Properties<RefereeView>) {
        super(properties);
        this.set(properties);

        this.start();
    }

    public toggleWaitMode(): void {
        this.currentComposite.toggleWaitMode();
    }

    public transitionInitToMain(): void {
        console.debug("createMainView");
        // needed if we want to make this a @component because the @component
        // decorator overrides the children() method and doesn't allow for
        // .find()
        //
        // let composite: Composite = ev.target.parent();
        // let textInputs: WidgetCollection<TextInput> = composite.find(TextInput);

        let textInputs: WidgetCollection<TextInput> = this.find(TextInput);
        let MatchIdInput: string = textInputs.filter('#MatchIdInput').only().text;
        let MatchOTPInput: string = textInputs.filter('#MatchOTPInput').only().text;
        console.debug("MatchId:", MatchIdInput);
        console.debug("MatchOTP:", MatchOTPInput);

        // verify OTP
        this.toggleWaitMode();
        let url: string = restHostname + "/match/" + MatchIdInput + "/verify/";
        let headers: Headers = new Headers({
            'nffl-match-auth': MatchOTPInput
        });
        rest(
            'GET',
            url,
            undefined,
            headers,
            () => {
                this.toggleWaitMode();
                this.createMainView(Number(MatchIdInput), MatchOTPInput);
            },
            () => this.toggleWaitMode(),
            () => this.toggleWaitMode()
        );
    }

    /**
     * restart officiating (abort or restart after finishing a game)
     */
    public startOver(): void {
        this.currentComposite.dispose();
        this.start();
    }

    /**
     * create the RefereeInitView and append it to the RefereeView
     */
    private start(): void {
        this.currentComposite = <RefereeInitView stretch/>;
        this.append(
            this.currentComposite
        );
    }

    private createMainView(MatchId: number, MatchOTP: string): void {
        this.currentComposite.dispose();
        let mainView: RefereeMainView = <RefereeMainView stretch matchOTP={MatchOTP}/>;
        Match.factory.constructToView(
            MatchId,
            mainView,
            Match
        );
        this.currentComposite = mainView;
        this.append(this.currentComposite);
    }
}
