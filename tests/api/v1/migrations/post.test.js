import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("DROP schema public cascade; CREATE schema public");
}

test("POST para api/v1/migrations deve retornar 200", async () => {
  const res1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(res1.status).toBe(201);

  const response1Body = await res1.json();
  console.log(response1Body);
  expect(Array.isArray(response1Body)).toBe(true);
  expect(response1Body.length).toBeGreaterThan(0);

  const res2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(res2.status).toBe(200);

  const response2Body = await res2.json();

  expect(Array.isArray(response2Body)).toBe(true);
  expect(response2Body.length).toBe(0);
});
