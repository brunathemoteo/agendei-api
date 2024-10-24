// __tests__/doctorController.test.js
import { listDoctors, createDoctor } from '../src/controllers/doctorController.js';
import * as serviceDoctor from '../src/services/serviceDoctor.js'; // Mock the service
import { jest } from '@jest/globals';

describe('Doctor Controller', () => {

  // Mock res object with methods: status() and json()
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  describe('listDoctors', () => {
    test('Deve retornar 200 com uma lista de médicos', async () => {
      const req = { query: { name: 'John' } };
      const res = mockRes();

      // Mock service response
      jest.spyOn(serviceDoctor, 'listDoctors').mockResolvedValue([{ name: 'John Doe', specialty: 'Cardiology' }]);

      await listDoctors(req, res);

      expect(serviceDoctor.listDoctors).toHaveBeenCalledWith('John');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ name: 'John Doe', specialty: 'Cardiology' }]);
    });
  });

  describe('createDoctor', () => {
    test('Deve retornar 400 quando campos estão faltando', async () => {
      const req = { body: { name: '', specialty: 'Cardiology', icon: 'icon_url' } };
      const res = mockRes();

      await createDoctor(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required.' });
    });

    test('Deve retornar 201 ao criar um médico com sucesso', async () => {
      const req = { body: { name: 'John Doe', specialty: 'Cardiology', icon: 'icon_url' } };
      const res = mockRes();

      // Mock service response
      jest.spyOn(serviceDoctor, 'createDoctor').mockResolvedValue({ id: 1, name: 'John Doe', specialty: 'Cardiology', icon: 'icon_url' });

      await createDoctor(req, res);

      expect(serviceDoctor.createDoctor).toHaveBeenCalledWith('John Doe', 'Cardiology', 'icon_url');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'John Doe', specialty: 'Cardiology', icon: 'icon_url' });
    });

    test('Deve retornar 500 quando ocorre um erro ao criar o médico', async () => {
      const req = { body: { name: 'John Doe', specialty: 'Cardiology', icon: 'icon_url' } };
      const res = mockRes();

      // Mock service throwing error
      jest.spyOn(serviceDoctor, 'createDoctor').mockRejectedValue(new Error('Error creating doctor'));

      await createDoctor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'An error occurred while creating the doctor.' });
    });
  });
});
