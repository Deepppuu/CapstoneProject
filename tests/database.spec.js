const { test, expect } = require('@playwright/test');
const mysql = require('mysql2/promise');

let connection;

test.beforeAll(async () => {

  connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass@word1",
    database: "appointment_db"
  });

});

test.afterAll(async () => {
  if (connection) {
    await connection.end();
  }
});


// 1
test("User table should not be empty", async () => {

  const [rows] = await connection.execute("SELECT * FROM user");
  expect(rows.length).toBeGreaterThan(0);

});


// 2
test("Verify Deepika user exists", async () => {

  const [rows] = await connection.execute(
    "SELECT * FROM user WHERE email='deepika@gmail.com'"
  );

  expect(rows.length).toBe(1);

});




// 4 ✅ FIXED TABLE NAME + SAFE CHECK
test("Haircut service price validation", async () => {

  const [rows] = await connection.execute(
    "SELECT price FROM service_entity WHERE name='Haircut'"
  );

  expect(rows.length).toBeGreaterThan(0);
  expect(rows[0].price).toBe(200);

});


// 5
test("Slot table should not be empty", async () => {

  const [rows] = await connection.execute("SELECT * FROM slot");
  expect(rows.length).toBeGreaterThan(0);

});


// 6
test("Slot time should not be null", async () => {

  const [rows] = await connection.execute(
    "SELECT time FROM slot WHERE id=6"
  );

  expect(rows.length).toBeGreaterThan(0);
  expect(rows[0].time).not.toBeNull();

});


// 7
test("Booking table should not be empty", async () => {

  const [rows] = await connection.execute("SELECT * FROM booking");
  expect(rows.length).toBeGreaterThan(0);

});


// 8
test("Booking status validation", async () => {

  const [rows] = await connection.execute(
    "SELECT status FROM booking WHERE id=2"
  );

  expect(rows.length).toBeGreaterThan(0);
  expect(rows[0].status).toBeTruthy();

});


// 9
test("Payment table should not be empty", async () => {

  const [rows] = await connection.execute("SELECT * FROM payment");
  expect(rows.length).toBeGreaterThan(0);

});


// 10
test("Payment status should be PAID", async () => {

  const [rows] = await connection.execute(
    "SELECT status FROM payment WHERE id=1"
  );

  expect(rows.length).toBeGreaterThan(0);
  expect(rows[0].status).toBe("PAID");

});