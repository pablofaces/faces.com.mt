"use client";
import { useState } from "react";
import Image from "next/image";
import Location from "@/interfaces/location";
import QuoteLineItem from "@/interfaces/quoteLineItem";

interface AppProps {
  dates?: QuoteLineItem[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const App: React.FC<AppProps> = ({ dates }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<QuoteLineItem | null>(
    dates ? dates[0] : null
  );

  const handleSelectLocation = (data: Location) => {
    setSelectedLocation(data);
  };

  const handleSelectDate = (date: QuoteLineItem) => {
    setSelectedDate(date);
  };

  return (
    <div className="app">
      <h1>faces.com.mt</h1>
    </div>
  );
};

export default App;
