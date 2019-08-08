import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Image from "gatsby-image";
import SEO from "../components/SEO";
import {
  Box,
  Container,
  Row,
  Col,
  Heading,
  Text,
  Emoji,
  Button
} from "../components/UI";

const propTypes = {
  data: PropTypes.instanceOf(Object)
};

const About = ({
  data: {
    aboutImage: {
      childImageSharp: { fluid: aboutImg }
    }
  }
}) => (
  <Box py={4}>
    <SEO title="About" />
    <Container>
      <Row alignItems="center" flexWrap="wrap">
        <Col flex={["0 0 100%", null, null, "0 0 50%"]}>
          <Heading textAlign="center">About Me</Heading>
          <Heading>Technical Experience</Heading>
          <Text>
            We are well-versed in a variety of operating systems, networks, and
            databases. We use this expertise to help our customers with a
            variety of small to mid-sized projects.
          </Text>
          <Heading>High ROI</Heading>
          <Text>
            Many companies find that constant maintenance eats into their budget
            for new technology. By outsourcing your IT management to us, you can
            focus on what you do best--running your business.
          </Text>
          <Heading>Satisfaction Guaranteed</Heading>
          <Text>
            That's why our goal is to provide an experience that is tailored to
            your company's needs. No matter the budget, we pride ourselves on
            providing professional customer service.
          </Text>
          <Button rounded href="/CV.pdf">
            View CV
          </Button>
        </Col>
        <Col
          order={[-1, null, null, 1]}
          flex={["0 0 100%", null, null, "0 0 50%"]}
        >
          <Image fluid={aboutImg} />
        </Col>
      </Row>
    </Container>
  </Box>
);

About.propTypes = propTypes;

export const pageQuery = graphql`
  query {
    aboutImage: file(relativePath: { regex: "/thai_wake_park/" }) {
      childImageSharp {
        fluid(maxWidth: 564, maxHeight: 564) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default About;
