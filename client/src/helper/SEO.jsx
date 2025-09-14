import { useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  primaryKeyword = [],
  secondaryKeywords = [],
  ogTitle
}) => {
  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  const allKeywords = [primaryKeyword, ...secondaryKeywords].join(", ");

  return (
    <Helmet>
      {/* Title Tag */}
      {title && <title>{title}</title>}

      {/* Meta Description */}
      {description && <meta name="description" content={description} />}

      {/* Meta Keywords (optional/legacy) */}
      <meta name="keywords" content={allKeywords} />
      {/* {<meta name="robots" content="index, follow" />} */}
      {ogTitle && <meta property="og:title" content={ogTitle}></meta>}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;