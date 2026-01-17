import Container from "../common/container";
import { Heading } from "../ui/heading";
import { SubHeading } from "../ui/sub-heading";
import parse from "html-react-parser";
interface props {
  title: string;
  description: string;
  content: string;
}
const EmailNodeTemplate = ({
  title,
  description,
  content,
}: Readonly<props>) => {
  return (
    <Container as={"section"} size="sm">
      <Heading>{title}</Heading>
      <SubHeading>{description}</SubHeading>
      <div className="mt-4">{parse(content)}</div>
    </Container>
  );
};

export { EmailNodeTemplate };
