import { Button, Card } from "@chakra-ui/react"
import type { Post } from '@/types/posts';

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  return (
    <Card.Root margin={4} width="320px" variant={"elevated"} key={"elevated"}>
      <Card.Body gap="2">
        <Card.Title mb="2">{post.goal_title}</Card.Title>
        <Card.Description>
          {post.goal_detail}
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline">View</Button>
        <Button variant="outline">Join</Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default PostCard;
