/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSalesforceConnection } from "./salesforce";
import QuoteLineItem from "@/interfaces/quoteLineItem";
import Location from "@/interfaces/location";

const mapLocations = (locations: any): Location[] => {
  return locations
    .map((loc: any) => ({
      assetCode: loc?.Face__r?.Asset_Code__c || "",
      assetName: loc?.Face__r?.Asset_Name__c || "",
      id: loc?.Id,
      faceName: loc?.Face__r.Name,
      latitude: +loc?.Face__r?.Side__r?.Panel__r?.Faces_Asset__r?.Latitude__c,
      locality:
        loc?.Face__r?.Side__r?.Panel__r?.Faces_Asset__r?.Locality__r.Name || "",
      longitude: +loc?.Face__r?.Side__r?.Panel__r?.Faces_Asset__r?.Longitude__c,
      phaseName: loc?.Phase_Name__c || loc?.PhaseName__c || "",
      regionName:
        loc?.Face__r?.Side__r?.Panel__r?.Faces_Asset__r?.Region_Name__c || "",
      sideType: loc?.Face__r?.Side__r?.Side_Type__c || "",
      transportMaltaNumber:
        +loc?.Face__r?.Side__r?.Panel__r?.Faces_Asset__r
          ?.TransportMaltaNumber__c,
      urlGoogleMaps:
        loc?.Face__r?.Side__r?.Panel__r?.Faces_Asset__r?.Notes__c || "",
    }))
    .sort((a: Location, b: Location) => (a.assetCode > b.assetCode ? 1 : -1));
};

const mapQuoteLineItems = (quoteLineItems: any): QuoteLineItem[] => {
  const yy = new Date().getFullYear().toString().substring(2);

  return quoteLineItems
    .map((qli: any) => ({
      periodDetailId: qli?.Period_Detail__c,
      phaseId: qli?.Phase__c,
      faceId: qli?.Face__c,
      campaignName: qli?.Campaign_Name_Flow__c || "",
      id: qli?.Id,
      isExtended: qli?.Is_Extended__c || false,
      periodDates: qli?.Period_Dates__c
        ? qli?.Period_Dates__c.replaceAll(
            new Date().getFullYear().toString(),
            yy
          )
        : "",
      periodNumber: qli?.Period_Detail__r?.Period_Number__c || "",
      regionName: qli?.RegionName__c || "",
      locations: [],
    }))
    .sort((a: QuoteLineItem, b: QuoteLineItem) =>
      a.periodNumber > b.periodNumber ? 1 : -1
    );
};

export async function getLocations(item: QuoteLineItem) {
  try {
    const locations: Location[] = [];

    if (item.phaseId) {
      const allLocations: Location[] = [];
      const schedule: Location[] = (await getSchedulePhase(item)) ?? [];
      const quotingSchedule: Location[] =
        (await getQuotingSchedulePhase(item)) ?? [];
      const quotingScheduleEmptyPhase: Location[] = quotingSchedule.filter(
        (qs) => !(qs.phaseName && qs.phaseName.length > 0)
      );

      allLocations.push(...schedule);
      allLocations.push(...quotingSchedule);

      allLocations.forEach((location) => {
        if (
          !locations.find((l) => l.faceName == location.faceName) &&
          !quotingScheduleEmptyPhase.find(
            (l) => l.faceName == location.faceName
          )
        ) {
          locations.push(location);
        }
      });
    } else {
      locations.push(...((await getScheduleFace(item)) ?? []));
    }

    return locations;
  } catch (err) {
    console.log(err);
  }
}

export async function getDates(quoteId: string) {
  try {
    const result: QuoteLineItem[] = [];
    const quoteLineItems = await getQuoteLineItems(quoteId);

    if (quoteLineItems) {
      for (const quoteLineItem of quoteLineItems) {
        const locations = await getLocations(quoteLineItem);
        if (locations && locations.length) {
          quoteLineItem.locations = locations;
          result.push(quoteLineItem);
        }
      }
    }
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function getQuoteLineItems(quoteId: string) {
  try {
    const conn = await getSalesforceConnection();
    const records =
      await conn.query(`SELECT Id, Period_Detail__c, Period_Detail__r.Period_Number__c, RegionName__c, Phase__c, Face__c,
      Campaign_Name_Flow__c, Is_Extended__c, Period_Dates__c
       FROM QuoteLineItem where quoteid = '${quoteId}'`);
    return mapQuoteLineItems(records.records);
  } catch (err) {
    console.log(err);
  }
}

async function getSchedulePhase(quoteLineItems: QuoteLineItem) {
  try {
    const conn = await getSalesforceConnection();
    const records =
      await conn.query(`SELECT Id, Face__c, Face__r.Asset_Code__c, Face__r.Asset_Name__c, Face__r.Side__r.Panel__r.Faces_Asset__r.Latitude__c,
      Face__r.Side__r.Panel__r.Faces_Asset__r.Locality__r.Name, Face__r.Side__r.Panel__r.Faces_Asset__r.Longitude__c,
      Face__r.Side__r.Panel__r.Faces_Asset__r.Region_Name__c, Face__r.Side__r.Side_Type__c,
      Face__r.Side__r.Panel__r.Faces_Asset__r.TransportMaltaNumber__c, Face__r.Side__r.Panel__r.Faces_Asset__r.Notes__c,
      Face__r.Name, Phase_Name__c     
      FROM Schedule__c where Period_Number__c = '${quoteLineItems.periodDetailId}' AND Phase__c = '${quoteLineItems.phaseId}'`);
    return mapLocations(records.records);
  } catch (err) {
    console.log(err);
  }
}
async function getQuotingSchedulePhase(quoteLineItems: QuoteLineItem) {
  try {
    const conn = await getSalesforceConnection();
    const records =
      await conn.query(`SELECT Id, Phase__c, Face__c, Face__r.Asset_Code__c,Face__r.Asset_Name__c, Face__r.Side__r.Panel__r.Faces_Asset__r.Latitude__c,
      Face__r.Side__r.Panel__r.Faces_Asset__r.Locality__r.Name, Face__r.Side__r.Panel__r.Faces_Asset__r.Longitude__c,
      Face__r.Side__r.Panel__r.Faces_Asset__r.Region_Name__c, Face__r.Side__r.Side_Type__c,
      Face__r.Side__r.Panel__r.Faces_Asset__r.TransportMaltaNumber__c, Face__r.Side__r.Panel__r.Faces_Asset__r.Notes__c,
      Face__r.Name, PhaseName__c      
      FROM QuotingSchedule__c where QuoteLineItem__c = '${quoteLineItems.id}'`);
    return mapLocations(records.records);
  } catch (err) {
    console.log(err);
  }
}

async function getScheduleFace(quoteLineItems: QuoteLineItem) {
  try {
    const conn = await getSalesforceConnection();
    const records =
      await conn.query(`SELECT Id, Face__c, Face__r.Asset_Code__c,Face__r.Asset_Name__c, Face__r.Side__r.Panel__r.Faces_Asset__r.Latitude__c,
      Face__r.Side__r.Panel__r.Faces_Asset__r.Locality__r.Name, Face__r.Side__r.Panel__r.Faces_Asset__r.Longitude__c,
      Face__r.Side__r.Panel__r.Faces_Asset__r.Region_Name__c, Face__r.Side__r.Side_Type__c,
      Face__r.Side__r.Panel__r.Faces_Asset__r.TransportMaltaNumber__c, Face__r.Side__r.Panel__r.Faces_Asset__r.Notes__c,
      Face__r.Name, Phase_Name__c       
      FROM Schedule__c where Period_Number__c = '${quoteLineItems.periodDetailId}' AND Face__c = '${quoteLineItems.faceId}'`);
    return mapLocations(records.records);
  } catch (err) {
    console.log(err);
  }
}
