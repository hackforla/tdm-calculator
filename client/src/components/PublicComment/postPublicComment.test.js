import { postPublicComment } from "./postPublicComment";
import nock from "nock";
import axios from 'axios'


const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = require('axios/lib/adapters/http')
// eslint-disable-next-line jest/no-disabled-tests
describe("postPublicComment", () => {
  const publicCommentToSave = {
    name: "some name",
    comment: "some comment",
    email: "some email",
    forwardToWebTeam: true
  };

  it('test', async ()  => {
    const expectedReqBody = JSON.stringify(publicCommentToSave);

        const publicCommentPostedScope = nock(host, {
      reqheaders: {
        "Content-Type": "application/json"
      }
    })
      .post("/api/public-comment", publicCommentToSave)
      .reply(201);

    // const publicCommentPostedScope = nock(host)
    //   .post('/api/public-comment', expectedReqBody)
    //   .reply(201);

    //This works
    // const response = await axios.post('/api/public-comment', expectedReqBody)  
    // expect(response).not.toReject();




  // const response = await axios.post("/api/public-comment", {
  //   name: "some name",
  //   comment: "some comment",
  //   email: "some email",
  //   forwardToWebTeam: true
  // });


    const response = await postPublicComment(publicCommentToSave).then(r => {
      console.log("INSIDE", r)
      return r}
      )
    
    // const response = await postPublicComment(expectedReqBody)
    console.log("SECOND RESPONSE", response)


    // axios.post('http://localhost/api/public-comment', function(err, body) {
    //   console.log("ERROR", err, body); 
    // });

    // expect(response).not.toReject();
    expect(postPublicComment(publicCommentToSave)).not.toReject();

    expect(publicCommentPostedScope.isDone()).toEqual(true);

  });

  it.skip("should post/save public comment", async () => {
    const expectedReqBody = JSON.stringify(publicCommentToSave);
    const publicCommentPostedScope = nock(host, {
      reqheaders: {
        "Content-Type": "application/json"
      }
    })
      .post("/api/public-comment", expectedReqBody)
      .reply(201);

    // await axios.post('/api/public-comment')  

    // console.log('scope', publicCommentPostedScope)
    // expect.assertions(2);
    // await expect(postPublicComment).toBeCalledWith(publicCommentToSave);
    // await expect(postPublicComment).toBeCalledWith(publicCommentToSave);
    // console.log("postedScope", publicCommentPostedScope)
    await expect(postPublicComment(publicCommentToSave)).not.toReject();
    await expect(publicCommentPostedScope.isDone()).toEqual(true);
  });

  it.skip("rejects when response is not 201", async () => {
    expect.assertions(1);

    nock("http://localhost").post("/api/downtime").reply(500);

    await expect(postPublicComment(publicCommentToSave)).rejects.toThrowError(
      /failed/i
    );
  });
});
