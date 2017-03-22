import {h, Component} from 'preact';
import { connect } from 'preact-redux';
import {Grid, Row, Col, Tree, TreeNode} from 'litening';
import {DirectoryTree} from './directory_tree';

@connect(state => state)
export default class App extends Component {
    render({ directories }) {
        return (
            <div id="root" class="slds">
                <Grid vertical={true} frame={true}>
                    <Row cols={4} nowrap={true}>
                        <Col cols={1}>
                          <DirectoryTree directories={directories}/>
                        </Col>
                        <Col cols={3}>Hurra2</Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
