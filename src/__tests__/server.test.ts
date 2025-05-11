
import request from "supertest";
import server, {connectDB} from "../server";
import db from "../config/db";
// describe('Nuestro primer test', () => {
//     it('Debe revisar que 1 + 1 sea 2', () => {
//         expect(1+1).toBe(2)
//     })

//     it('Debe revisar que 1 + 1 no sea 3', () => {
//         expect(1+1).not.toBe(3)
//     })
// })

describe('GET /api', () => {
    it('sholud send back a json response', async () => {
        const res = await request(server).get('/api')

        expect(res.status).toBe(200) // peticion existosa
        expect(res.header['content-type']).toMatch(/json/) // respuesta sea json
        expect(res.body.msg).toBe('Desde API') // que la respuesta sea Desde API

        expect(res.status).not.toBe(404) // no debe que ser 404
         expect(res.body.msg).not.toBe('desde api') // que la respuesta no debe ser desde api
    })
})

jest.mock('../config/db')

describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, "authenticate")
            .mockRejectedValueOnce(new Error('Hubo un error al conectar la BD')) // lanza exepcion
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar la BD')
        )
    })
})