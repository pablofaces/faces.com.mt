"use client";
import {LeadForm} from "@/components/LeadForm";
import Image from "next/image";

const Index: React.FC = () => {

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-7xl grid md:grid-cols-3 gap-8 items-center relative">
        
        {/* FACES Logo alineado con el texto */}
        <div className="absolute -top-28 left-0 z-10">
          <Image
            src="/faces_logo.png"
            alt="Faces logo"
            width={180}
            height={180}
            className="h-auto"
          />
        </div>
        
        <div className="md:col-span-2 flex flex-col h-full justify-between">
          <div className="text-center md:text-left relative">
            <h1 className="text-4xl md:text-8xl font-bold text-white leading-tight">
              Everyone <br /> is outdoors.
            </h1>
            {/* Graffiti text overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none top-64 -right-30">
              <div className="font-graffiti text-4xl md:text-8xl text-black transform -rotate-12 opacity-90 leading-tight">
                your<br />brand<br />is not
              </div>
            </div>
          </div>
          <div className="text-center md:text-left">
            <p className="text-xl md:text-3xl text-white/90 max-w-2xl">
              Faces manages the largest outdoor media network on the island. From high-traffic streets to pedestrian hotspots.
              <br /><b>We put your brand where your customers are.</b>
            </p>
          </div>
          <div className="text-center md:text-left grid grid-cols-2 gap-4 max-w-5xl">
            <div>
            <p className="text-md text-white/90 max-w-md mb-1">
              SELECT YOUR LOCATIONS YOUR DATES
            </p>
            <b className="text-md text-white max-w-md">
              MAKE YOUR BRAND IMPOSSIBLE TO MISS.
            </b>
            </div>
            <div>
            <p className="text-md text-white/90 max-w-md mb-1">
              FACES OUTDOOR MEDIA
            </p>
            <b className="text-md text-white max-w-md">
              VISIBILITY DELIVERED.
            </b>
            </div>
          </div>
        </div>
        
        {/* Lead Form */}
        <div className="md:col-span-1 flex justify-center">
          <LeadForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
