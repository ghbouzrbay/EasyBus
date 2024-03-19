import DBClient from './utils/db';

const Queue = require('bull');
const imageThumbnail = require('image-thumbnail');
const dbClient = require('./db'); // Assuming you have a file db.js defining DBClient

// Create a Bull queue named fileQueue
const fileQueue = new Queue('fileQueue');

// Process jobs in the fileQueue
fileQueue.process(async (job) => {
  const { fileId, userId } = job.data;

  // Check if fileId and userId are present in the job
  if (!fileId) {
    throw new Error('Missing fileId');
  }

  if (!userId) {
    throw new Error('Missing userId');
  }

  // Check if a document is found in the DB based on the fileId and userId
  const user = await dbClient.getUser({ _id: userId });
  if (!user) {
    throw new Error('File not found');
  }

  // Generate thumbnails with different widths
  const thumbnailSizes = [500, 250, 100];
  const thumbnailResults = await Promise.all(thumbnailSizes.map(async (size) => {
    try {
      const thumbnail = await imageThumbnail(user.filePath, { width: size });
      return { size, thumbnail };
    } catch (error) {
      console.error(`Error generating thumbnail with size ${size}:`, error);
      return null;
    }
  }));

  // Store each thumbnail result on the same location of the original file
  const fileLocation = user.filePath.substring(0, user.filePath.lastIndexOf('.'));
  const fileExtension = user.filePath.substring(user.filePath.lastIndexOf('.'));
  await Promise.all(thumbnailResults.map(async (result) => {
    if (result) {
      const { size, thumbnail } = result;
      const thumbnailFileName = `${fileLocation}_${size}${fileExtension}`;
      // Save the thumbnail to disk or do whatever you want with it
      // Example: fs.writeFileSync(thumbnailFileName, thumbnail);
      console.log(`Thumbnail ${size} created:`, thumbnailFileName);
    }
  }));
});

module.exports = fileQueue;
