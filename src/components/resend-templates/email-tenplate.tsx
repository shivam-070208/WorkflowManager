import Container from "../common/container";
import { Heading } from "../ui/heading";
import { SubHeading } from "../ui/sub-heading";
import parse from "html-react-parser";
interface props {
  title: string;
  description?: string;
  content?: string;
}
const EmailTemplate = ({ title, description, content }: Readonly<props>) => {
  return (
    <Container className="space-y-2" as={"section"} size="sm">
      <Heading>{title}</Heading>
      <SubHeading>{description}</SubHeading>
      {!!content && <div>{parse(content)}</div>}
    </Container>
  );
};

export { EmailTemplate };
