// import fs from "fs";
// import path from "path";
// import { NextApiRequest, NextApiResponse } from "next/server";

// export async function GET(req: Request, res: NextApiResponse) {
//   console.log("res", res);
//   try {
//     // Specify the source and destination file paths
//     const sourcePath = path.join(
//       process.cwd(),
//       "path/to/your/source/database.db"
//     );
//     const destinationPath = path.join(
//       process.cwd(),
//       "path/to/your/destination/database-copy.db"
//     );

//     // Create a read stream from the source file
//     const sourceStream = fs.createReadStream(sourcePath);

//     // Create a write stream to the destination file
//     const destinationStream = fs.createWriteStream(destinationPath);

//     // Pipe the data from the source stream to the destination stream
//     sourceStream.pipe(destinationStream);

//     sourceStream.on("end", () => {
//       console.log("Database file copied successfully.");
//       res.status(200).json({ message: "Database file copied successfully" });
//     });

//     sourceStream.on("error", (err) => {
//       console.error("Error copying database file:", err);
//       res.status(500).json({ error: "Error copying database file" });
//     });
//   } catch (err) {
//     console.error("Error copying database file:", err);
//     res.status(500).json({ error: "Error copying database file" });
//   }
// }
