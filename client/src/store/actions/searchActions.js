/*
 * search actions
 */
import { SEARCH_RESULT } from "./types";
export const searchResult = payload => {
  return {
    type: SEARCH_RESULT,
    payload: payload
  };
};
