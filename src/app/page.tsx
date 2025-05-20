"use client";

import RequestCardForm from "@/components/modules/request-card-form";
import ProgressCard from "@/components/modules/progress-card";
import Footer from "@/components/modules/footer";
import ResumeModal from "@/components/modules/resume-modal";
import useRequestQueue from "@/hooks/use-request-queue";
import db from "@/lib/db";

export default function IndexDBTesting() {
  const { progress, remaining, isProcessing, pendingCount, actions } =
    useRequestQueue({
      db,
    });

  const showModal = pendingCount > 0 && !isProcessing;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-5">
      <ResumeModal
        showModal={showModal}
        pendingCount={pendingCount}
        clearQueue={actions.clearQueue}
        processQueue={actions.processQueue}
      />

      <div className="container max-w-xl space-y-8 py-12">
        <ProgressCard progress={progress} remaining={remaining} />
        <RequestCardForm
          onSubmit={actions.addRequests}
          disabled={isProcessing}
        />
        <Footer />
      </div>
    </main>
  );
}
