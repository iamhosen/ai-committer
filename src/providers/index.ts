import { PROVIDER } from "../config";
import { IProvider } from "../types/providers";
import ollama from "./ollama";
import openai from "./openai";

export const getProvider = (): IProvider => {
  switch (PROVIDER) {
    case "ollama":
      return ollama;

    case "openai":
      return openai;

    default:
      throw new Error("Invalid provider");
  }
};
