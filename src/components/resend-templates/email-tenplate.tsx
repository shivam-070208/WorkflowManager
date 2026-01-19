import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading as EmailHeading,
} from "@react-email/components";

interface EmailTemplateProps {
  title: string;
  description?: string;
  content?: string;
}

const styles = {
  main: {
    backgroundColor: "#f7fafc",
    fontFamily: "Arial, sans-serif",
    padding: "32px 0",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "32px",
    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.03)",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1a202c",
    marginBottom: "8px",
  },
  subheading: {
    fontSize: "18px",
    color: "#718096",
    marginBottom: "20px",
  },
  content: {
    fontSize: "16px",
    color: "#2d3748",
    lineHeight: "1.6",
  },
};

const EmailTemplate = ({
  title,
  description,
  content,
}: Readonly<EmailTemplateProps>) => (
  <Html>
    <Head />
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section>
          <EmailHeading style={styles.heading}>{title}</EmailHeading>
          {description && <Text style={styles.subheading}>{description}</Text>}
          {content && (
            <div style={styles.content}>
import DOMPurify from "isomorphic-dompurify";

              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(content),
                }}
              />
            </div>
          )}
        </Section>
      </Container>
    </Body>
  </Html>
);

export { EmailTemplate };
