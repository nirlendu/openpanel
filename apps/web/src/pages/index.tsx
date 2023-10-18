import Head from "next/head";

import { useEffect, useState } from "react";
import { ReportSidebar } from "@/components/report/sidebar/ReportSidebar";
import { ReportLineChart } from "@/components/report/chart/ReportLineChart";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Combobox } from "@/components/ui/combobox";
import { useDispatch, useSelector } from "@/redux";
import {
  changeDateRanges,
  changeInterval,
} from "@/components/report/reportSlice";
import { type IInterval } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

export default function Home() {
  const dispatch = useDispatch();
  const interval = useSelector((state) => state.report.interval);
  const events = useSelector((state) => state.report.events);
  const breakdowns = useSelector((state) => state.report.breakdowns);
  const startDate = useSelector((state) => state.report.startDate);
  const endDate = useSelector((state) => state.report.endDate);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex h-20 items-center border-b border-border px-8 justify-between bg-black text-white">
        <div className="flex flex-col [&_*]:leading-tight">
          <span className="text-2xl font-extrabold">MIXAN</span>
          <span className="text-xs text-muted">v0.0.1</span>
        </div>
        <div className="flex gap-4 uppercase text-sm">
          <a href="#">Dashboards</a>
          <a href="#">Reports</a>
          <a href="#">Events</a>
          <a href="#">Users</a>
        </div>

        <div>
       
          <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
          <Avatar className="text-black">
            <AvatarFallback>CL</AvatarFallback>
          </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
              Organization
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
            <User className="mr-2 h-4 w-4" />
              Logout
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
        </div>
      </nav>
      <main className="grid min-h-screen grid-cols-[400px_minmax(0,1fr)] divide-x">
        <div>
          <ReportSidebar />
        </div>

        <div className="flex flex-col gap-4 p-4">
          <div className="flex gap-4">
            <RadioGroup>
              <RadioGroupItem
                onClick={() => {
                  dispatch(changeDateRanges(1));
                }}
              >
                Today
              </RadioGroupItem>
              <RadioGroupItem
                onClick={() => {
                  dispatch(changeDateRanges(1));
                }}
              >
                7 days
              </RadioGroupItem>
              <RadioGroupItem
                onClick={() => {
                  dispatch(changeDateRanges(14));
                }}
              >
                14 days
              </RadioGroupItem>
              <RadioGroupItem
                onClick={() => {
                  dispatch(changeDateRanges(30));
                }}
              >
                1 month
              </RadioGroupItem>
              <RadioGroupItem
                onClick={() => {
                  dispatch(changeDateRanges(90));
                }}
              >
                3 month
              </RadioGroupItem>
              <RadioGroupItem
                onClick={() => {
                  dispatch(changeDateRanges(180));
                }}
              >
                6 month
              </RadioGroupItem>
              <RadioGroupItem
                onClick={() => {
                  dispatch(changeDateRanges(356));
                }}
              >
                1 year
              </RadioGroupItem>
            </RadioGroup>
            <div className="w-full max-w-[200px]">
              <Combobox
                placeholder="Interval"
                onChange={(value) => {
                  dispatch(changeInterval(value as IInterval));
                }}
                value={interval}
                items={[
                  {
                    label: "Hour",
                    value: "hour",
                  },
                  {
                    label: "Day",
                    value: "day",
                  },
                  {
                    label: "Month",
                    value: "month",
                  },
                ]}
              ></Combobox>
            </div>
          </div>
          {startDate && endDate && (
            <ReportLineChart
              startDate={startDate}
              endDate={endDate}
              events={events}
              breakdowns={breakdowns}
              interval={interval}
              showTable
            />
          )}
        </div>
      </main>
    </>
  );
}
