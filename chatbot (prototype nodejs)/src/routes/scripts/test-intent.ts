import { classifyIntent } from '../../modules/intent/intent.service.js';

async function main() {

  const result = await classifyIntent({
    message: 'Who is the president of the United States?',
    history: [],
  });

  console.log(
    JSON.stringify(
      result,
      null,
      2
    )
  );
}

main().catch(console.error);