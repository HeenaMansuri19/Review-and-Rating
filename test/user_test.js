let server = require("../index");
let chaiHttp = require("chai-http");
var chai = require("chai");
const utils = require("../models/userModelSchema");
let routes = require("../routes/userRouters");

chai.should();
chai.use(chaiHttp);

describe("User Login API", () => {
    describe("POST/api/users", () => {
        it("IT should Return login user details:", (done) => {
            const data = {
                userEmail: "cs20.heenamansuri@svceindore.ac.in",
                password: "AAbc@123",
            };
            chai
                .request(server)
                .post("/user/userSignIn")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("success");
                    res.body.should.have.property("message").eq(" User has login successfully ");
                    res.body.should.have.property("token");
                    done();
                })
        })

        it("It should Return Error Message :", (done) => {
            const data = {
                userEmail: "cs20zz.heenamansuri@svceindore.ac.in",
                password: "AAbc@123",
            };
            chai
                .request(server)
                .post("/user/userSignIn")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("failure");
                    res.body.should.have
                        .property("message")
                        .eq("You are not a register user")
                    done();
                });
        })

        it("It should Return Email or password Error Message:", (done)=>{
            const data ={
                userEmail: "cs9020.heenamansuri@svceindore.ac.in",
                password: "AAbc@123000",
            };
            chai
            .request(server)
            .post("/user/userSignIn")
            .send(data)
            .end((err,res)=>{
                res.should.have.status(401);
                res.body.should.have.property("success").eq("failure");
                res.body.should.have.property("message").eq("You are not a register user");
                done();
            })
        })

    })
})


describe("User sendEmail API", () => {
    describe("POST/api/users", () => {
        it("IT should Return login user details:", (done) => {
            const data = {
                userEmail: "cs20.heenamansuri@svceindore.ac.in",
            };
            chai
                .request(server)
                .post("/user/resetPassEmail")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("success");
                    res.body.should.have.property("message").eq("Email sent Succcesfully");
                    res.body.should.have.property("token");
                    done();
                })
        })
        it("IT should Return error in sendEmailPass details:", (done) => {
            const data = {
                userEmail: "cs20.heenamansuri@svceindore.ac.in00",
            };
            chai
                .request(server)
                .post("/user/resetPassEmail")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("failure");
                    res.body.should.have.property("message").eq("Email user is not found");
                    done();
                })
        })
    })
})


describe("User resetPassword API", () => {
    describe("POST/api/users", () => {
        it("IT should Return resetPassword details:", (done) => {
            const data = {
                "newPassword":"AAbc@123",
                "confirmPassword":"AAbc@123"
            };
            chai
                .request(server)
                .post("/user/passwordReset/64021ceed8c2198b092bad2b/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDAyMWNlZWQ4YzIxOThiMDkyYmFkMmIiLCJpYXQiOjE2Nzc4NjA1MTAsImV4cCI6MTY3Nzg2MTcxMH0.y1HblridEjyWVVmCLmNDXTWvC1FCqzoQXe1LbjGC274")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("success");
                    res.body.should.have.property("message").eq("Password update Succesfully");
                    done();
                })
        })
        it("IT should Return error in resetPassword details:", (done) => {
            const data = {
                "newPassword":"AAbnc@123",
                "confirmPassword":"44A99Abc@123"
            };
            chai
                .request(server)
                .post("/user/passwordReset/64021ceed8c2198b092bad2b/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDAyMWNlZWQ4YzIxOThiMDkyYmFkMmIiLCJpYXQiOjE2Nzc4NjA1MTAsImV4cCI6MTY3Nzg2MTcxMH0.y1HblridEjyWVVmCLmNDXTWvC1FCqzoQXe1LbjGC274")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("failure");
                    res.body.should.have.property("message").eq("Password and confirm password is not match");
                    done();
                })
        })
        it("IT should Return email is not found in resetPassword details:", (done) => {
            const data = {
                "newPassword":"AAbnc@123",
                "confirmPassword":"44A99Abc@123"
            };
            chai
                .request(server)
                .post("/user/passwordReset/64021ceed8c2198b092bad2b/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDAyMWNlZWQ4YzIxOThiMDkyYmFkMmIiLCJpYXQiOjE2Nzc4NjA1MTAsImV4cCI6MTY3Nzg2MTcxMH0.y1HblridEjyWVVmCLmNDXTWvC1FCqzoQXe1LbjGC274")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("failure");
                    res.body.should.have.property("message").eq("Email is not found");
                    done();
                })
        })
    })
})