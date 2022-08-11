import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Layout>
      <Row>
        <Col>This is profile designer</Col>
      </Row>
    </Layout>
  )
}

export default Home
