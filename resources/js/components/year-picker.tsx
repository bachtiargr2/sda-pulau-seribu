import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

interface YearPickerProps {
  value?: number;
  onChange?: (year: number) => void;
  placeholder?: string;
  minYear?: number;
  maxYear?: number;
}

export function YearPicker({
  value,
  onChange,
  placeholder = "Select year",
  minYear = 1900,
  maxYear = 2100,
}: YearPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const [displayYear, setDisplayYear] = useState(value || currentYear);

  // Calculate the start year for the current view (showing 12 years at a time)
  const getStartYear = (year: number) => {
    return Math.floor(year / 12) * 12;
  };

  const [startYear, setStartYear] = useState(getStartYear(displayYear));

  // Generate array of years to display (12 years)
  const years = Array.from({ length: 12 }, (_, i) => startYear + i);

  const handlePreviousYears = () => {
    setStartYear((prev) => Math.max(prev - 12, minYear));
  };

  const handleNextYears = () => {
    setStartYear((prev) => Math.min(prev + 12, maxYear - 11));
  };

  const handleYearSelect = (year: number) => {
    onChange?.(year);
    setDisplayYear(year);
    setIsOpen(false);
  };

  const isYearDisabled = (year: number) => {
    return year < minYear || year > maxYear;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 font-light"
        >
          <Calendar className="h-4 w-4" />
          {value ? value : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousYears}
              disabled={startYear <= minYear}
              className="h-7 w-7"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="px-2">
              {startYear} - {startYear + 11}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextYears}
              disabled={startYear + 11 >= maxYear}
              className="h-7 w-7"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {years.map((year) => (
              <Button
                key={year}
                variant={value === year ? "default" : "outline"}
                size="sm"
                onClick={() => handleYearSelect(year)}
                disabled={isYearDisabled(year)}
                className="h-9"
              >
                {year}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
