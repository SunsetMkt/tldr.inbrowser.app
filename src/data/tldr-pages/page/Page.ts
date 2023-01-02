import type { Entry } from "@zip.js/zip.js";
import { TextWriter } from "@zip.js/zip.js";

export class Page {
  private readonly entry: Entry;
  private textCache: string | undefined = undefined;

  constructor(entry: Entry) {
    this.entry = entry;
  }

  async text(): Promise<string> {
    if (this.textCache) return this.textCache;
    const text = await this.entry.getData(new TextWriter());
    this.textCache = text;
    return text;
  }

  // example: /pages/common/cat
  get path(): string {
    const filename = this.entry.filename;
    const prefix = "tldr-main";
    const suffix = ".md";

    return filename.slice(prefix.length, -suffix.length);
  }

  // example: tldr-main/pages/common/cat.md
  get filename(): string {
    return this.entry.filename;
  }

  get githubURL(): string {
    return `https://github.com/tldr-pages/tldr/blob/main${this.path}.md`;
  }

  get command(): string {
    const filenameParts = this.filename.split("/");
    const command = filenameParts[filenameParts.length - 1].split(".")[0];
    return command;
  }

  get basename(): string {
    const filenameParts = this.filename.split("/");
    const command = filenameParts[filenameParts.length - 1].split(".")[0];
    return command;
  }

  // path: /pages.zh/common/cat.md
  // return "zh"
  get language(): string {
    const path = this.path;
    const pageSection = path.split("/")[1];
    const languageParts = pageSection.split(".");
    if (languageParts.length !== 2) return "";
    const language = languageParts[1];
    return language;
  }

  // path: /pages.zh/common/cat.md
  // return "common"
  get platform(): string {
    const path = this.path;
    return path.split("/")[2];
  }
}
