import { useStoragePath } from "./hooks/useStoragePath";
import { useBinaryPath } from "./hooks/useBinaryPath";
import { useExec } from "@raycast/utils";
import { useMemo } from "react";

export interface Tip {
  id: number;
  title: string;
  content: string;
}

interface BaseHook<T> {
  data: T;
  isLoading: boolean;
  error?: Error;
}

export type TipsHook = BaseHook<Tip[]>;

export type TipHook = BaseHook<Tip>;

export class LaravelTip {
  private readonly binaryPath: string;
  private readonly storagePath: string;

  constructor() {
    this.binaryPath = useBinaryPath();
    this.storagePath = useStoragePath();
  }

  execute(command: string, args: string[]): TipsHook {
    const { isLoading, data, error } = useExec(this.binaryPath, [
      "-o", "json", "-q", "--path", this.storagePath, command, ...args,
    ]);

    return {
      data: data ? JSON.parse(data) : [],
      isLoading,
      error,
    };
  }

  public random(): TipHook {
    const tips = this.execute("random", []);

    return {
      data: tips.data[0],
      isLoading: tips.isLoading,
      error: tips.error,
    };
  }

  public search(query: string): TipsHook {
    return this.execute("search", [query]);
  }

  public sync(): Error | void {
    console.log(this.storagePath);

    const { error } = this.execute("-p", [this.storagePath, "sync"]);

    return error;
  }
}
