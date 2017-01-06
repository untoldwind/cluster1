import {h, Component} from 'preact';
import {Grid, Row, Col} from '../lightning';

export default class App extends Component {
    render() {
        return (
            <div id="root" class="slds">
                <Grid vertical={true} frame={true}>
                    <Row cols={4} nowrap={true}>
                        <Col cols={1}>Hurra2</Col>
                        <Col cols={3}>Hurra2</Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
