import type { SchemaTypeDefinition } from "sanity";
import { agent } from "./documents/agent";
import { course } from "./documents/course";
import { track } from "./documents/track";
import { article } from "./documents/article";
import { engagement } from "./documents/engagement";
import { teamMember } from "./documents/team-member";
import { thread } from "./documents/thread";
import { reply } from "./documents/reply";
import { authoredBy } from "./objects/authored-by";
import { lesson } from "./objects/lesson";
import { pillarProgress } from "./objects/pillar-progress";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // documents
    engagement,
    course,
    track,
    article,
    agent,
    thread,
    reply,
    teamMember,
    // objects
    lesson,
    pillarProgress,
    authoredBy,
  ],
};
