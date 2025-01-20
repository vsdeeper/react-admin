import { sleep } from "radash";
import { lazy, Suspense, useEffect, useState } from "react";
import { Button, DatePicker } from "antd";
import { useAppSelector } from "../../hooks";
import "./style.scss";

const LazyTest = lazy(() => delayForDemo(import("./lazy-test/LazyTest.tsx")));

export default function Dashboard() {
  const [data, setData] = useState<Record<string, any>>({});
  const { userInfo } = useAppSelector((state) => state.global);

  useEffect(() => {
    console.log("Dashboard useEffect");
    getData().then((res) => setData(res));
  }, []);

  const getData = async () => {
    await sleep(1000);
    return { id: 1, name: "test" };
  };

  return (
    <div className="dashboard test">
      <DatePicker />
      <Button type="primary">范德萨发</Button>[{data.id}]dashboard page.
      {data.name}
      {userInfo.name}
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
