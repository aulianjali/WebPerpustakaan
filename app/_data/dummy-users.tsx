export interface DummyUser {
  email: string
  username: string
  password: string
  role: "admin" | "pustakawan" | "anggota"
  name: string
}

export const dummyUsers: DummyUser[] = [
  {
    email: "admin@gmail.com",
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "Administrator",
  },
  {
    email: "pustakawan@gmail.com",
    username: "pustakawan",
    password: "pustakawan123",
    role: "pustakawan",
    name: "Pustakawan Digital",
  },
  {
    email: "anggota@gmail.com",
    username: "anggota",
    password: "anggota123",
    role: "anggota",
    name: "Anggota Perpustakaan",
  },
]
