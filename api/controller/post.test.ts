import * as request from "supertest";
import server from "..";

describe("GET /post", () => {
  afterAll(() => server.close());

  it("should create post", (done) => {
    request(server).post("/post/create")
        .send({
          title: "Post Title",
          body: "Lorem ipsum style dummy text",
        })
        .set('Accept', 'application/json')
        .end((err, res: request.Response) => {
            expect(err).toBeFalsy();
            expect(res.body).toEqual({
              _id: expect.anything(),
              __v: expect.anything(),
              date: expect.anything(),
              title: "Post Title",
              body: "Lorem ipsum style dummy text",
              hidden: false,
              likes: 0,
            });
            done();
        })
        .expect(200);
  });

  it("should list post", (done) => {
    request(server).post("/post/create")
        .send({
          title: "Post Title",
          body: "Lorem ipsum style dummy text",
        })
        .set('Accept', 'application/json')
        .end((err) => {
          expect(err).toBeFalsy();
          done();
        });

    return request(server).get("/post/list")
      .set('Accept', 'application/json')
      .expect(200);
  });

  it("should update post", (done) => {
    let id = '';

    request(server).post("/post/create")
        .send({
          title: "Post Title",
          body: "Lorem ipsum style dummy text",
        })
        .set('Accept', 'application/json')
        .end((err, res: request.Response) => {
          expect(err).toBeFalsy();
          ({ id } = res.body);
          done();
        });

    return request(server).delete("/post/update")
      .send({ id })
      .set('Accept', 'application/json')
      .expect(200);
  });

  it("should delete post", (done) => {
    let id = '';

    request(server).post("/post/create")
        .send({
          title: "Post Title",
          body: "Lorem ipsum style dummy text",
        })
        .set('Accept', 'application/json')
        .end((err, res: request.Response) => {
          expect(err).toBeFalsy();
          ({ id } = res.body);
          done();
        });

    return request(server).delete("/post/delete")
      .send({ id })
      .expect(200);
  });
});
