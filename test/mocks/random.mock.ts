const mathCopy = Object.create(global.Math);

function randomMock(value: number | number[]): () => number {
  const values = Array.isArray(value) ? value : [value];
  let index = 0;

  return (): number => {
    if (index >= values.length) {
      index = 0;
    }
    return values[index++] ?? 0;
  };
}

export function resetMockRandom(): void {
  global.Math = mathCopy;
}

export function mockRandom(value: number | number[]): void {
  const mockMath = Object.create(global.Math);
  mockMath.random = randomMock(value);
  global.Math = mockMath;
}

export function mockRandomForEach(value: number | number[]): void {
  beforeEach(() => {
    mockRandom(value);
  });

  afterEach(() => {
    resetMockRandom();
  });
}
