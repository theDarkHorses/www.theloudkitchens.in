export default function doSomethingAsync() {
  return new Promise((resolve) => setTimeout(resolve, 500000));
}
