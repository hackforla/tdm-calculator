/* eslint-disable jest/no-disabled-tests */
import * as feedbackService from "./feedback.service";
import nock from "nock";

/*
 TODO: (John Darragh) Don't know if testing client-side services really 
 adds much value - Need to decide if it's worthwhile.
*/

describe("postFeedback", () => {
  afterEach(nock.cleanAll);
  afterAll(nock.restore);

  const feedback = {
    name: "some name",
    comment: "some comment",
    email: "some email"
  };

  it.skip("should post/save feedback", async () => {
    const expectedReqBody = feedback;
    const feedbackPostedScope = nock("http://localhost", {
      reqheaders: {
        "Content-Type": "application/json"
      }
    })
      .post("/api/public-comment", expectedReqBody)
      .reply(201);

    await feedbackService.post(feedback);
    expect(feedbackPostedScope.isDone()).toBe(true);
    feedbackPostedScope.done();
  });

  it.skip("rejects when response is not 201", async () => {
    nock("http://localhost").post("/api/public-comment").reply(500);

    await expect(feedbackService.post(feedback)).rejects.toThrow(/failed/i);
  });
});
