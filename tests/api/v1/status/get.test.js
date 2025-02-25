test("Get para api/v1/status deve retornar 200", async () => {
  const res = await fetch("http://localhost:3000/api/v1/status");
  expect(res.status).toBe(200);

  const resBody = await res.json();

  const parseDate = new Date(resBody.updated_At).toISOString();
  expect(resBody.updated_At).toEqual(parseDate);

  expect(resBody.dependecies.database.version).toBe("16.7");

  expect(resBody.dependecies.database.user_Max).toBe(100);

  // expect(resBody.dependecies.database.user_Up).toEqual(1);
});
