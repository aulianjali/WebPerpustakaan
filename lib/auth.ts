"use client"

import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "@/lib/constant"

/**
 * Fungsi untuk login ke API dan menyimpan token serta role ke cookie
 * @param email - email pengguna
 * @param password - password pengguna
 * @returns response dari API
 */
export async function login(email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    })

    const { token, user } = response.data.data

    // Simpan token & role ke cookies (1 hari)
    Cookies.set("token", token, { expires: 1 })
    Cookies.set("role", user.role.toLowerCase(), { expires: 1 })

    // Jika ingin simpan nama user (opsional)
    Cookies.set("name", user.name, { expires: 1 })

    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Terjadi kesalahan pada server."
      )
    } else {
      throw new Error("Terjadi kesalahan tak terduga.")
    }
  }
}

/**
 * Fungsi logout dengan menghapus semua cookies terkait auth
 */
export function logout() {
  Cookies.remove("token")
  Cookies.remove("role")
  Cookies.remove("name") // kalau kamu simpan nama
  Cookies.remove("user") // kalau sebelumnya pernah simpan user

}
