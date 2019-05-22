import { TestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { FilmsService } from "./films.service";
import { ExternalService } from "./external.service";
import { of } from "rxjs";

class FakeHttpClient {
  get() {}
  post() {}
  delete() {}
  put() {}
}

class FakeExternalService {}

describe("FilmsService", () => {
  let service: FilmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FilmsService,
        ExternalService,
        { provide: HttpClient, useClass: FakeHttpClient }
      ]
    });
    service = TestBed.get(FilmsService);
  });

  beforeEach(() => {
    spyOn(TestBed.get(HttpClient), "get").and.returnValue(of({}));
    spyOn(TestBed.get(HttpClient), "post").and.returnValue(of({}));
    spyOn(TestBed.get(HttpClient), "delete").and.returnValue(of({}));
    spyOn(TestBed.get(HttpClient), "put").and.returnValue(of({}));
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("getAll should return value", () => {
    expect(service.getAll({})).toBeTruthy();
  });

  it("get should return value", () => {
    expect(service.get("1")).toBeTruthy();
  });

  it("createFilm should return value", () => {
    expect(service.createFilm({} as any)).toBeTruthy();
  });

  it("updateFilm should return value", () => {
    expect(service.updateFilm({} as any)).toBeTruthy();
  });

  it("getAll should return value", () => {
    expect(service.getAll({})).toBeTruthy();
  });

  it("getGenres should return value", () => {
    expect(service.getGenres()).toBeTruthy();
  });

  it("createComment should return value", () => {
    expect(service.createComment({} as any)).toBeTruthy();
  });

  it("getComments should return value", () => {
    expect(service.getComments({} as any)).toBeTruthy();
  });

  it("delete should return value", () => {
    expect(service.delete({} as any)).toBeTruthy();
  });

  it("like should return value", () => {
    expect(service.like({} as any)).toBeTruthy();
  });

  it("getLike should return value", () => {
    expect(service.getLike()).toBeTruthy();
  });
});
