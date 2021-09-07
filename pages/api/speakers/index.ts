import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { promisify } from "util";

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  switch (method) {
    case "GET":
      await handleGetMethod(req, res);
      break;
    case "POST":
      await handlePostMethod(req, res);
      break;
    default:
      res.status(501).send(`Method ${method} not implemented`);
      console.log(`Method ${method} not implemented`);
  }
}

async function handlePostMethod(req: NextApiRequest, res: NextApiResponse) {
  const jsonFile = path.resolve("./", "db.json");
  const id = req.query.id as string;
  try {
    const file = await readFileAsync(jsonFile);
    await delay(1000);
    const speakers = JSON.parse(file as unknown as string);
    if (speakers) {
      const body = req.body;
      const newId: number =
        speakers.reduce((acc: number, curr) => {
          if (curr.id > acc) {
            acc = curr.id;
          }
          return acc;
        }, 0) + 1;
      const newSpeaker = { ...body, id: newId.toString() };
      await writeFileAsync(
        jsonFile,
        JSON.stringify(speakers.concat(newSpeaker), null, 2)
      );
      res.status(200).json(speakers);
      console.log(`POST /api/speakers status: 200`);
    } else {
      res.status(500).send("No data found");
      console.log(`POST /api/speakers status: 500`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
    console.log(`POST /api/speakers status: 500`);
  }
}

async function handleGetMethod(_: NextApiRequest, res: NextApiResponse) {
  const jsonFile = path.resolve("./", "db.json");
  try {
    const file = await readFileAsync(jsonFile);
    await delay(1000);
    const speakers = JSON.parse(file as unknown as string);
    if (speakers) {
      res.status(200).json(speakers);
      console.log("GET /api/speakers/ status: 200");
    } else {
      res.status(500).send("No data found");
      console.log("GET /api/speakers/ status: 500");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
    console.log("GET /api/speakers/ status: 500");
  }
}
