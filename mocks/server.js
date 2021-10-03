import { setupServer } from "msw/node";
import blogPostHandlers from "./handlers/blogPostHandler";

export const server = setupServer(...blogPostHandlers);
