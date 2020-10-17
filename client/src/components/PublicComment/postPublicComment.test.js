import { postPublicComment } from "./postPublicComment";
import nock from "nock";
describe("postPublicComment", () => {
  const publicCommentToSave = {
    name: "some name",
    comment: "some comment",
    email: "some email"
  };

  it("should post/save public comment", async () => {
    const expectedReqBody = JSON.stringify(publicCommentToSave);
    const publicCommentPostedScope = nock("http://localhost", {
      reqheaders: {
        "Content-Type": "application/json"
      }
    })
      .post("/api/publiccoment", expectedReqBody)
      .reply(201);

    expect.assertions(2);
    await expect(postPublicComment(publicCommentToSave)).not.toReject();
    expect(publicCommentPostedScope.isDone()).toEqual(true);
  });

  it("rejects when response is not 201", async () => {
    expect.assertions(1);

    nock("http://localhost").post("/api/downtime").reply(500);

    await expect(postPublicComment(publicCommentToSave)).rejects.toThrowError(
      /failed/i
    );
  });
});
