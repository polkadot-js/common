declare module 'ethereumjs-testing' {
  type Tests = {
    [index: string]: {
      in: string,
      out: string
    }
  };

  export const getSingleFile: (name: string) => Tests;
}
