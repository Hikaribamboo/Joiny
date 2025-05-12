import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Card, Field, Input, Stack, Center, Flex, Link } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"
import { userAtom } from "@/atoms/userAtom";
import { useAtom } from "jotai";
import type { User } from '@/types/user';


const SignUpPage = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, setUser] = useAtom(userAtom);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (username && email && password) {
      const d = new Date();
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();
      const create_at = (`${year}/${month}/${day}`);
      console.log(create_at)

      const userInfo: User = {
        username: username,
        email: email,
        create_at: create_at,
      }

      setUser(userInfo)
      navigate("/")

    } else {
      alert("ログインに失敗しました。正しい情報を入力してください")
    }
  }

  return (
    <Card.Root width="400px" padding={4}>
    <Card.Header>
      <Center>
        <Card.Title >新規登録</Card.Title>
      </Center>
    </Card.Header>
    <Card.Body>
      <Stack gap="4" w="full">
        <Field.Root>
          <Field.Label>ユーザー名</Field.Label>
          <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
        </Field.Root>
        <Field.Root>
          <Field.Label>メールアドレス</Field.Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
        </Field.Root>
        <Field.Root>
          <Field.Label>パスワード</Field.Label>
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Field.Root>
      </Stack>
    </Card.Body>
    <Center>
      <Flex gap="4" paddingBottom={4} direction="column">
        <Link href="../login">ログインはこちら</Link>
        <Button
          color="blue.700"
          bg="blue.100"
          border="1px solid"
          borderColor="blue.300"
          borderRadius="md"
          fontWeight="medium"
          _hover={{ bg: "blue.200" }}
          onClick={handleSubmit}
        >
          新規登録
        </Button>
      </Flex>
    </Center>
  </Card.Root>
  )
}

export default SignUpPage
