import { setupWorker, rest } from "msw";
import blogPostHandlers from "./handlers/blogPostHandler";

export const worker = setupWorker(...blogPostHandlers);

window.msw = {
  worker,
  rest,
};
