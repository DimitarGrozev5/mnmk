// Function that reads a text file and returns a promise
export const readFileAsText = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const promise = new FileReader();
    promise.addEventListener("load", (event) => {
      if (!event.target) return;
      resolve(event.target.result as string);
    });
    promise.addEventListener("error", () => reject());
    promise.readAsText(file);
  });
