/* hooks/useRequestQueue.ts */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type Request from "@/types/request";
import db from "@/lib/db";
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

export default function useRequestQueue(): QueueControls {
  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const processingRef = useRef(false);

  const refreshPending = useCallback(async () => {
    const cnt = await db.requests.count();
    setPendingCount(cnt);
  }, []);

  const processQueue = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;
    setIsProcessing(true);

    const items = await db.requests.toArray();
    const total = items.length;
    if (total === 0) {
      processingRef.current = false;
      setIsProcessing(false);
      await refreshPending();
      return;
    }

    setRemaining(total);

    for (let i = 0; i < total; i += 1) {
      const r = items[i];
      await sleep(r.timeout * 1_000);
      if (r.id !== undefined) await db.requests.delete(r.id);
      const done = i + 1;
      setProgress(Math.round((done / total) * 100));
      setRemaining(total - done);
    }

    setProgress(0);
    setRemaining(0);
    processingRef.current = false;
    setIsProcessing(false);
    await refreshPending();
  }, [refreshPending]);

  const addRequests = async (reqs: Request[]) => {
    await db.requests.bulkAdd(reqs);
    await refreshPending();
    void processQueue();
  };

  const clearQueue = async () => {
    await db.requests.clear();
    setProgress(0);
    setRemaining(0);
    await refreshPending();
  };

  useEffect(() => {
    void refreshPending();
  }, [refreshPending]);

  return {
    progress,
    remaining,
    isProcessing,
    pendingCount,
    actions: {
      addRequests,
      processQueue,
      clearQueue,
    },
  };
}
