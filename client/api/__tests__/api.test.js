import api from '../api';

// build a mock promise request
const mockPromise = jest.fn().mockImplementation(() => Promise.resolve({ data: 'MOCK DATA' }));

describe('client/api/index', () => {
  beforeEach(() => {
    api.execute = mockPromise;

    // clear the calls[][] history
    api.execute.mockClear();
  });

  it('should make correct GET request when `search` is called', async () => {
    await api.search('sauce', 3, 33);
    await expect(api.execute).toHaveBeenCalledWith('get', '/search?keyword=sauce&pageSize=33&pageIndex=3');
  });

  it('should make correct GET request when `get` is called', async () => {
    await api.get('123');
    expect(api.execute).toHaveBeenCalledWith('get', '/get?id=123');
  });

  it('should make correct POST request when `checkout` is called', async () => {
    await api.checkout([{
      product: 'product 1',
      id: '1',
      price: '£1.01'
    }, {
      product: 'product 2',
      id: '2',
      price: '£1.02'
      }]);
    
    expect(api.execute).toHaveBeenCalledWith('post',
      '/checkout', [{
      product: 'product 1',
      id: '1',
      price: '£1.01'
    }, {
      product: 'product 2',
      id: '2',
      price: '£1.02'
    }]);
  });
});
