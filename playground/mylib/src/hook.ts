const CORRECT_ANSWER = 42

/**
 * React hook that returns the answer to life, the universe and everything
 *
 * @returns The answer, eg 42.
 * @public
 */
export function useAnswerToLifeTheUniverseAndEverything(): number {
  return CORRECT_ANSWER
}

/**
 * Function that returns whether or not the user has the right answer
 *
 * @param answer - The users answer
 * @returns True if correct, false otherwise
 * @public
 */
export function userHasTheRightAnswer(answer: number): boolean {
  return answer === CORRECT_ANSWER
}
