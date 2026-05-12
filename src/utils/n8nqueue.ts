// utils/n8nQueue.ts

const queue: Array<() => Promise<void>> = [];
let isProcessing = false;

export const addToN8NQueue = (job: () => Promise<void>) => {
  queue.push(job);
  processQueue();
};

const processQueue = async () => {
  if (isProcessing) return;
  isProcessing = true;

  while (queue.length > 0) {
    const job = queue.shift()!;
    try {
      await job();
    } catch (error) {
      console.error('Queue job error:', error);
    }
    // Jeda 2 detik antar trigger — n8n tidak kewalahan
    if (queue.length > 0) {
      await new Promise(resolve => setTimeout(resolve, 100000));
    }
  }

  isProcessing = false;
};