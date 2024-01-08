import { PromptStoreItem } from "@/types";

type StreamJson<T = object> = { id?: string } & { data?: T };
export const streamTextToJson = <T = object>(plainText: string) => {
  const lines = plainText.split("\n");
  const jsonResponse: { [key: string]: any } = {};

  lines.forEach((line) => {
    const [key, value] = line.trim().split(": ");
    if (key) {
      jsonResponse[key] = value;
    }
  });

  // 'data' 키에 해당하는 값은 JSON 객체로 변환
  if (jsonResponse["data"]) {
    jsonResponse["data"] = JSON.parse(jsonResponse["data"]);
  }
  return jsonResponse as StreamJson<T>;
};
export const isNumeric = (data: string): boolean => {
  return !isNaN(parseInt(data));
};

export function capitalizeFirstLetter(text: string) {
  return text
    .split(" ") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a single string
}

export const makePrompt = (
  storeItem: PromptStoreItem & { subject: { value: string }[] }
) => {
  const KEY_DATA: { [key in string]: (text: string) => string } = {
    composition: (text) => `A ${capitalizeFirstLetter(text)}`,
    style: (style: string) =>
      `${capitalizeFirstLetter(style)}-style depiction of`,
    subject: (text) => text,
    mood: (text) => `in a ${capitalizeFirstLetter(text)} mood`,
    tone: (text) => `with ${capitalizeFirstLetter(text)} tones`,
    artisticreference: (text) =>
      `reminiscent of ${capitalizeFirstLetter(text)}`,
  };
  let result = "";
  const orderedPromptKey: (keyof PromptStoreItem | "subject")[] = [
    "composition",
    "style",
    "subject",
    "mood",
    "tone",
    "artisticreference",
  ];
  const maxLength = Object.keys(KEY_DATA).length - 1;
  orderedPromptKey.map((key, index) => {
    const value = storeItem[key];
    if (value.length) {
      const parsedText = KEY_DATA[key]?.(
        value.map((item) => item.value).join(", ")
      );
      result += parsedText + (index !== maxLength ? ", " : "");
    }
    if (
      index === orderedPromptKey.length - 1 &&
      (result.trim().endsWith(", ") || result.trim().endsWith(","))
    ) {
      result = result.trim();
      result = result.slice(0, result.length - 1);
      result += ".";
    }
  });
  return result;
};
