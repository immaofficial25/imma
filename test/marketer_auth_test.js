import { comparePlainPassword, verifyMarketerPassword } from "../lib/marketer-auth.js";

function testComparePlain() {
  const pwd = "secret123";
  const stored = "secret123";
  const result = comparePlainPassword(pwd, stored);
  console.log("comparePlainPassword matches:", result);
  console.log("comparePlainPassword mismatches:", comparePlainPassword(pwd, "different"));
}

async function testVerifyFallback() {
  const pwd = "plainPwd";
  // Simulate stored value without $ separators (plain text)
  const storedPlain = "plainPwd";
  const okPlain = await verifyMarketerPassword(pwd, storedPlain);
  console.log("verifyMarketerPassword fallback (plain) ->", okPlain);

  // Simulate a proper hash (will fail because we don't have actual hash generation here)
  const fakeHash = "pbkdf2_sha256$120000$invalidsalt$invalidhash";
  const okHash = await verifyMarketerPassword(pwd, fakeHash);
  console.log("verifyMarketerPassword with fake hash ->", okHash);
}

(async () => {
  console.log("--- Running comparePlainPassword tests ---");
  testComparePlain();
  console.log("--- Running verifyMarketerPassword fallback tests ---");
  await testVerifyFallback();
})();
