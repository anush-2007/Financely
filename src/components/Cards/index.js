import React from 'react'
import "./styles.css";
import { Card, Row } from 'antd';
import Button from '../Button';

function Cards() {
  return (
    <div>
        <Row className="my-row">
            <Card className="my-card" title="Current Balance" >
                <p>₹0</p>
                <Button blue={true} text="Reset Balance" />
            </Card>
        </Row>
    </div>
  )
}

export default Cards