import React from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton, Col, Row } from 'react-bootstrap';

class PaginationBar extends React.Component {

    render() {
        const totalPages = this.props.totalPages;
        const pageIndex = this.props.pageIndex;
        const items = [];

        const isFirst = pageIndex === 1;
        items.push(<Button onClick={this.props.handlePage} key='prev' value={pageIndex - 1} 
                            disabled={isFirst} variant="warning" size="sm">&lt;</Button>);

        let ellipsisRepeat = false;
        for (let i = 1; i <= totalPages; i++) {
            if (i !== 1 && i !== totalPages && Math.abs(i - pageIndex) > 1) {
                if (!ellipsisRepeat) {
                    items.push(<Button variant="outline-dark" key={i} size="sm" disabled>...</Button>);
                    ellipsisRepeat = true;
                }
            } else {
                const isActive = i === pageIndex;
                items.push(<Button onClick={this.props.handlePage} key={i} value={i} active={isActive} variant="outline-dark">{i}</Button>)
                ellipsisRepeat = false;
            }
        }

        const isLast = pageIndex === totalPages;
        items.push(<Button onClick={this.props.handlePage} key='next' value={pageIndex + 1} 
                            disabled={isLast} variant="warning" size="sm">&gt;</Button>);

        return(
            <Row>
                <Col xs="12" sm="9" className="text-center text-sm-left mb-2">
                    <ButtonGroup>
                        {items}
                    </ButtonGroup>
                </Col>
                <Col className="text-center text-sm-right">
                    <DropdownButton as={ButtonGroup} title="OnPage" variant="dark">
                        <Dropdown.Item as={Button} value={1} onClick={this.props.handleOnPage}>{1}</Dropdown.Item>
                        <Dropdown.Item as={Button} value={3} onClick={this.props.handleOnPage}>{3}</Dropdown.Item>
                        <Dropdown.Item as={Button} value={6} onClick={this.props.handleOnPage}>{6}</Dropdown.Item>
                    </DropdownButton>
                </Col>             
            </Row>
        );
    }

}

export default PaginationBar;