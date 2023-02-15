"use client";
import InputNumber from "@/components/elements/InputNumber";
import { useState } from "react";
import { classNames, fixedStr2Points } from "@/utils/Utils";
import AreaGraph, { IAreaGraphItem } from "@/components/Graph";

export default function Dashboard() {
  const [ape, setApe] = useState(0);
  const [incChecked, setIncChecked] = useState(new Array(4).fill(false));
  const totalRewards = 19_000_000;
  const totalQ1Rewards = (totalRewards * 35) / 100;
  const totalQ2Rewards = (totalRewards * 30) / 100;
  const totalQ3Rewards = (totalRewards * 20) / 100;
  const totalQ4Rewards = (totalRewards * 15) / 100;
  const Q1rewardPerHour = totalQ1Rewards / 91.25 / 24;
  const Q2rewardPerHour = totalQ2Rewards / 91.25 / 24;
  const Q3rewardPerHour = totalQ3Rewards / 91.25 / 24;
  const Q4rewardPerHour = totalQ4Rewards / 91.25 / 24;
  const totalStaked = 15_839_789;

  const onChangeMayc = (val: string) => {
    setApe(2042 * parseInt(val));
  };
  const onChangeApe = (val: string) => {
    setApe(parseInt(val));
  };

  const quarters = [
    { label: "Q1", rewards: totalQ1Rewards },
    { label: "Q2", rewards: totalQ2Rewards },
    { label: "Q3", rewards: totalQ3Rewards },
    { label: "Q4", rewards: totalQ4Rewards },
  ];

  const increases = [
    { label: "5%", multiplier: 1.05 },
    { label: "10%", multiplier: 1.1 },
    { label: "20%", multiplier: 1.2 },
    { label: "25%", multiplier: 1.25 },
  ];

  const handleIncChange = (position: number) => {
    const updatedIncChecked = incChecked.map((item, index) =>
      index === position ? !item : false
    );

    setIncChecked(updatedIncChecked);
  };

  let calculatedRewards = 0;
  let QStr = "";
  let multiplier = 1;
  incChecked.map((_, idx) => {
    if (incChecked[idx]) {
      multiplier = increases[idx].multiplier;
    }
  });
  let staked: number[] = [];
  let tempStaked = totalStaked;
  increases.map(() => {
    staked.push(tempStaked);
    tempStaked *= multiplier;
  });

  const Q1Rewards = fixedStr2Points((totalQ1Rewards * ape) / staked[0], 4);
  const Q2Rewards = fixedStr2Points((totalQ2Rewards * ape) / staked[1], 4);
  const Q3Rewards = fixedStr2Points((totalQ3Rewards * ape) / staked[2], 4);
  const Q4Rewards = fixedStr2Points((totalQ4Rewards * ape) / staked[3], 4);
  const Tables = [
    {
      label: "Hourly:",
      value: `${fixedStr2Points((Q1rewardPerHour * ape) / totalStaked, 4)} APE`,
    },
    {
      label: "Daily:",
      value: `${fixedStr2Points(
        (Q1rewardPerHour * ape * 24) / totalStaked,
        4
      )} APE`,
    },
    {
      label: "Weekly:",
      value: `${fixedStr2Points(
        (Q1rewardPerHour * ape * 24 * 7) / totalStaked,
        4
      )} APE`,
    },
    {
      label: "Monthly:",
      value: `${fixedStr2Points(
        (Q1rewardPerHour * ape * 24 * 30) / totalStaked,
        4
      )} APE`,
    },
    {
      label: "Quarter 1:",
      value: `${Q1Rewards} APE`,
    },
    {
      label: "Quarter 2:",
      value: `${Q2Rewards} APE`,
    },
    {
      label: "Quarter 3:",
      value: `${Q3Rewards} APE`,
    },
    {
      label: "Quarter 4:",
      value: `${Q4Rewards} APE`,
    },
    {
      label: "All Quarter:",
      value: `${fixedStr2Points(
        Q1Rewards + Q2Rewards + Q3Rewards + Q4Rewards,
        4
      )} APE`,
    },
  ];

  const maxYAxis = fixedStr2Points(
    ((totalQ1Rewards + totalQ2Rewards + totalQ3Rewards + totalQ4Rewards) *
      ape) /
      totalStaked,
    4
  );

  const graphData: IAreaGraphItem[] = [
    {
      label: "Q1 Total",
      value: Q1Rewards,
    },
    {
      label: "Q2 Total",
      value: Q1Rewards + Q2Rewards,
    },
    {
      label: "Q3 Total",
      value: Q1Rewards + Q2Rewards + Q3Rewards,
    },
    {
      label: "Q4 Total",
      value: fixedStr2Points(Q1Rewards + Q2Rewards + Q3Rewards + Q4Rewards, 4),
    },
  ];

  return (
    <div className="py-32 bg-black px-4 sm:px-6 lg:px-16 xl:px-20 flex flex-col max-w-9xl mx-auto">
      <div className="w-full flex gap-10 flex-col lg:flex-row">
        {/* Tables */}
        <div className="lg:basis-1/2 lg:grow-0 lg:shrink-0">
          <div className="flex gap-5 px-5 py-3 pb-5 justify-center">
            Increase per Quarter:
            {increases.map((item, idx) => {
              return (
                <div key={idx}>
                  <input
                    type="checkbox"
                    onChange={() => handleIncChange(idx)}
                    value={item.label}
                    checked={incChecked[idx]}
                  />{" "}
                  {item.label}
                </div>
              );
            })}
          </div>

          <div className="w-full flex flex-col lg:flex-row">
            {/* MAYC POOL */}
            <div className="flex flex-col justify-center items-start lg:basis-1/2 border-grayish border-2 rounded-lg">
              <div className="flex justify-center text-lg border-b-2 border-b-grayish w-full py-2">
                MAYC POOL
              </div>
              <div className="flex justify-center w-full items-center gap-2 py-2 px-5">
                <div className="basis-1/2">MAYC NFTs: </div>
                <InputNumber
                  placeholder="0"
                  onChangeFn={onChangeMayc}
                  classes="basis-1/2"
                />
              </div>
              <div className="flex justify-center w-full items-center gap-2 py-2 px-5 border-b-grayish border-b-2">
                <div className="basis-1/2">Apecoins: </div>
                <InputNumber
                  placeholder="0"
                  onChangeFn={onChangeApe}
                  classes="basis-1/2"
                  value={ape}
                />
              </div>

              {Tables.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={classNames(
                      "flex justify-center w-full items-center gap-2 px-5",
                      idx == Tables.length - 2
                        ? "border-b-grayish border-b-2"
                        : "",
                      idx == Tables.length - 1 ? "py-2" : "py-1"
                    )}
                  >
                    <div className="basis-1/2">{item.label}</div>
                    <div className="basis-1/2">{item.value}</div>
                  </div>
                );
              })}
            </div>
            {/* APECOIN POOL */}
            <div className="flex flex-col justify-start items-start lg:basis-1/2 border-grayish border-2 rounded-lg">
              <div className="flex justify-center text-lg border-b-2 border-b-grayish w-full py-2">
                APECOIN POOL
              </div>
              <div className="flex justify-center text-lg border-b-2 border-b-grayish w-full py-2">
                Coming Soon
              </div>
            </div>
          </div>
        </div>
        {/* Graph */}
        <div className="lg:basis-1/2 lg:grow-0 lg:shrink-0 max-w-[700px] pt-10 justify-center">
          <div className="w-full h-[400px] lg:h-full">
            <AreaGraph data={graphData} maxYAxis={maxYAxis} />
          </div>
        </div>
      </div>
    </div>
  );
}
