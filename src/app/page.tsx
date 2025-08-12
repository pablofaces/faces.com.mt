"use client";
import {LeadForm} from "@/components/LeadForm";
import Image from "next/image";

const Index: React.FC = () => {

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {/* Header with FACES Logo */}
      <div className="w-full py-4 lg:py-8">
        <div className="max-w-[65%] mx-auto">
          <Image
            src="/faces_logo.png"
            alt="Faces logo"
            width={120}
            height={120}
            className="h-auto w-24 sm:w-28 md:w-32 lg:w-48"
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-[65%] grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Content Column */}
          <div className="lg:col-span-2 flex flex-col justify-between h-full">
            {/* Main Title with Graffiti - TOP */}
            <div className="text-center lg:text-left relative">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-white leading-tight">
                Everyone <br /> is outdoors.
              </h1>
              {/* Graffiti text overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none top-64">
                <div className="font-graffiti text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[110px] text-black transform -rotate-12 opacity-90 leading-tight text-center">
                  your<br />brand<br />is not
                </div>
              </div>
            </div>
            
            {/* Bottom Content - BOTTOM */}
            <div className="space-y-6 lg:space-y-36">
              {/* Description */}
              <div className="text-center lg:text-left">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-2xl mx-auto lg:mx-0">
                  Faces manages the largest outdoor media network on the island. From high-traffic streets to pedestrian hotspots.
                  <br /><b>We put your brand where your customers are.</b>
                </p>
              </div>
              
              {/* Bottom Text Sections */}
              <div className="text-center lg:text-left grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 max-w-5xl mx-auto lg:mx-0">
                <div>
                  <p className="text-sm md:text-base text-white/90 mb-1">
                    SELECT YOUR LOCATIONS YOUR DATES
                  </p>
                  <b className="text-sm md:text-base text-white">
                    MAKE YOUR BRAND IMPOSSIBLE TO MISS.
                  </b>
                </div>
                <div>
                  <p className="text-sm md:text-base text-white/90 mb-1">
                    FACES OUTDOOR MEDIA
                  </p>
                  <b className="text-sm md:text-base text-white">
                    VISIBILITY DELIVERED.
                  </b>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lead Form */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="w-full max-w-md">
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
