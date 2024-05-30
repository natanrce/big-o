import { Complexity } from "../enum/complexity";

export function getComplexity(n: number) {
  if (n === 1) return Complexity.CONSTANT;
}