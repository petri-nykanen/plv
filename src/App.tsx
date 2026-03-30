import { useState } from "react";
import Papa from "papaparse";

function App() {
  // Parsed JSON data from CSV
  const [data, setData] = useState<any[]>([]);

  const getTuoteParts = (item: any) => {
    const rawValue = item?.tuote_per101 ?? "";
    console.log(String(rawValue).split(","));
    return String(rawValue).split(",");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      columns: true, // Use the first row as column names
      delimiter: ",", // Set the delimiter to semicolon
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        // results.data is the parsed JSON array
        setData(results.data as any[]);
        console.log("Parsed CSV data:", results.data);
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
      },
    });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>CSV to JSON Converter</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {data.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h2>Resulting JSON</h2>
          {data.map((item, index) => {
            const parts = getTuoteParts(item);
            const atc = String(item?.atc_koodi_per101 ?? "");
            const nimi = String(item?.nimi_per101 ?? "");
            const vahvuus = String(item?.annosteluyks_kerroin_per101 ?? "");
            const annosyks = String(item?.annosyks_per101 ?? "");

            return (
              <div
                key={index}
                style={{
                  marginBottom: "1rem",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                }}
              >
                <pre>
                  {parts[0] ?? nimi ?? ""} <br />
                  {parts[1] ? parts[1] : nimi} {parts[5] ?? vahvuus ?? ""}{" "}
                  {parts[6] ?? annosyks ?? ""}
                  <br></br>
                  {atc ?? parts[114] ?? "ATC Koodia ei löytynyt"}
                </pre>
              </div>
            );
          })}
          <h1>DUPLICATES</h1>
          {(() => {
            const atcValues = data.map((item) =>
              String(item?.atc_koodi_per101 ?? ""),
            );
            const duplicateAtcValuesSet = new Set(
              atcValues.filter(
                (atc, idx, arr) => atc !== "" && arr.indexOf(atc) !== idx,
              ),
            );

            return data
              .filter((item) =>
                duplicateAtcValuesSet.has(String(item?.atc_koodi_per101 ?? "")),
              )
              .map((item, index) => {
                const nimi = String(item?.nimi_per101 ?? "");
                const annosteluyksKerroin = String(
                  item?.annosteluyks_kerroin_per101 ?? "",
                );
                const annosyks = String(item?.annosyks_per101 ?? "");
                const atc = String(item?.atc_koodi_per101 ?? "");

                return (
                  <div
                    key={index}
                    style={{
                      marginBottom: "1rem",
                      padding: "0.5rem",
                      border: "1px solid #ccc",
                    }}
                  >
                    <pre>{nimi}</pre>
                    <pre>
                      {annosteluyksKerroin}
                      {annosyks}
                    </pre>
                    <pre>{atc}</pre>
                  </div>
                );
              });
          })()}
        </div>
      )}
    </div>
  );
}

export default App;
