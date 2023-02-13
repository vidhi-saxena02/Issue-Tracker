export default async function fetchWithError(url, options) {
  const resposne = await fetch(url, options);

  if (resposne.status === 200) {
    const result = await resposne.json();

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  }

  throw new Error(`Error ${resposne.status}: ${resposne.statusText}`);
}
