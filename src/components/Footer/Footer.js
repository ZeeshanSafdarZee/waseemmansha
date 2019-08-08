import React from "react";
import { FiGithub, FiCodepen, FiLinkedin } from "react-icons/fi";
import { Heading, Flex, Box } from "../UI";
import FooterLink from "./FooterLink";

const Footer = React.memo(() => (
  <Box is="footer" py={58} bg="bgAlt" color="white">
    <Flex alignItems="center" justifyContent="center">
      <Heading color="white">
        Copyright © 2019 Waseem Mansha Full Stack Mobile/Web Developer - All
        Rights Reserved.
      </Heading>
    </Flex>
  </Box>
));

export default Footer;
