import { postPublicComment } from "./postPublicComment";
import nock from "nock";

describe("postPublicComment", () => {
  afterEach(nock.cleanAll);
  afterAll(nock.restore);

  const publicCommentToSave = {
    name: "some name",
    comment: "some comment",
    email: "some email"
  };

  // eslint-disable-next-line jest/expect-expect
  it("should post/save public comment", async () => {
    const expectedReqBody = publicCommentToSave;
    const publicCommentPostedScope = nock("http://localhost", {
      reqheaders: {
        "Content-Type": "application/json"
      }
    })
      .post("/api/public-comment", expectedReqBody)
      .reply(201);

    await postPublicComment(publicCommentToSave);
    publicCommentPostedScope.done();
  });

  it("rejects when response is not 201", async () => {
    nock("http://localhost").post("/api/public-comment").reply(500);

    await expect(postPublicComment(publicCommentToSave)).rejects.toThrowError(
      /failed/i
    );
  });
});
