import fetch from "node-fetch";

import { TestRail } from "../src/api";
import { HttpMethod, RequestType } from "../src/interfaces";

jest.mock("node-fetch", () => jest.fn());
const { Response } = jest.requireActual("node-fetch");
const mockFetch: jest.MockedFunction<typeof fetch> = fetch as any;

const jsonType = "application/json";
const defaultResponseHeaders = { "Content-Type": jsonType };

describe("API Core", () => {
  const host = "host";
  const baseUrl = "baseUrl";
  const user = "user";
  const apiKey = "key";
  const authHeader =
    "Basic " + Buffer.from(user + ":" + apiKey).toString("base64");

  let api = new TestRail(host, user, apiKey, baseUrl);

  beforeEach(() => {
    mockFetch.mockClear();
  });

  test("constructor", () => {
    expect(api.host).toBe(host);
    expect(api.baseUrl).toBe(baseUrl);
    expect(api.authHeader).toBe(authHeader);
  });

  test("do not override base url", () => {
    const api2 = new TestRail(host, user, apiKey);
    expect(api2.host).toBe(host);
    expect(api2.baseUrl).toBe("/index.php?/api/v2/");
    expect(api2.authHeader).toBe(authHeader);
  });

  describe("API Get", () => {
    test("simple", async () => {
      const url = "url";
      const responseValue = { x: "response" };

      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify(responseValue), {
          headers: defaultResponseHeaders,
        })
      );
      const { value } = await api.apiGet(url);

      expect(mockFetch).toBeCalledTimes(1);
      expect(mockFetch).toBeCalledWith(`${host}${baseUrl}${url}`, {
        body: undefined,
        headers: {
          Authorization: authHeader,
          "Content-Type": jsonType,
        },
        method: HttpMethod.Get,
      });
      expect(value).toMatchObject(responseValue);
    });

    test("with custom headers", async () => {
      const url = "url2";
      const responseValue = { x: "response2" };

      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify(responseValue), {
          headers: defaultResponseHeaders,
        })
      );
      const { value } = await api.apiGet(url, {
        headers: {
          header1: "header1value",
        },
      });

      expect(mockFetch).toBeCalledTimes(1);
      expect(mockFetch).toBeCalledWith(`${host}${baseUrl}${url}`, {
        body: undefined,
        headers: {
          Authorization: authHeader,
          header1: "header1value",
        },
        method: HttpMethod.Get,
      });
      expect(value).toMatchObject(responseValue);
    });

    test("override auth header", async () => {
      const url = "url3";
      const responseValue = { x: "response3" };

      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify(responseValue), {
          headers: defaultResponseHeaders,
        })
      );
      const { value } = await api.apiGet(url, {
        headers: {
          Authorization: "none",
        },
      });

      expect(mockFetch).toBeCalledTimes(1);
      expect(mockFetch).toBeCalledWith(`${host}${baseUrl}${url}`, {
        body: undefined,
        headers: {
          Authorization: "none",
        },
        method: HttpMethod.Get,
      });
      expect(value).toMatchObject(responseValue);
    });

    test("with query variables", async () => {
      const url = "url4";
      const responseValue = { x: "response4" };

      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify(responseValue), {
          headers: defaultResponseHeaders,
        })
      );
      const { value } = await api.apiGet(url, {
        queryVariables: {
          q1: "val1",
          q2: "val2",
        },
      });

      expect(mockFetch).toBeCalledTimes(1);
      expect(mockFetch).toBeCalledWith(
        `${host}${baseUrl}${url}&q1=val1&q2=val2`,
        {
          body: undefined,
          headers: {
            Authorization: authHeader,
            "Content-Type": jsonType,
          },
          method: HttpMethod.Get,
        }
      );
      expect(value).toMatchObject(responseValue);
    });

    test("expect Blob", async () => {
      const url = "url5";
      const responseValue = new Blob(["a", "b", "c"]);

      mockFetch.mockResolvedValueOnce(
        new Response(responseValue, {
          headers: { "Content-Type": "application/octet-stream" },
        })
      );
      const { value } = await api.apiGet(url);

      expect(mockFetch).toBeCalledTimes(1);
      expect(mockFetch).toBeCalledWith(`${host}${baseUrl}${url}`, {
        body: undefined,
        headers: {
          Authorization: authHeader,
          "Content-Type": jsonType,
        },
        method: HttpMethod.Get,
      });
      expect(value).toMatchObject(responseValue);
    });
  });

  describe("API Post", () => {
    test("simple", async () => {
      const url = "url11";
      const body = "aaa";
      const responseValue = { x: "response11" };

      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify(responseValue), {
          headers: defaultResponseHeaders,
        })
      );
      const { value } = await api.apiPost(url, body);

      expect(mockFetch).toBeCalledTimes(1);
      expect(mockFetch).toBeCalledWith(`${host}${baseUrl}${url}`, {
        body: JSON.stringify(body),
        headers: {
          Authorization: authHeader,
          "Content-Type": jsonType,
        },
        method: HttpMethod.Post,
      });
      expect(value).toMatchObject(responseValue);
    });

    test("no body", async () => {
      const url = "url12";
      const responseValue = { x: "response12" };

      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify(responseValue), {
          headers: defaultResponseHeaders,
        })
      );
      const { value } = await api.apiPost(url);

      expect(mockFetch).toBeCalledTimes(1);
      expect(mockFetch).toBeCalledWith(`${host}${baseUrl}${url}`, {
        body: undefined,
        headers: {
          Authorization: authHeader,
          "Content-Type": jsonType,
        },
        method: HttpMethod.Post,
      });
      expect(value).toMatchObject(responseValue);
    });

    test("send and expect Blob", async () => {
      const url = "url13";
      const requestValue = new Blob(["a", "b", "c"]);

      mockFetch.mockResolvedValueOnce(
        new Response(requestValue, {
          headers: { "Content-Type": "application/octet-stream" },
        })
      );
      const { value } = await api.apiPost(url, requestValue, {
        requestType: RequestType.Blob,
      });

      expect(mockFetch).toBeCalledTimes(1);
      expect(mockFetch).toBeCalledWith(`${host}${baseUrl}${url}`, {
        body: requestValue,
        headers: {
          Authorization: authHeader,
        },
        method: HttpMethod.Post,
      });
      expect(value).toMatchObject(requestValue);
    });
  });
});
