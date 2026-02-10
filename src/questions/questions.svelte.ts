import { q001 } from "./q001";
import { q002 } from "./q002";

export type Question = {
  name: string
  tag?: string[]
  repeat?: string[]
  rang?: number
}

export const questions = $state([
  // ...q001,
  ...q002,
])