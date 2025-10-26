import React from "react";
import styled from "styled-components";
import svgX from "../svg/socials/x.svg";

const Wrapper = styled.div`
  margin: 1.8rem 0 0;
  padding: 0 ${(props) => props.theme.sideSpace.contentLarge};
  text-align: center;
  color: ${(props) => props.theme.colors.blackLight};
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    padding: 0 ${(props) => props.theme.sideSpace.contentSmall};
  }
`;

const ShareTitle = styled.div`
  font-weight: 700;
  font-size: 1.2em;
  letter-spacing: 0.05em;
`;

const ShareLinks = styled.div`
  margin-top: 0.5em;
`;

const ShareLink = styled.a`
  display: inline-block;
  margin: 0 6px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  color: #fff;
  background: ${(props) => props.theme.colors.blackLight};
  font-weight: 700;
  vertical-align: middle;
  &:hover {
    transform: translateY(-2px);
  }
`;

const ShareButtons = ({ slug, title, emoji }) => {
  const encodedTitle = encodeURIComponent(
    `${emoji || "🐱"}${title} | psnzbss`
  );
  const pageUrl = `https://blog.ue-y.me${slug}`;
  return (
    <Wrapper>
      <ShareTitle>SHARE</ShareTitle>
      <ShareLinks>
        <ShareLink
          href={`https://x.com/share?url=${pageUrl}&text=${encodedTitle}&via=psnzbss`}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <img
            src={svgX}
            alt="X"
            style={{
              width: "24px",
              height: "19px",
              marginTop: "11px",
            }}
          />
        </ShareLink>
        <ShareLink
          href={`https://www.facebook.com/share.php?u=${pageUrl}`}
          style={{ fontSize: "20px" }}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          f
        </ShareLink>
        <ShareLink
          href={`http://b.hatena.ne.jp/add?mode=confirm&url=${pageUrl}`}
          style={{ fontSize: "19px" }}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          B!
        </ShareLink>
      </ShareLinks>
    </Wrapper>
  );
};

export default ShareButtons;
