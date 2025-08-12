
import * as React from "react"
import { Locate } from "lucide-react"

interface DistanceInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  unit?: string;
  iconPosition?: 'left' | 'top' | 'none';
}

const DistanceInput = React.forwardRef<HTMLDivElement, DistanceInputProps>(
  ({ value, onChange, placeholder = "Distance", className = "", unit = "meters", iconPosition = 'left' }, ref) => {
    if (iconPosition === 'top') {
      return (
        <div ref={ref} className={`w-full ${className}`}>
          <div className="flex items-center justify-center mb-1">
            <Locate className="h-4 w-4 text-black" />
          </div>
          <div className="flex h-10 w-full items-center border border-gray-200 rounded-md bg-white overflow-hidden">
            <input
              type="number"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className="w-full h-full border-0 focus:outline-none focus:ring-0 text-black px-3"
              min="1"
            />
            <div className="px-3 text-sm text-gray-600 whitespace-nowrap">{unit}</div>
          </div>
        </div>
      )
    }
    
    if (iconPosition === 'none') {
      return (
        <div ref={ref} className={`flex h-10 w-full items-center border border-gray-200 rounded-md bg-white overflow-hidden ${className}`}>
          <input
            type="number"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full h-full border-0 focus:outline-none focus:ring-0 text-black px-3"
            min="1"
          />
          <div className="px-3 text-sm text-gray-600 whitespace-nowrap">{unit}</div>
        </div>
      )
    }
    
    return (
      <div ref={ref} className={`flex h-10 w-full items-center border border-gray-200 rounded-md bg-white overflow-hidden ${className}`}>
        <div className="flex items-center pl-3 pr-2 text-black">
          <Locate className="h-4 w-4" />
        </div>
        <input
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full h-full border-0 focus:outline-none focus:ring-0 text-black px-1"
          min="1"
        />
        <div className="px-3 text-sm text-gray-600 whitespace-nowrap">{unit}</div>
      </div>
    )
  }
)
DistanceInput.displayName = "DistanceInput"

export { DistanceInput }
