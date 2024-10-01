import React from "react";
import { Container } from "reactstrap";
import "../../styles/common-section.css";
import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";

const CommonSection = ({ title, subtitle }) => {
  return (
    <section className="common_section">
      <CBreadcrumb className="m-5 dreadcrumbs">
        <CBreadcrumbItem href="/shop">Shop</CBreadcrumbItem>
        <CBreadcrumbItem>{title}</CBreadcrumbItem>
        {subtitle && <CBreadcrumbItem active>{subtitle}</CBreadcrumbItem>}
      </CBreadcrumb>
    </section>
  );
};

export default CommonSection;
