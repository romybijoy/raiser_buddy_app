import styled from "styled-components";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { defaultTheme } from "../../styles/themes/default";

const BreadcrumbWrapper = styled.nav`
  margin-bottom: 24px;

  .breadcrumb-separator {
    margin-left: 8px;
    margin-right: 8px;
  }

  .breadcrumb-item {
    transition: ${defaultTheme.default_transition};
    &:hover {
      color: ${defaultTheme.color_outerspace};
    }
  }
`;

const Breadcrumb = ({ items }) => {
  return (
    <BreadcrumbWrapper className="flex items-center flex-wrap">
      {items?.map((item, index) => (
        <BreadcrumbItem
          key={index}
          item={item}
          isLast={items.length - 1 === index}
        />
      ))}
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;
Breadcrumb.propTypes = {
  items: PropTypes.array,
};

const BreadcrumbItem = ({ item, isLast }) => {
  return (
    <>
      {item.link && !isLast ? (
        <Link
          to={item.link}
          className="breadcrumb-item text-base text-gray font-medium"
        >
          {item.label}
        </Link>
      ) : (
        <span className="text-base text-outerspace font-semibold">
          {item.label}
        </span>
      )}
      {!isLast && (
        <span className="breadcrumb-separator inline-flex text-xs">
          <i className="bi bi-chevron-right"></i>
        </span>
      )}
    </>
  );
};

BreadcrumbItem.propTypes = {
  item: PropTypes.object,
  isLast: PropTypes.bool,
};
