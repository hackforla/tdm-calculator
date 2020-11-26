import 'jest-extended';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import nock from 'nock';

// nock.disableNetConnect();

afterEach(() => {
  nock.cleanAll();
  jest.resetAllMocks();
});
