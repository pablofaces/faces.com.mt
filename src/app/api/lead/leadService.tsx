import FormData from "@/interfaces/formData";
import { getSalesforceConnection } from "@/lib/salesforce";

/**
 * Save new lead
 * @param payload - The lead data
 * @returns The result of the confirmation process
 */
export async function saveLead(payload: FormData) {
    try {      
      
      const conn = await getSalesforceConnection();
      const result = await conn.sobject('Lead').create(payload);  
      
      return {
        success: true,
        message: 'Quote confirmed successfully',
        leadId: result.id
      };
    } catch (err) {
      console.error('Error confirming quote:', err);
      throw err;
    }
  }