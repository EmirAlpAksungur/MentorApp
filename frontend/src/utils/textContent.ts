import { createElement } from "react";
import { TranslatedTextType } from "../services/types/translations";
export class TextListClass {
  private textList: TranslatedTextType[];

  constructor(textList: TranslatedTextType[]) {
    this.textList = textList;
  }
  getText(number: number): string | undefined {
    return this.textList.find((e) => e?.TextContentId === number)?.Translations;
  }

  private returnRegexString = (regex: string): string => {
    let number: number = parseInt(regex.match(/\d+/)?.[0]!);
    let content = this.textList.find(
      (e) => e?.TextContentId === number
    )?.Translations;

    return content ? `<span class="regex-${number}">${content}</span>` : "";
  };

  getNestedText(number: number) {
    let content = this.textList.find(
      (e) => e?.TextContentId === number
    )?.Translations;
    const regex = /\${\d+}/g;
    const matches = content?.match(regex);
    matches &&
      matches.map((e: string) => {
        let str: string = this.returnRegexString(e);
        content = content?.replace(e, str);
      });
    console.log(content);

    return content;
  }
}
