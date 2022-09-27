import supertest from "supertest";

import app from "../index.js";

const version = "/api/v1/";

export class BaseTest {
  static appInstance = supertest(app);

  static get = (url) => {
    return BaseTest.appInstance.get(`${version}${url}`);
  };

  static post = (url) => {
    return BaseTest.appInstance.post(`${version}${url}`);
  };
}
