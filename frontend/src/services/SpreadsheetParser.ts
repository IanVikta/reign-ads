// SpreadsheetParser service for Billboard Data Enhancement
// Handles parsing of CSV and Excel files containing billboard inventory data

import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { RawBillboardData } from '../types/billboard.types';
import { validateRawBillboardData, ValidationResult } from '../types/validation.schemas';
import { MediaType, TrafficLevel } from '../types/enums';

/**
 * Metadata extracted from spreadsheet files
 */
export interface SpreadsheetMetadata {
  fileName: string;
  fileSize: number;
  fileType: string;
  rowCount: number;
  columnCount: number;
  headers: string[];
  lastModified?: Date;
}

/**
 * Result of spreadsheet parsing operation
 */
export interface ParseResult {
  success: boolean;
  data: RawBillboardData[];
  errors: string[];
  warnings: string[];
  metadata: SpreadsheetMetadata;
  validRecords: number;
  invalidRecords: number;
}

/**
 * SpreadsheetParser class for processing billboard inventory data
 */
export class SpreadsheetParser {
  /**
   * Parse spreadsheet file and extract billboard data
   */
  async parseSpreadsheet(file: File): Promise<ParseResult> {
    try {
      // Validate file format
      const formatValidation = this.validateFormat(file);
      if (!formatValidation.success) {
        return {
          success: false,
          data: [],
          errors: formatValidation.errors || ['Invalid file format'],
          warnings: [],
          metadata: this.extractMetadata(file),
          validRecords: 0,
          invalidRecords: 0
        };
      }

      // Extract metadata
      const metadata = this.extractMetadata(file);

      // Parse based on file type
      let rawData: any[];
      if (file.name.toLowerCase().endsWith('.csv')) {
        rawData = await this.parseCSV(file);
      } else {
        rawData = await this.parseExcel(file);
      }

      // Update metadata with actual data
      metadata.rowCount = rawData.length;
      metadata.columnCount = rawData.length > 0 ? Object.keys(rawData[0]).length : 0;
      metadata.headers = rawData.length > 0 ? Object.keys(rawData[0]) : [];

      // Transform and validate data
      const transformResult = this.transformRawData(rawData);
      
      return {
        success: transformResult.validRecords > 0,
        data: transformResult.validData,
        errors: transformResult.errors,
        warnings: transformResult.warnings,
        metadata,
        validRecords: transformResult.validRecords,
        invalidRecords: transformResult.invalidRecords
      };

    } catch (error) {
      return {
        success: false,
        data: [],
        errors: [`Parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`],
        warnings: [],
        metadata: this.extractMetadata(file),
        validRecords: 0,
        invalidRecords: 0
      };
    }
  }

  /**
   * Validate file format and size
   */
  validateFormat(file: File): ValidationResult {
    const errors: string[] = [];
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      errors.push('File size exceeds 10MB limit');
    }

    // Check file extension
    const fileName = file.name.toLowerCase();
    const validExtensions = ['.csv', '.xlsx', '.xls'];
    const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
    
    if (!hasValidExtension) {
      errors.push(`Invalid file format. Supported formats: ${validExtensions.join(', ')}`);
    }

    return {
      success: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined
    };
  }

  /**
   * Extract metadata from file
   */
  extractMetadata(file: File): SpreadsheetMetadata {
    return {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type || this.getFileTypeFromExtension(file.name),
      rowCount: 0,
      columnCount: 0,
      headers: [],
      lastModified: file.lastModified ? new Date(file.lastModified) : undefined
    };
  }

  /**
   * Parse CSV file using Papa Parse
   */
  private async parseCSV(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header: string) => header.trim().toLowerCase().replace(/\s+/g, '_'),
        transform: (value: string) => value.trim(),
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error(`CSV parsing errors: ${results.errors.map(e => e.message).join(', ')}`));
          } else {
            resolve(results.data as any[]);
          }
        },
        error: (error) => {
          reject(new Error(`CSV parsing failed: ${error.message}`));
        }
      });
    });
  }

  /**
   * Parse Excel file using SheetJS
   */
  private async parseExcel(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          
          const sheetName = workbook.SheetNames[0];
          if (!sheetName) {
            reject(new Error('No sheets found in Excel file'));
            return;
          }
          
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: '',
            blankrows: false
          }) as any[][];
          
          if (jsonData.length === 0) {
            resolve([]);
            return;
          }
          
          const headers = jsonData[0].map((h: any) => 
            String(h).trim().toLowerCase().replace(/\s+/g, '_')
          );
          
          const rows = jsonData.slice(1).map(row => {
            const obj: any = {};
            headers.forEach((header, index) => {
              obj[header] = row[index] !== undefined ? String(row[index]).trim() : '';
            });
            return obj;
          });
          
          resolve(rows);
        } catch (error) {
          reject(new Error(`Excel parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read Excel file'));
      };
      
      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Transform raw spreadsheet data to RawBillboardData format
   */
  private transformRawData(rawData: any[]): {
    validData: RawBillboardData[];
    errors: string[];
    warnings: string[];
    validRecords: number;
    invalidRecords: number;
  } {
    const validData: RawBillboardData[] = [];
    const errors: string[] = [];
    const warnings: string[] = [];
    let validRecords = 0;
    let invalidRecords = 0;

    rawData.forEach((row, index) => {
      try {
        const transformedRow = this.transformRow(row, index + 2);
        
        const validation = validateRawBillboardData(transformedRow);
        
        if (validation.success && validation.data) {
          validData.push(validation.data);
          validRecords++;
        } else {
          invalidRecords++;
          errors.push(`Row ${index + 2}: ${validation.errors?.join(', ') || 'Validation failed'}`);
        }
      } catch (error) {
        invalidRecords++;
        errors.push(`Row ${index + 2}: ${error instanceof Error ? error.message : 'Transformation failed'}`);
      }
    });

    return {
      validData,
      errors,
      warnings,
      validRecords,
      invalidRecords
    };
  }

  /**
   * Transform a single row from spreadsheet format to RawBillboardData
   */
  private transformRow(row: any, rowNumber: number): RawBillboardData {
    const findColumnValue = (possibleColumns: string[]): string => {
      for (const col of possibleColumns) {
        if (row[col] !== undefined && row[col] !== '') {
          return String(row[col]).trim();
        }
      }
      return '';
    };

    // Column mappings
    const locationName = findColumnValue(['location', 'location_name', 'name']);
    const latStr = findColumnValue(['latitude', 'lat']);
    const lngStr = findColumnValue(['longitude', 'lng', 'lon']);
    const size = findColumnValue(['size', 'dimensions']);
    const facesStr = findColumnValue(['faces', 'face_count', 'number_of_faces']);
    const mediaTypeStr = findColumnValue(['media_type', 'type', 'display_type']);
    const trafficLevelStr = findColumnValue(['traffic_level', 'traffic', 'traffic_density']);
    const impressionsStr = findColumnValue(['monthly_impressions', 'impressions']);
    const lightingStr = findColumnValue(['lighting', 'illuminated']);
    const region = findColumnValue(['region', 'area']);
    const roads = findColumnValue(['roads', 'road', 'street']);
    const brand = findColumnValue(['brand', 'client']);
    const status = findColumnValue(['status', 'availability']);

    // Validate required fields
    if (!locationName) throw new Error('Location name is required');
    if (!latStr || !lngStr) throw new Error('Coordinates are required');
    if (!size) throw new Error('Size is required');

    // Parse coordinates
    const latitude = parseFloat(latStr);
    const longitude = parseFloat(lngStr);
    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error('Invalid coordinates');
    }

    // Parse faces
    const faces = parseInt(facesStr, 10);
    if (isNaN(faces) || faces < 1 || faces > 4) {
      throw new Error('Faces must be between 1 and 4');
    }

    // Parse monthly impressions
    const monthlyImpressions = parseInt(impressionsStr, 10);
    if (isNaN(monthlyImpressions) || monthlyImpressions < 0) {
      throw new Error('Invalid monthly impressions');
    }

    // Parse lighting
    const lighting = this.parseBoolean(lightingStr);

    // Normalize enum values
    const normalizedMediaType = this.normalizeMediaType(mediaTypeStr);
    const normalizedTrafficLevel = this.normalizeTrafficLevel(trafficLevelStr);

    return {
      locationName,
      latitude,
      longitude,
      size: this.normalizeSize(size),
      faces,
      mediaType: normalizedMediaType,
      trafficLevel: normalizedTrafficLevel,
      monthlyImpressions,
      lighting,
      region,
      roads,
      brand: brand || undefined,
      status: status || undefined
    };
  }

  /**
   * Parse boolean value from various string formats
   */
  private parseBoolean(value: string): boolean {
    if (!value) return false;
    
    const normalized = value.toLowerCase().trim();
    const trueValues = ['true', 'yes', '1', 'on', 'enabled', 'y'];
    
    return trueValues.includes(normalized);
  }

  /**
   * Normalize media type to enum value
   */
  private normalizeMediaType(value: string): string {
    if (!value) throw new Error('Media type is required');
    
    const normalized = value.toLowerCase().trim();
    const mapping: Record<string, string> = {
      'static': 'static',
      'digital': 'digital',
      'led': 'led',
      'electronic': 'digital',
      'print': 'static'
    };
    
    const result = mapping[normalized];
    if (!result) {
      throw new Error(`Invalid media type: ${value}`);
    }
    
    return result;
  }

  /**
   * Normalize traffic level to enum value
   */
  private normalizeTrafficLevel(value: string): string {
    if (!value) throw new Error('Traffic level is required');
    
    const normalized = value.toLowerCase().trim().replace(/\s+/g, '_');
    const mapping: Record<string, string> = {
      'low': 'low',
      'medium': 'medium',
      'high': 'high',
      'very_high': 'very_high',
      'very high': 'very_high'
    };
    
    const result = mapping[normalized];
    if (!result) {
      throw new Error(`Invalid traffic level: ${value}`);
    }
    
    return result;
  }

  /**
   * Normalize size format
   */
  private normalizeSize(size: string): string {
    // Remove spaces and normalize to "10x12m" format
    const normalized = size.toLowerCase()
      .replace(/\s+/g, '')
      .replace('×', 'x')
      .replace(/([0-9])([x])([0-9])/, '$1$2$3');
    
    if (!normalized.endsWith('m')) {
      return normalized + 'm';
    }
    return normalized;
  }

  /**
   * Get file type from extension
   */
  private getFileTypeFromExtension(fileName: string): string {
    const ext = fileName.toLowerCase().split('.').pop();
    const mimeTypes: Record<string, string> = {
      'csv': 'text/csv',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'xls': 'application/vnd.ms-excel'
    };
    return mimeTypes[ext || ''] || 'application/octet-stream';
  }
}

// Export both class and default instance
export default new SpreadsheetParser();
export { SpreadsheetParser };