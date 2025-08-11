import { useState } from "react";
import LocationList from "@/components/LocationList";
import QuoteLineItem from "@/interfaces/quoteLineItem";
import Location from "@/interfaces/location";
import { FaDownload } from "react-icons/fa";

interface DateListProps {
  dates: QuoteLineItem[];
  selectedDate: QuoteLineItem | null;
  onSelectDate: (data: QuoteLineItem) => void;
  onSelectLocation: (data: Location) => void;
}

const DateList: React.FC<DateListProps> = ({
  dates,
  selectedDate,
  onSelectLocation,
  onSelectDate,
}) => {
  const [openDate, setOpenDate] = useState("");

  const handleSelectDate = (date: QuoteLineItem) => {
    setOpenDate(openDate === date.id ? "" : date.id);
    onSelectDate(date);
  };

  const downloadCSV = () => {
    const splitSeparator = ",";

    if (dates.length === 0) return;

    if (dates[0] && dates[0].locations) {
      const headers = [
        "Region name",
        "Period number",
        "Dates",
        "Bus Shelter Code",
        "Bus Shelter Name",
        "Locality",
        "No Transport Malta",
        "Latitude",
        "Longitude",
        "Url Google Maps",
      ].join(splitSeparator);

      const rows = dates.flatMap((date) => {
        return (
          date.locations?.map((loc) => {
            return [
              date.regionName,
              date.periodNumber,
              date.periodDates || "",
              loc.assetCode,
              loc.assetName,
              loc.locality,
              loc.transportMaltaNumber,
              loc.latitude,
              loc.longitude,
              loc.urlGoogleMaps,
            ]
              .map((value) => `"${value}"`) // Escapar valores con comillas
              .join(splitSeparator)
              .replace("<p>", "")
              .replace("</p>", "");
          }) || []
        );
      });

      const csvContent = [headers, ...rows].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "locations.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="date-list shadow-xl shadow-stone-950/60">
      <div className="flex items-center justify-between">
        <h2 className="list-title">{dates.length} Dates</h2>
        <button
          onClick={downloadCSV}
          className="rounded-full border-gray-400 border p-2 flex items-center gap-2 text-gray-400 hover:bg-gray-600 hover:text-white"
        >
          <FaDownload size={12} />
        </button>
      </div>
      {dates.map((date) => (
        <div key={date.id} className="border-b p-2">
          <button
            onClick={() => handleSelectDate(date)}
            className="w-full text-left font-bold"
          >
            <div className="flex justify-between">
              <div
                className="flex flex-col text-sm"
                style={{
                  color:
                    selectedDate && date.id == selectedDate.id ? "#625df5" : "",
                }}
              >
                <p>
                  {date.regionName} - Period: {date.periodNumber}
                </p>
                <p className="font-light">
                  {date.periodDates} - {date.locations?.length} locations
                </p>
              </div>
              <div className="flex flex-col">▼</div>
            </div>
          </button>
          {openDate === date.id && (
            <LocationList
              locations={date.locations || []}
              onSelectLocation={onSelectLocation}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default DateList;
