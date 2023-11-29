import { isNumeric, streamTextToJson } from "@/lib/paser";
import { useState } from "react";

export interface MjResponse {
  progress: string;
  uri: string;
  id?: string;
  flags?: number;
  content?: string;
  hash?: string;
  proxy_url?: string;
  options?: Option[];
  width?: number;
  height?: number;
}

export interface Option {
  type: number;
  style: number;
  label: string;
  custom: string;
}

const getMjStream = async (prompt: string) => {
  const searchParam = new URLSearchParams();
  searchParam.set("prompt", prompt);
  return fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/image?${searchParam.toString()}`,
    {
      headers: {
        auth: process.env.NEXT_PUBLIC_HEADER_AUTH!,
      },
    }
  ).then((res) => res.body?.getReader());
};

interface MJData {
  uri: string;
  progress: number;
  isDone: boolean;
}

const useMj = () => {
  const [mjData, setMjData] = useState<MJData>({
    uri: "",
    isDone: false,
    progress: 0,
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const clear = () => {
    setMjData({
      uri: "",
      isDone: false,
      progress: 0,
    });
  };
  const generateImage = async (prompt: string, cb?: () => void) => {
    clear();
    setIsGenerating(true);
    let progress = 0;
    const reader = await getMjStream(prompt);
    if (reader) {
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const result = new TextDecoder().decode(value);
          const response = streamTextToJson<MjResponse>(result);
          let isDone = mjData.isDone;
          if (response.data?.progress) {
            const newProgress = response.data?.progress.replace("%", "");
            if (isNumeric(newProgress)) {
              progress = parseInt(newProgress);
            } else {
              progress = 100;
              cb?.();
              isDone = true;
            }
            setMjData({ progress, uri: response.data.uri, isDone });
          }
        }
      } catch (error) {
        console.error(error);
      }
      setIsGenerating(false);
    }
  };

  return {
    uri: mjData.uri,
    progress: mjData.progress,
    isDone: mjData.isDone,
    isGenerating,
    generateImage,
    clear,
  };
};

export default useMj;
