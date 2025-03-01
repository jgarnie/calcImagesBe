export async function getFiles({
  model,
}: {
  model: string;
}): Promise<{ statusCode: number; body: string }> {
  const res = await fetch(`${process.env.API_BASE_URL}/api/getFiles`, {
    method: 'GET',
    cache: 'no-store', // Ensures fresh data is always fetched
  });

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  const body = await res.json();
  const variants = body.variants; // Directly access it

  return variants;
}
