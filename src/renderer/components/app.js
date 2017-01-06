import {h, Component} from 'preact';
import {Grid, Row, Col, Tree, TreeNode} from '../lightning';

export default class App extends Component {
    render() {
        return (
            <div id="root" class="slds">
                <Grid vertical={true} frame={true}>
                    <Row cols={4} nowrap={true}>
                        <Col cols={1}>
                          <Tree>
                            <TreeNode label="bla">
                            <TreeNode label="blub" leaf={true}>
                            </TreeNode>
                            </TreeNode>
                            <TreeNode label="bla2">
                            <TreeNode label="blub2" leaf={true}>
                            </TreeNode>
                            </TreeNode>
                          </Tree>
                        </Col>
                        <Col cols={3}>Hurra2</Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
