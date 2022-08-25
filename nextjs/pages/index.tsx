import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const url = process.env.NEXT_PUBLIC_EXPRESS_ENDPOINT as string;

  const sendEmail = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_ENDPOINT}/api/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  };

  return (
    <Layout>
      <Row>
        <Col>This is profile designer</Col>
        
        <Button onClick={ sendEmail }>
          Submit
        </Button>
      </Row>
    </Layout>
  )
}

export default Home
