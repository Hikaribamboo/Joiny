import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Card, Field, Input, Stack, Center } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"
import { userAtom } from "@/atoms/userAtom";
import { useAtom } from "jotai";
import type { User } from '@/types/user';


const LoginPage = () => {
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
    <Card.Root width="320px" maxW="md">
    <Card.Header>
      <Center>
        <Card.Title>新規登録</Card.Title>
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
      <Card.Footer justifyContent="flex-end" gap="16">
        <Button
          color="red.700"
          bg="red.100"
          border="1px solid"
          borderColor="red.300"
          borderRadius="md"
          fontWeight="medium"
          _hover={{ bg: "red.200" }}
          onClick={handleSubmit}
        >
          キャンセル
        </Button>
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
          登録
        </Button>
      </Card.Footer>
    </Center>
  </Card.Root>
  )
}

export default LoginPage
