import NodeCache from 'node-cache';

export const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes
