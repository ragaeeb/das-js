import { graphql, Link } from 'gatsby';
import React from 'react';
import SEO from '../components/seo';

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;
  const { description, imageUrl, title, date } = post.frontmatter;

  return (
    <section id="projects">
      <SEO title={title} description={description || post.excerpt} />
      <article>
        <header>
          <Link to="/">{siteTitle}</Link>
          <hr />
        </header>
        <h1>{title}</h1>
        <p
          style={{
            display: `block`,
          }}
        >
          {date}
        </p>
        {imageUrl && (
          <div className="project-wrapper__image">
            <img src={imageUrl} alt={title} className="full" />
          </div>
        )}
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        imageUrl
      }
    }
  }
`;
