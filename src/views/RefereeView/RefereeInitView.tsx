/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 05.01.2020 10:40

Composite representing the initial view in the Referee Page, it is used to
initialize the Match to be officiated
*/
import {
    ActivityIndicator,
    Button,
    Composite,
    Properties,
    TextInput,
    TextView,
  } from 'tabris';
import * as fonts from '../../utils/fonts';
import { SubView } from "../SubView";
import { RefereeView } from './RefereeView';

export class RefereeInitView extends SubView {

    private font: fonts.CustomFont = fonts.large;

    constructor(properties: Properties<RefereeView>) {
        super(properties);
        this.set(properties);

        this.append(
            <$>
                <ActivityIndicator id='activity' class='waitMode' visible={false} center/>
                <Composite id='initPage' class='notWaitMode' stretch>
                    <TextView id='explanation' centerX bottom='next() 24' font={this.font} markupEnabled alignment='centerX'>
                        Enter the Match ID and the Token for the<br/>
                        Match you want to officiate!
                    </TextView>
                    <Composite id='inputBox' center width={300}>
                        <TextInput id='MatchIdInput' stretchX top={0} height={this.font.inputHeight} font={this.font} maxChars={5} message='MatchId' keyboard='decimal'>
                            2
                        </TextInput>
                        <TextInput id='MatchOTPInput' stretchX top='prev() 8' height={this.font.inputHeight} font={this.font} maxChars={10} message='Access Token'>
                            1234567890
                        </TextInput>
                        <Button id='submit' centerX top='prev() 8' font={fonts.medium} onSelect={ () => this.parent(RefereeView).transitionInitToMain() }>
                            Start officiating
                        </Button>
                    </Composite>
                </Composite>
            </$>
        );
    }
}
