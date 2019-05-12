import {request, jsonRequest} from '../network';

describe('Network utils tests', () => {
    const createSuccessFetchMock = response => () => {
        return new Promise(resolve => {
            resolve(response);
        });
    };

    const createFailFetchMock = error => () => {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    };

    describe('Request behavior', () => {
        it('should return fulfilled promise for successful fetch', done => {
            const response = {
                ok: true
            };
            jest.spyOn(global, 'fetch').mockImplementation(createSuccessFetchMock(response));
            request('url').then(result => {
                expect(result).toEqual(response);
                done();
            });
        });

        it('should return rejected promise for unsuccessful fetch', done => {
            const error = 'error!';
            jest.spyOn(global, 'fetch').mockImplementation(createFailFetchMock(error));
            request('url').catch(err => {
                expect(err).toEqual(error);
                done();
            });
        });

        it('should return rejected promise for error status in response', done => {
            const response = {
                ok: false,
                status: 500,
                text: () => Promise.resolve('error text')
            };
            jest.spyOn(global, 'fetch').mockImplementation(createSuccessFetchMock(response));
            request('url').catch(err => {
                expect(err.info.error).toEqual('error text');
                done();
            });
        });
    });

    describe('jsonRequest behavior', () => {
        it('should return response.json() for successful request', done => {
            const response = {
                ok: true,
                json: () => Promise.resolve({response: 'text'})
            };
            jest.spyOn(global, 'fetch').mockImplementation(createSuccessFetchMock(response));
            jsonRequest('url').then(result => {
                expect(result).toEqual({response: 'text'});
                done();
            });
        });

        it('should return rejected promise for error status in response', done => {
            const response = {
                ok: false,
                status: 500,
                text: () => Promise.resolve('error text'),
                json: () => Promise.resolve({response: 'text'})
            };
            jest.spyOn(global, 'fetch').mockImplementation(createSuccessFetchMock(response));
            jsonRequest('url').catch(err => {
                expect(err.info.error).toEqual('error text');
                done();
            });
        });
    });
});
