import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap'
import Layout from '../../components/layout'
import styles from '../styles/Home.module.css'

const User: NextPage = () => {
  return (
    <Container>
      <Stack gap={3}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Name...</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card&#39;s content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Stack>
    </Container>
  )
}

export default User
