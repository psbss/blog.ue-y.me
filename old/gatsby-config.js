module.exports = {
  siteMetadata: {
    title: `MoreCuriosity`,
    author: `上ちょ / uetyo`,
    bioText: `都内で働くiOSエンジニア(4年目)`,
    description: `辛い時は筋トレで追い込むiOSエンジニアです`,
    siteUrl: `https://blog.ue-y.me/`,
    social: {
      x: `psnzbss`,
      github: `psbss`,
      speakerDeck: `uetyo`,
    },
    categories: [
      {
        name: "Dev",
        slug: "dev",
        color: "#007AB8",
      },
      {
        name: "Life",
        slug: "life",
        color: "#839E1A",
      },
      {
        name: "Other",
        slug: "other",
        color: "#B41870",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-9L67PRJ41Y"
        ],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-code-titles`,
          {
            resolve: "gatsby-remark-embed-youtube",
            options: {
              width: 650,
              height: 365,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          // gatsby-transformer-remark v^5.0 で動かないので一旦停止（使ってないし）
          // {
          //   resolve: "gatsby-remark-custom-blocks",
          //   options: {
          //     blocks: {
          //       simple: {
          //         classes: "simple",
          //         title: "optional",
          //       },
          //       info: {
          //         classes: "info",
          //         title: "optional",
          //       },
          //       alert: {
          //         classes: "alert",
          //         title: "optional",
          //       },
          //       notice: {
          //         classes: "notice",
          //         title: "optional",
          //       },
          //       imageSmall: {
          //         classes: "image-small",
          //       },
          //       imageMedium: {
          //         classes: "image-medium",
          //       },
          //     },
          //   },
          // },
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: "_blank",
              rel: "nofollow noopener noreferrer",
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              noInlineHighlight: false,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `uetyo`,
        short_name: `uetyo`,
        start_url: `/`,
        background_color: `rgb(33, 36, 45)`,
        theme_color: `#007AB8`,
        display: `minimal-ui`,
        icon: `content/assets/siteicon.png`,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    // RSS feed
    // ref: https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-an-rss-feed/
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: {
                    frontmatter: { date: DESC }
                  }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "ue-y.me RSS feed",
          },
        ],
      },
    },
  ],
};
