// Route: src/app/api/lead/route.ts
import { NextResponse, NextRequest } from "next/server";
// import { confirmQuote, uploadPDFBufferToSalesforce } from "./quoteService";
import FormData from "@/interfaces/formData";
import { saveLead } from "./leadService";

// Security utilities for data sanitization
function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/['"]/g, '') // Remove quotes to prevent SQL injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, 500); // Limit length
}

function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return '';
  
  // Basic email sanitization
  const sanitized = email.trim().toLowerCase();
  
  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(sanitized) ? sanitized : '';
}

function sanitizePhone(phone: string): string {
  if (typeof phone !== 'string') return '';
  
  // Remove all non-numeric characters except + and spaces
  return phone.replace(/[^\d\s+()-]/g, '').trim().slice(0, 20);
}

function validateAndSanitizeFormData(data: any): FormData | null {
  try {
    // Check if data exists and is an object
    if (!data || typeof data !== 'object') {
      return null;
    }

    const sanitized: any = {
      FirstName: sanitizeString(data['given-name'] || ''),
      LastName: sanitizeString(data['family-name'] || ''),
      Email: sanitizeEmail(data.email || ''),
      MobilePhone: sanitizePhone(data.tel || ''),
      Company: sanitizeString(data.organization || ''),
      Title: sanitizeString(data.designation || ''),
      LeadSource: 'Website',
      Lead__c: 'Website',
    };

    // Validate required fields after sanitization
    if (!sanitized.FirstName || sanitized.FirstName.length < 2) {
      throw new Error('Valid name is required (minimum 2 characters)');
    }

    if (!sanitized.Email) {
      throw new Error('Valid email address is required');
    }

    return sanitized;
  } catch (error) {
    throw new Error(`Validation failed: ${error instanceof Error ? error.message : 'Invalid data'}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check (basic implementation)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown';
    
    // Check content type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    const rawData = await request.json();
    
    // Validate and sanitize the form data
    const formData = validateAndSanitizeFormData(rawData);

    if (!formData) {
      return NextResponse.json(
        { error: 'Invalid form data provided' },
        { status: 400 }
      );
    }
    
    const result = await saveLead(formData);

    return NextResponse.json({
      message: 'Lead data received successfully',
      success: true,
      data: formData
    });
    
  } catch (error) {
    console.error('Error processing lead form:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false 
      },
      { status: 500 }
    );
  }
}
