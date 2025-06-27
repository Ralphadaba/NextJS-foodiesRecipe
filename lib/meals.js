//This is us communicating with the database directly because of Next JS

import { MongoClient } from "mongodb";
import fs from "node:fs";
import * as dotenv from "dotenv";

// import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

// const s3 = new S3({
//   region: 'us-east-1',
//   // credentials: {
//   //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   // },
// });
dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let cachedClient = null;

async function getClient() {
  if (!cachedClient || !cachedClient.topology?.isConnected?.()) {
    await client.connect();
    cachedClient = client;
  }
  return cachedClient;
}

// 1. Get All Meals
export async function getMeals() {
  try {
    const client = await getClient();
    const db = client.db();
    const mealsCollection = db.collection("meals");

    // Simulate delay like before (optional)
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const meals = await mealsCollection
      .find(
        {},
        {
          projection: {
            _id: 0,
            title: 1,
            slug: 1,
            image: 1,
            summary: 1,
          },
        }
      )
      .toArray();

    return meals;
  } catch (error) {
    console.error("❌ Failed to fetch meals:", error);
    return [];
  }
}

// 2. Get Meal by Slug
export async function getMeal(slug) {
  try {
    const client = await getClient();
    const db = client.db();
    const mealsCollection = db.collection("meals");

    const meal = await mealsCollection.findOne(
      { slug },
      {
        projection: {
          _id: 0,
          title: 1,
          slug: 1,
          image: 1,
          summary: 1,
          instructions: 1,
          creator: 1,
          creator_email: 1,
        },
      }
    );

    return meal;
  } catch (error) {
    console.error(`❌ Failed to fetch meal with slug "${slug}":`, error);
    return null;
  }
}

// 3. Save Meal (Insert New Meal)
export async function saveMeal(meal) {
  try {
    const client = await getClient();
    const db = client.db();
    const mealsCollection = db.collection("meals");

    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions); // Sanitize

    const extension = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    await new Promise((resolve, reject) => {
      stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) return reject("❌ Saving image failed!");
        resolve();
      });
    });

    meal.image = `/images/${fileName}`;

    const result = await mealsCollection.insertOne({
      title: meal.title,
      summary: meal.summary,
      instructions: meal.instructions,
      creator: meal.creator,
      creator_email: meal.creator_email,
      image: meal.image,
      slug: meal.slug,
    });

    console.log(`✅ Saved meal: ${meal.title}, ID: ${result.insertedId}`);
  } catch (error) {
    console.error("❌ Failed to save meal:", error);
    throw error;
  }
}
/**
 * //This is us communicating with the database directly because of Next JS 

// import fs from 'node:fs';
import { S3 } from '@aws-sdk/client-s3';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const s3 = new S3({
  region: 'us-east-1',
  // credentials: {
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // },
});
const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error('Loading meals failed');
  return db.prepare('SELECT * FROM meals').all();  //450  //check that Joshuas course to learn to communicate with database
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug); // // Always use dynamic bla bla when... for security to avoid SQL injection -- 455
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });  //IDG
  meal.instructions = xss(meal.instructions);  //IDG

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: 'maxschwarzmueller-nextjs-demo-users-image',
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });


  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
 * 
 */
