import { InferenceClient } from '@huggingface/inference';
import { env } from './env.js';

export const hfClient = new InferenceClient(env.HF_TOKEN);
