"use client";
import {LeadForm} from "@/components/LeadForm";
import Image from "next/image";

const Index: React.FC = () => {

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {/* Header with FACES Logo */}
      <div className="w-full py-4 lg:py-8">
        <div className="max-w-[1000px] md:max-w-[1200px] px-8 py-4 lg:py-0 lg:px-0 lg:mx-auto my-8 mt-4 md:mt-0">
          <Image
            src="/faces_logo.png"
            alt="Faces logo"
            width={120}
            height={120}
            className="h-auto w-40 sm:w-48"
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center lg:px-4 lg:mx-auto mx-8 mt-4 md:mt-0">
        <div className="w-full max-w-[1000px] md:max-w-[1200px] grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-center">
          
          {/* Content Column */}
          <div className="lg:col-span-2 flex flex-col justify-between h-full">
            {/* Main Title with Graffiti - TOP */}
            <div className="text-left relative">
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white leading-tight">
                Everyone <br /> is outdoors.
              </h1>
              {/* Graffiti text overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none top-64">
                <div className="font-graffiti text-8xl text-black transform -rotate-12 opacity-90 leading-tight text-center">
                  your<br />brand<br />is not
                </div>
              </div>
            </div>
            
            {/* Bottom Content - BOTTOM */}
            <div className="space-y-6 lg:space-y-36">
              {/* Description */}
              <div className="text-left h-[350px] lg:h-auto flex items-center mr-8">
                <p className="text-2xl sm:text-3xl text-white/90 max-w-full lg:max-w-2xl">
                  Faces manages the largest outdoor media network on the island. From high-traffic streets to pedestrian hotspots.
                  <br /><b>We put your brand where your customers are.</b>
                </p>
              </div>
              
              {/* Bottom Text Sections */}
              <div className="text-center lg:text-left grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 max-w-5xl mx-auto lg:mx-0">
                <div>
                  <p className="text-xs md:text-base text-white/90 mb-1">
                    SELECT YOUR LOCATIONS YOUR DATES
                  </p>
                  <b className="text-xs md:text-base text-white">
                    MAKE YOUR BRAND IMPOSSIBLE TO MISS.
                  </b>
                </div>
                <div>
                  <p className="text-xs md:text-base text-white/90 mb-1">
                    FACES OUTDOOR MEDIA
                  </p>
                  <b className="text-xs md:text-base text-white">
                    VISIBILITY DELIVERED.
                  </b>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lead Form */}
          <div className="lg:col-span-1 flex justify-center my-8 md:mt-0">
            <div className="w-full max-w-full md:max-w-md">
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
