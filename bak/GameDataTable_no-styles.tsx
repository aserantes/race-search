import React, { FC } from "react";
import { GameDataResults } from "../src/store";

interface GameDataTableProps {
  tableData: GameDataResults;
}

export const GameDataTable: FC<GameDataTableProps> = ({ tableData }) => {
  return <div>{JSON.stringify(tableData)}</div>;
};
