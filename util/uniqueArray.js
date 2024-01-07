export function uniqueArray(data) {
  const array = [...new Map(data.map((item) => [item["id"], item])).values()];

  return array.reverse();
}
