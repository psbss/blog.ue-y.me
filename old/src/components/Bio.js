import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";

import pngAvatar from "../svg/avatar.png";
import svgX from "../svg/socials/x.svg";
import svgGithub from "../svg/socials/github.svg";
import svgSpeakerDeck from "../svg/socials/speaker_deck.svg";

const BioWrapper = styled.div`
  position: sticky;
  top: 2em;
  width: ${(props) => props.theme.sizes.bioWidth};
  padding: 1.5em;
  font-size: 15.5px;
  background: ${(props) => props.theme.colors.blackLight};
  border-radius: 15px;
  @media screen and (max-width: ${(props) => props.theme.responsive.large}) {
    position: relative;
    margin: 2em 0;
    width: 100%;
  }
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    padding: 1.3em 1em;
  }
`;

const AvatarImage = styled.img`
  display: block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

const BioHeader = styled.div`
  display: flex;
  align-items: center;
`;
const BioName = styled.div`
  margin-left: 10px;
  a {
    font-weight: 700;
    letter-spacing: 1px;
    font-size: 1.3em;
    color: #fff;
  }
`;
const BioMain = styled.div`
  margin-top: 1em;
`;
const BioText = styled.p`
  color: #fff;
  font-size: 0.92em;
`;
const BioLinks = styled.div`
  margin-top: 1.5em;
  color: #fff;
  text-align: center;
  max-width: 244px;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  img {
    display: block;
    margin: 0 auto;
    width: 40px;
    height: 33px;
  }
`;

const BioLink = styled.a`
  display: block;
  font-weight: 700;
  font-size: 0.9em;
  line-height: 30px;
  color: ${(props) => props.theme.colors.gray};
  letter-spacing: 0.5px;
  &:hover {
    color: ${(props) => props.theme.colors.highlight};
  }
`;

const Bio = () => {
  return (
    <StaticQuery
      query={bioQuery}
      render={(data) => {
        const { author, bioText, social } = data.site.siteMetadata;
        return (
          <BioWrapper>
            <BioHeader>
              <AvatarImage src={pngAvatar} alt={author} />
              <BioName>
                <a href={`https://x.com/${social.x}`} rel="nofollow noopener noreferrer" target="_blank">{author}</a>
              </BioName>
            </BioHeader>
            <BioMain>
              <BioText>
                {bioText}
              </BioText>
              <BioLinks>
                <BioLink href={`https://x.com/${social.x}`} rel="nofollow noopener noreferrer" target="_blank">
                  <img src={svgX} alt="X" />
                  <div>X</div>
                </BioLink>
                <BioLink href={`https://github.com/${social.github}`} rel="nofollow noopener noreferrer" target="_blank">
                  <img src={svgGithub} alt="GitHub" />
                  <div>GitHub</div>
                </BioLink>
                <BioLink href={`https://speakerdeck.com/${social.speakerDeck}`} rel="nofollow noopener noreferrer" target="_blank">
                  <img src={svgSpeakerDeck} alt="SpeakerDeck" />
                  <div>SpeakerDeck</div>
                </BioLink>
              </BioLinks>
            </BioMain>
          </BioWrapper>
        );
      }}
    />
  );
};

const bioQuery = graphql`query BioQuery {
  avatar: file(absolutePath: {regex: "/avatar.png/"}) {
    childImageSharp {
      gatsbyImageData(width: 70, height: 70, layout: FIXED)
    }
  }
  site {
    siteMetadata {
      author
      bioText
      social {
        x
        github
        speakerDeck
      }
    }
  }
}
`;

export default Bio;
