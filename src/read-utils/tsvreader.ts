import fs from "fs";

interface TsvRow {
  [key: string]: string;
}

interface TsvReaderOptions {
  delimiter?: string;
}

interface TsvReaderResult {
  headers: string[];
  rows: TsvRow[];
}

class TsvReader {
  private delimiter: string;

  constructor(options: TsvReaderOptions = {}) {
    this.delimiter = options.delimiter || "\t";
  }

  public readFileSync(path: string): TsvReaderResult {
    const tsv = fs.readFileSync(path, "utf8");
    const headers = tsv.split("\n")[0]?.split(this.delimiter);
    if (!headers?.length) {
      throw new Error("No headers found in the TSV file");
    }
    const rows = tsv
      .split("\n")
      .slice(1)
      .filter((line) => line.trim())
      .map((line) => {
        const row: TsvRow = {};
        line.split(this.delimiter).forEach((value, index) => {
          if (headers[index] && value) {
            row[headers[index]] = value;
          }
        });
        return row;
      });
    return { headers: headers ?? [], rows };
  }

  public readFilesSync(paths: string[]): TsvReaderResult[] {
    return paths
      .map((path) => {
        const result = this.readFileSync(path);
        return {
          headers: result.headers,
          rows: result.rows,
        };
      })
      .filter((result) => result.headers.length > 0 && result.rows.length > 0);
  }
}

export default TsvReader;
