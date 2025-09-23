import { NextApiRequest, NextApiResponse } from 'next';

// Placeholder for virus scanning API
const scanFileWithVirusTotal = async (file: Buffer): Promise<boolean> => {
  // In a real implementation, you would use an API like VirusTotal or ClamAV
  // to scan the file for viruses. This requires an API key and setup.
  console.log('Scanning file for viruses...');
  // For demonstration purposes, we'll assume the file is clean.
  return true;
};

// Enforce file size and row limits
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_ROW_COUNT = 1000;

export const validateFileUpload = async (file: Express.Multer.File): Promise<string | null> => {
  if (file.size > MAX_FILE_SIZE) {
    return `File size exceeds the limit of ${MAX_FILE_SIZE / 1024 / 1024}MB.`;
  }

  // For Excel files, you would parse the file to check the row count.
  // This is a placeholder for demonstration.
  // const workbook = new ExcelJS.Workbook();
  // await workbook.xlsx.load(file.buffer);
  // const worksheet = workbook.worksheets[0];
  // if (worksheet.rowCount > MAX_ROW_COUNT) {
  //   return `Row count exceeds the limit of ${MAX_ROW_COUNT}.`;
  // }

  const isFileClean = await scanFileWithVirusTotal(file.buffer);
  if (!isFileClean) {
    return 'Virus detected in the uploaded file.';
  }

  return null;
};

// Whitelist accepted columns/fields
const ACCEPTED_COLUMNS = ['principal', 'rate', 'tenure'];

export const validateData = (data: any[]): string | null => {
  for (const row of data) {
    for (const key in row) {
      if (!ACCEPTED_COLUMNS.includes(key)) {
        return `Invalid column detected: ${key}.`;
      }
    }
  }
  return null;
};

// Placeholder for authentication and authorization
export const isAuthenticated = (req: NextApiRequest): boolean => {
  // In a real application, you would have a proper authentication system
  // (e.g., using JWT, OAuth, etc.) to verify the user's identity.
  // For now, we'll just check for a simple API key in the headers.
  const apiKey = req.headers['x-api-key'];
  return apiKey === process.env.API_KEY;
};

export const withAuth = (handler: (req: NextApiRequest, res: NextApiResponse) => void) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return handler(req, res);
  };
};
