import {h, Component} from 'preact';
import {
    AbsoluteCenter,
    Grid,
    Row,
    Col,
    Container,
    Figure,
} from 'litening';

export const ImageSelect = ({
    currentDirectory,
    ...props
}) => {
    if (!currentDirectory.directoryId) {
        return (
            <AbsoluteCenter>Select directory ...</AbsoluteCenter>
        );
    }
    console.log(currentDirectory.files);
    return (
        <Grid vertical={true}>
            <Row cols={4}>
                {currentDirectory
                    .files
                    .map(file => (
                        <Col align="center"><Figure src={file.url} caption={file.name}/></Col>
                    ))}
            </Row>
        </Grid>
    );
}
