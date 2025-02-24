test("Get para api/v1/migrations deve retornar 200", async () => {
  const res = await fetch("http://localhost:3000/api/v1/migrations");
  expect(res.status).toBe(200);

  const responseBody = await res.json();

  expect(Array.isArray(responseBody)).toBe(true);

  console.log(responseBody);
});
