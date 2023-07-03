const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    // testeo ruta get/cafes
    it("Ruta GET obteniendo cafes", async() => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        const cafes = response.body;
        const total = cafes.length;
        expect(status).toBe(200);
        expect(cafes).toBeInstanceOf(Array);
        expect(total).toBeGreaterThanOrEqual(1);
    });


// Codigo 404 al intentar elminar un cafe con id que no existe
     it("Eliminar un cafe por ID ", async() => {
        const jwt = "token";
        const idEliminar="id";
        const response = await request(server)
        .delete(`/cafes/${idEliminar}`)
        .set("Authorization",jwt)
        .send();
        expect(response.statusCode).toBe(404);
    });

 //   Agrear cafe y enviar un codigo 201
 it("Post Agregar un Cafe ", async() => {
    const cafe = { id: 5, nombre: "nuevo cafe"};
    const response = await request(server)
    .post("/cafes")
    .send(cafe);
    const status = response.statusCode;
    const cafes = response.body
    expect(status).toBe(201);
    expect(cafes).toContainEqual(cafe);
});

//  Actualizar un Cafe por un ID
it("PUT  Actulizar un Cafe ", async() => {
    const cafe = { id: "ID", nombre: "nuevo cafe"};
    const id  = "El ID no exite";
    const response = await request(server)
    .put(`/cafes/${id}`)
    .send(cafe);
    const status = response.statusCode;
    expect(status).toBe(400);
    });
}); 


