import { getPreferenceValues } from "@raycast/api";

export function useBinaryPath(): string {
  let path = getPreferenceValues<{
    binaryPath: string;
  }>().binaryPath;

  if (!path) {
    path = "/usr/local/bin/laraveltips";
  }

  return path;
}
