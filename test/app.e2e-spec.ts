import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  // beforeAll 해줘야 애플리케이션이 테스트마다 재생성되지 않음
  // 즉 db 정보 유지될 수 있음
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // test 환경에서도 실제 환경에서 사용하는 pipe 설정 등을 해줘야 한다.
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect("Welcome to my API");
  });

  describe("/movies", () => {
    it("GET", () => {
      return request(app.getHttpServer()).get("/movies").expect(200).expect([]);
    });
    // create
    it("POST 201", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: "Test",
          year: 2000,
          genres: ["test"],
        })
        .expect(201);
    });

    it("POST 400", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: "Test",
          year: 2000,
          genres: ["test"],
          other: "thing",
        })
        .expect(400);
    });

    // deleteOne
    it("DELETE", () => {
      return request(app.getHttpServer()).delete("/movies").expect(404);
    });
  });

  describe("/movies/:id", () => {
    // getOne
    it("GET 200", () => {
      return request(app.getHttpServer()).get("/movies/1").expect(200);
    });
    it("GET 404", () => {
      return request(app.getHttpServer()).get("/movies/999").expect(404);
    });
    it("PATCH 200", () => {
      return request(app.getHttpServer())
        .patch("/movies/1")
        .send({ title: "Updated Test" })
        .expect(200);
    });
    it("DELETE 200", () => {
      return request(app.getHttpServer()).delete("/movies/1").expect(200);
    });
  });
});
