import chai from "chai";
import mongoose from "mongoose";
import request from "supertest";
import dotenv from "dotenv";

import { BaseTest } from "./index.spec";
import product from "../models/productModel";

dotenv.config({ path: "../../config/test.env" });
const { expect } = chai;

before(function (done) {
  this.timeout(3000);
  setTimeout(done, 2000);
});

describe("Test product function", () => {
  let productId;
  beforeEach(async () => {
    const testProduct = await BaseTest.post("products").send({
      productName: "test product",
      unitPrice: "100",
      quantity: "10",
    });

    // productId = testProduct.body.product.productId;
  });

  afterEach(async () => {
    await product.deleteMany({});
  });

  it("should create new products with all fields", async () => {
    const response = await (
      await BaseTest.post("products")
    ).send({
      productName: "Iphone 15",
      unitPrice: "1200",
      quantity: "1000",
    });
    expect(response.status).to.equal(201);
    expect(response.body).to.include({ message: "Product added successfully" });
  });

  it("should get product when given an id", async () => {
    const response = await BaseTest.post(`products/${productId}`);
    expect(response.status).to.equal(200);
    expect(response.body.product.productName).to.equal("test product");
    expect(response.body.product.unitPrice).to.equal("100");
    expect(response.body.product.quantity).to.equal("10");
  });

  it("Should get all products", async () => {
    const response = await BaseTest.get("products");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  });
});
