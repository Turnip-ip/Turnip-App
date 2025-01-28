interface TextPage {
  /**
   * Actual text content to read.
   */
  content: string;
  /**
   * Group ID from the Group unlocking this text.
   */
  from?: string;
  /**
   * Group IDs unlocked after having read this text.
   */
  to: string;
  /**
   *
   */
  tooltip: string;
}

interface Group {
  /**
   * Label of the group to display on the graph.
   */
  label: string;
  /**
   * Levels in the group.
   */
  levels: string[];
  /**
   * Text node IDs that need to be read to unlock this group.
   */
  requires: string[];
  /**
   *
   */
  grammar_version: number;
}

interface Level {
  /**
   * Tooltip to show when hovering the graph node.
   */
  tooltip: string;
  /**
   * Description of the level.
   */
  description: string;
  /**
   * Code to load inside the code window when selecting this level.
   */
  initial_code: string;
  /**
   * Which levels need to be completed to unlock this level.
   */
  requires: string[];
  /**
   *
   */
  in: string;
  /**
   *
   */
  out: string;
  /**
   *
   */
  constraints: string;
  /**
   *
   */
  ex_in: string;
  /**
   *
   */
  ex_out: string;
}

interface Data {
  texts: { [key: string]: TextPage };
  groups: { [key: string]: Group };
  levels: { [key: string]: Level };
}

enum PageType {
  Level,
  TextPage,
}

export type { TextPage, Group, Level, Data };
export { PageType };
