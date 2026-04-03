import { test, expect } from '@playwright/test';

const BASE = "http://localhost:8081/api";

/* existing safe DB records */
const userId = 2;
const serviceId = 1;
const slotId = 6;
const bookingId = 2;
const paymentId = 1;

test.describe("Stable API Tests (Using Existing Data)", () => {

  // ---------- USERS ----------

  test("Get All Users", async ({ request }) => {
    const res = await request.get(`${BASE}/users`);
    expect(res.status()).toBe(200);
  });

  test("Get User By ID", async ({ request }) => {
    const res = await request.get(`${BASE}/users/${userId}`);
    expect(res.status()).toBe(200);
  });

  // ---------- SERVICES ----------

  test("Get All Services", async ({ request }) => {
    const res = await request.get(`${BASE}/services`);
    expect(res.status()).toBe(200);
  });

  test("Get Service By ID", async ({ request }) => {
    const res = await request.get(`${BASE}/services/${serviceId}`);
    expect(res.status()).toBe(200);
  });

  // ---------- SLOTS ----------

  test("Get All Slots", async ({ request }) => {
    const res = await request.get(`${BASE}/slots`);
    expect(res.status()).toBe(200);
  });

  test("Get Slot By ID", async ({ request }) => {
    const res = await request.get(`${BASE}/slots/${slotId}`);
    expect(res.status()).toBe(200);
  });

  // ---------- BOOKINGS ----------

  test("Get All Bookings", async ({ request }) => {
    const res = await request.get(`${BASE}/bookings`);
    expect(res.status()).toBe(200);
  });

  test("Get Booking By ID", async ({ request }) => {
    const res = await request.get(`${BASE}/bookings/${bookingId}`);
    expect(res.status()).toBe(200);
  });

  test("Get Bookings By User", async ({ request }) => {
    const res = await request.get(`${BASE}/bookings/user/${userId}`);
    expect(res.status()).toBe(200);
  });

  // ---------- PAYMENTS ----------

  test("Get All Payments", async ({ request }) => {
    const res = await request.get(`${BASE}/payments`);
    expect(res.status()).toBe(200);
  });

  test("Get Payment By ID", async ({ request }) => {
    const res = await request.get(`${BASE}/payments/${paymentId}`);
    expect(res.status()).toBe(200);
  });

  test("Get Payment By Booking", async ({ request }) => {
    const res = await request.get(`${BASE}/payments/booking/${bookingId}`);
    expect(res.status()).toBe(200);
  });

});