import { sleep } from "radash";
import { lazy, Suspense } from "react";

const LazyTest = lazy(() => delayForDemo(import("./lazy-test/LazyTest.tsx")));

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Suspense fallback={<div>loading...</div>}>
        <LazyTest />
      </Suspense>
    </div>
  );
}

async function delayForDemo(promise: Promise<any>) {
  await sleep(3000);
  return await promise;
}
