import { Card, CardBody } from "@nextui-org/card";
import { Snippet } from "@nextui-org/snippet";
import { Link } from "@nextui-org/link";

interface LinkCardProps {
  thisUrl: string;
  externalUrl: string;
}

export const LinkCardComponent: React.FC<LinkCardProps> = ({ thisUrl, externalUrl }) => {
  return (
    <Card className="rounded-t-none z-10">
      <CardBody className="flex flex-col gap-2 items-center">
        <Snippet symbol="📌" color="secondary" variant="flat" className="w-full">
          {thisUrl}
        </Snippet>
        <Link
          isExternal
          href={externalUrl}
          showAnchorIcon
          className="flex w-full bg-blue-500 bg-opacity-20 rounded-xl p-2 justify-center"
        >
          Оригинал
        </Link>
      </CardBody>
    </Card>
  );
};
