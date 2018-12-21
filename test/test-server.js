const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require("../server");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Blog Posts", function() {
    before(function(){
        return runServer();
    });
    after(function(){
        return closeServer();
    });

    it("Should list blog posts on GET", function() {
        return chai
            .request(app)
            .get("/blog-posts")
            .then(function(res){
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an("array");
                expect(res.body.length).to.be.at.least(1);
                const expectedKeys = ["id", "title", "content", "author"];
                res.body.forEach(function(item){
                    expect(item).to.be.an("object");
                    expect(item).to.include.keys(expectedKeys);
                });
            });
        });

    it("Should add a blog post on POST", function(){
        const newPost = { title: "Test Title", content: "Test Content", author: "Test Author", publishDate: Date.now()};
        return chai
            .request(app)
            .post("/blog-posts")
            .send(newPost)
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an("object");
                expect(res.body).to.include.keys("id", "title", "content", "author", "publishDate");
                expect(res.body.id).to.not.equal(null);
                expect(res.body).to.deep.equal(
                    Object.assign(newPost, { id: res.body.id })
                );
            });
    });
    
    it("Should update blog posts on PUT", function(){
        const updateData = {
            title: "Foo Test Title",
            content: "Bar Test Content",
            author: "Test Author",
            publishDate: Date.now()
        };

        return (
            chai
                .request(app)
                .get("/blog-posts")
                .then(function(res) {
                    updateData.id = res.body[0].id;
                    return chai
                        .request(app)
                        .put(`/blog-posts/${updateData.id}`)
                        .send(updateData);
                })
                .then(function(res) {
                    expect(res).to.have.status(204);
                })
        );
    });

    it("Should delete blog posts on DELETE", function() {
        return (
            chai
                .request(app)
                .get("/blog-posts")
                .then(function(res){
                    return chai.request(app).delete(`/blog-posts/${res.body[0].id}`);
                })
                .then(function(res) {
                    expect(res).to.have.status(204);
                })
        );
    });
});
