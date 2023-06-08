import { getPreferenceValues } from "@raycast/api";
import path from "path";
import { homedir } from "os";

export function useStoragePath(): string {
  const filePath =
    getPreferenceValues<{
      storagePath: string;
    }>().storagePath || "~/.laravel";

  const resolvePath = (filePath: string) => {
    let fullPath = filePath.replace(/^~($|\/|\\)/, `${homedir()}$1`);
    fullPath = fullPath.replace(/\$(\w+)/g, (_, p1) => process.env[p1] || "");
    return path.resolve(fullPath);
  };

  return resolvePath(filePath);
}
