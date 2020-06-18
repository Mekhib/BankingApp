export let obj = {
  success: false,
};
export function updateObj() {
  console.log("export running");
  obj.success = true;
  console.log("done!", obj.success);
  return true;
}
