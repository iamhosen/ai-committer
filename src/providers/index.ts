import { PROVIDER } from "../config";
import { IProvider } from "../types/providers";
import ollama from "./ollama";

export const getProvider = (): IProvider => {
  switch (PROVIDER) {
    case "ollama":
      return ollama;
    default:
      throw new Error("Invalid provider");
  }
};
