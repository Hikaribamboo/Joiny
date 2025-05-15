import { Box, Button,  Text, Flex } from "@chakra-ui/react";
import type { Post } from "@/types/posts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { fetchMyProjects } from "@/api/projects"; // ← APIができたら使う

const mockProjects: Post[] = [
  {
    id: 15,
    goal_title: '読書アウトプットの練習',
    is_open: true,
    goal_detail: '月に2冊、小説を読み感想を共有する',
    created_at: '2025-05-13T05:44:49.079481+00:00',
    user_id: '123'
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Post[]>([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // APIができたら使う
    // const loadProjects = async () => {
    //   const data = await fetchMyProjects();
    //   setProjects(data);
    // };
    // loadProjects();

    setProjects(mockProjects);
  }, []);

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold">
          プロジェクト
        </Text>
        <Button colorPalette="teal" variant="outline">プロジェクトを作成</Button>
        <Flex align="center">
            {projects[0]?.user_id ?? "読み込み中..."}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Dashboard;
