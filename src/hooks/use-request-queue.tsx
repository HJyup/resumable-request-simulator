"use client";

import { useState, useRef, useCallback } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import Dexie, { EntityTable } from "dexie";
import type Request from "@/types/request";
import { sleep } from "@/lib/utils";

export interface QueueControls {
  progress: number;
  remaining: number;
  isProcessing: boolean;
  pendingCount: number;
  actions: {
    addRequests: (req: Request[]) => Promise<void>;
    processQueue: () => Promise<void>;
    clearQueue: () => Promise<void>;
  };
}

export default function useRequestQueue({
  db,
}: {
  db: Dexie & { requests: EntityTable<Request, "id"> };
}): QueueControls {
  const pendingCount = useLiveQuery(() => db.requests.count(), [db]) ?? 0;
  const [progress, setProgress] = useState(0);
  const [isProcessing, setRunning] = useState(false);

  const processingRef = useRef(false);

  const processQueue = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;
    setRunning(true);

    try {
      const items = await db.requests.orderBy("id").toArray();
      const total = items.length;
      if (!total) return;

      for (let i = 0; i < total; i++) {
        const { id, timeout } = items[i];
        await sleep(timeout * 1_000);
        id && (await db.requests.delete(id));

        setProgress(Math.round(((i + 1) / total) * 100));
      }
    } finally {
      setProgress(0);
      setRunning(false);
      processingRef.current = false;
    }
  }, [db]);

  const addRequests = useCallback(
    async (reqs: Request[]) => {
      await db.requests.bulkAdd(reqs);
      void processQueue();
    },
    [db, processQueue],
  );

  const clearQueue = useCallback(async () => {
    await db.requests.clear();
    setProgress(0);
  }, [db]);

  return {
    progress,
    remaining: pendingCount,
    isProcessing,
    pendingCount,
    actions: { addRequests, processQueue, clearQueue },
  };
}
