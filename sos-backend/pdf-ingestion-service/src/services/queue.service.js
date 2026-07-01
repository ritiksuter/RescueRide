import { Queue } from "bullmq";
import { getRedisClient } from "../config/redis.js";
import logger from "../utils/logger.js";

const QUEUE_NAME =
  process.env.QUEUE_NAME ||
  "pdf-ingestion-queue";

let ingestionQueue;

/**
 * Initialize BullMQ Queue
 */
const initializeQueue = () => {
  try {
    if (ingestionQueue) {
      return ingestionQueue;
    }

    const redisConnection =
      getRedisClient();

    ingestionQueue = new Queue(
      QUEUE_NAME,
      {
        connection: redisConnection,

        defaultJobOptions: {
          attempts: 3,

          backoff: {
            type: "exponential",
            delay: 5000,
          },

          removeOnComplete: 100,
          removeOnFail: 50,
        },
      }
    );

    logger.info(
      `BullMQ Queue initialized: ${QUEUE_NAME}`
    );

    return ingestionQueue;
  } catch (error) {
    logger.error(
      `Queue Initialization Failed: ${error.message}`
    );

    throw error;
  }
};

/**
 * Get Queue Instance
 */
const getQueue = () => {
  if (!ingestionQueue) {
    throw new Error(
      "Queue not initialized. Call initializeQueue() first."
    );
  }

  return ingestionQueue;
};

/**
 * Add PDF ingestion job
 */
const addIngestionJob = async (
  jobData
) => {
  try {
    if (!jobData?.documentId) {
      throw new Error(
        "documentId is required"
      );
    }

    const queue = getQueue();

    const job = await queue.add(
      "process-pdf-ingestion",
      jobData
    );

    logger.info(
      `Job added successfully | Job ID: ${job.id}`
    );

    return job;
  } catch (error) {
    logger.error(
      `Failed to add job: ${error.message}`
    );

    throw error;
  }
};

export {
  initializeQueue,
  addIngestionJob,
};