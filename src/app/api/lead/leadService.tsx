import { getSalesforceConnection } from "@/lib/salesforce";
import Lead from "@/interfaces/lead";
/**
 * Save new lead
 * @param payload - The lead data
 * @returns The result of the confirmation process
 */
export async function saveLead(payload: Lead) {
    try {      
      
      const conn = await getSalesforceConnection();
      await conn.sobject('Lead').create(payload);  
      
      return {
        success: true,
      };
    } catch (err) {
      console.error('Error confirming quote:', err);
      throw err;
    }
  }