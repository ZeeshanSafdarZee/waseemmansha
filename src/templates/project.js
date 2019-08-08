import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Image from "gatsby-image";
import { css } from "@emotion/core";
import SEO from "../components/SEO";
// import { Gallery } from "gatsby-theme-gallery";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Modal,
  Col,
  Row
} from "../components/UI";
import Gallery from "../components/Gallery/Gallery";
import Controls from "../components/Project/Controls";
import theme from "../utils/theme";

const propTypes = {
  pageContext: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    next: PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string
    })
  }),
  data: PropTypes.shape({
    ProjectImages: PropTypes.shape({
      childrenFile: PropTypes.array
    })
  })
};

const projectTitleStyles = css`
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -8px;
    width: 50px;
    height: 2px;
    transform: translateX(-50%);
    background-color: ${theme.colors.primary};
  }
`;
const modalIFrameWrapper = css`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
`;
const modalIFrame = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ProjectPage = ({
  pageContext: { name, description, links, next, prev },
  data: {
    ProjectImages: { childrenFile: photos }
  }
}) => {
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = url => {
    setShow(true);
    setUrl(url);
  };
  const gotoUrl = url => (window.location.href = url);
  return (
    <>
      <SEO title={name} description={description} />
      <Container>
        <Box py={5} mx="auto" textAlign="center" css={{ maxWidth: "720px" }}>
          <Heading css={projectTitleStyles}>{name}</Heading>
          <Text>{description}</Text>
          {links &&
            links.map(link => {
              return link.demo ? (
                <Button
                  space
                  key={link.url}
                  onClick={() => handleShow(link.url)}
                >
                  {link.text}
                </Button>
              ) : (
                <Button space key={link.url} href={link.url}>
                  {link.text}
                </Button>
              );
            })}
        </Box>
      </Container>
      <Modal
        isOpen={show}
        onClose={handleClose}
        header={
          <Heading color="dark" m={0}>
            {url}
          </Heading>
        }
      >
        <div css={modalIFrameWrapper}>
          <iframe css={modalIFrame} src={url}></iframe>
        </div>
      </Modal>
      <Box bg="bgGreyColor" py={5}>
        <Container>
          <Row alignItems="start" flexWrap="wrap">
            <Col flex={[null, null, null, "0 0 30%"]}>
              <Heading>Tool Used</Heading>
              <Heading>
                <Text>
                  <ul>
                    <li>Gatsby</li>
                    <li>React</li>
                    <li>CMS</li>
                  </ul>
                </Text>
              </Heading>
            </Col>
            <Col
              order={[1, null, null, 1]}
              flex={["0 0 100%", null, null, "0 0 70%"]}
            >
              <Gallery galleryImages={photos} />
            </Col>
          </Row>

          {/* <Box textAlign="center" mx="auto" css={{ maxWidth: "720px" }}>
            {photos.map((photo, i) => (
              <Image
                key={photo.id}
                css={{ marginBottom: "1.5rem" }}
                fluid={photo.childImageSharp.fluid}
                alt={`${name}-${i}`}
              />
            ))}
          </Box> */}
        </Container>
      </Box>
      <Controls next={next} prev={prev} />
    </>
  );
};

ProjectPage.propTypes = propTypes;

export const pageQuery = graphql`
  query($id: String!) {
    ProjectImages: project(id: { eq: $id }) {
      childrenFile {
        id
        childImageSharp {
          fluid(maxWidth: 720, quality: 85) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;

export default ProjectPage;
