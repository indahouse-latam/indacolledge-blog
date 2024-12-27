import { type SchemaTypeDefinition } from "sanity";

import { categoryType } from "./categoryType";
import { articleType } from "./articleType";
import { authorType } from "./authorType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, articleType, authorType],
};
