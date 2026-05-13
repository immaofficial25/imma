# Bugfix Requirements Document

## Introduction

This document covers 14 confirmed bugs, security vulnerabilities, logic issues, and UX problems found across the Next.js course-selling platform (IMMA Courses). The issues span payment security, purchase flow correctness, admin functionality, code duplication, startup reliability, and broken navigation. Fixing these issues will harden the platform against timing attacks, eliminate dead code paths, improve payment UX, restore admin operational capabilities, and prevent broken links from degrading user trust.

---

## Bug Analysis

### Current Behavior (Defect)

**Bug 1 — Razorpay signature timing attack vulnerability**

1.1 WHEN a Razorpay payment verification request is received THEN the system compares the HMAC signature using `!==` (regular string equality), which is vulnerable to timing attacks that can leak whether the signature is partially correct

**Bug 2 — `hasPurchased` prop is always `false` on `CoursePageClient`**

1.2 WHEN an authenticated user who has purchased a course visits the course page THEN the system redirects them before `CoursePageClient` renders, making the `hasPurchased={true}` prop, the "Purchased" badge, and the "Access Course" button unreachable dead code

**Bug 3 — "Buy Now" button is active during session loading state**

1.3 WHEN the session `status` is `"loading"` and the user clicks "Buy Now" THEN the system calls `getSession()` asynchronously and may trigger `signIn()` before the session state is known, producing a fragile and unpredictable UX

**Bug 4 — Post-payment reload causes a visible flash before redirect**

1.4 WHEN a user completes payment and the page reloads via `window.location.reload()` THEN the system briefly renders the purchase page again before the server-side redirect to `/courses/${id}/content` fires, causing a jarring visual flash

**Bug 5 — `isPaying` spinner disappears immediately after Razorpay modal opens**

1.5 WHEN the user submits the payment form and the Razorpay modal opens THEN the system sets `isPaying` back to `false` in the `finally` block immediately after the non-blocking `paymentObject.open()` call, re-enabling the "Continue to Pay" button while the modal is still open

**Bug 6 — Admin page fetches full `passwordHash` values unnecessarily**

1.6 WHEN the admin page loads the marketer list THEN the system fetches the full `passwordHash` field from the database using `.select("+passwordHash")` even though only its presence (set / not set) is needed for display

**Bug 7 — Admin cannot manually mark a payment as `"completed"`**

1.7 WHEN an admin submits a payment status update with `status = "completed"` THEN the system rejects it with a 400 "Invalid status" error, preventing admins from manually completing payments for offline/cash transactions or failed webhooks

**Bug 8 — `getAdminEmails` and `isAdminEmail` are duplicated across two files**

1.8 WHEN the admin email list logic needs to change THEN the system requires the same update to be made in both `lib/auth.js` and `lib/admin.js` because the functions are duplicated, creating a maintenance hazard and risk of divergence

**Bug 9 — `mongodb.js` throws at module load time if `MONGO_URI` is missing**

1.9 WHEN `MONGO_URI` is not set in the environment THEN the system throws an error at module import time (not at connection time), which can crash the entire Next.js build or dev server with a confusing startup error before any request is made

**Bug 10 — Footer links point to non-existent pages**

1.10 WHEN a user clicks any of the footer links for `/about`, `/contact`, `/help`, `/faq`, `/privacy`, or `/terms` THEN the system returns a 404 Not Found response because none of those pages exist in the application

**Bug 11 — `ContinueWithGoogleButton` always redirects to `/` after sign-in**

1.11 WHEN a user clicks "Continue with Google" from any page other than the home page THEN the system redirects them to `/` after sign-in instead of back to the page they were on, losing their navigation context

**Bug 12 — `normalizeInrPrice` numeric branch is dead code for all real data**

1.12 WHEN `normalizeInrPrice` is called with a value like `"INR 499"` (the format used in `courses.json`) THEN the system falls through the numeric branch because `String(numeric) === trimmed` fails for strings containing non-numeric characters, making the numeric formatting branch unreachable for all real course price data

**Bug 13 — `timingSafeEqualStrings` leaks length information for unequal-length inputs**

1.13 WHEN `timingSafeEqualStrings` is called with two strings of different lengths THEN the system returns `false` immediately without performing a constant-time comparison, leaking timing information about the expected string length

**Bug 14 — NextAuth route handler export structure**

1.14 WHEN the NextAuth route at `app/api/auth/[...nextauth]/route.js` is evaluated THEN the system may not correctly export both `GET` and `POST` handlers as required by the Next.js App Router convention, potentially breaking OAuth sign-in and sign-out flows

---

### Expected Behavior (Correct)

**Bug 1 — Razorpay signature timing attack vulnerability**

2.1 WHEN a Razorpay payment verification request is received THEN the system SHALL compare the HMAC signature using `crypto.timingSafeEqual()` to prevent timing-based side-channel attacks

**Bug 2 — `hasPurchased` prop is always `false` on `CoursePageClient`**

2.2 WHEN the `hasPurchased` prop is passed to `CoursePageClient` THEN the system SHALL either remove the prop (since the redirect makes it unreachable) or restructure the logic so the "Purchased" UI and "Access Course" button are actually reachable by authenticated purchasers

**Bug 3 — "Buy Now" button is active during session loading state**

2.3 WHEN the session `status` is `"loading"` THEN the system SHALL disable the "Buy Now" button or show a loading indicator so the user cannot trigger payment flow before the session state is resolved

**Bug 4 — Post-payment reload causes a visible flash before redirect**

2.4 WHEN payment verification succeeds THEN the system SHALL navigate directly to `/courses/${id}/content` using `window.location.href` instead of reloading the current page, eliminating the flash

**Bug 5 — `isPaying` spinner disappears immediately after Razorpay modal opens**

2.5 WHEN the Razorpay modal is open THEN the system SHALL keep `isPaying` set to `true` (and the button disabled) until the payment handler callback fires (either success or failure), so the user cannot submit the form again while the modal is active

**Bug 6 — Admin page fetches full `passwordHash` values unnecessarily**

2.6 WHEN the admin page loads the marketer list THEN the system SHALL determine password presence without fetching the actual hash value, for example by using a projection that returns only a boolean or existence indicator

**Bug 7 — Admin cannot manually mark a payment as `"completed"`**

2.7 WHEN an admin submits a payment status update with `status = "completed"` THEN the system SHALL accept the value and update the payment record accordingly, enabling admins to manually complete payments for offline transactions or webhook failures

**Bug 8 — `getAdminEmails` and `isAdminEmail` are duplicated across two files**

2.8 WHEN admin email checking is needed in `lib/auth.js` THEN the system SHALL import `isAdminEmail` from `lib/admin.js` instead of maintaining a duplicate implementation, so there is a single source of truth

**Bug 9 — `mongodb.js` throws at module load time if `MONGO_URI` is missing**

2.9 WHEN `MONGO_URI` is not set in the environment THEN the system SHALL throw the error inside the `connectDB()` function (at connection time) rather than at module import time, so the error only surfaces when a database connection is actually attempted

**Bug 10 — Footer links point to non-existent pages**

2.10 WHEN a user clicks a footer link THEN the system SHALL either serve a valid page at that route or remove/disable the link so users are never sent to a 404

**Bug 11 — `ContinueWithGoogleButton` always redirects to `/` after sign-in**

2.11 WHEN a user clicks "Continue with Google" THEN the system SHALL use `window.location.href` as the `callbackUrl` so the user is returned to the page they were on after completing Google sign-in

**Bug 12 — `normalizeInrPrice` numeric branch is dead code for all real data**

2.12 WHEN `normalizeInrPrice` is called with any price string THEN the system SHALL produce a correct, predictable output with clear and reachable code paths, with no branch that is unreachable for real input data

**Bug 13 — `timingSafeEqualStrings` leaks length information for unequal-length inputs**

2.13 WHEN `timingSafeEqualStrings` is called with two strings of different lengths THEN the system SHALL perform the comparison in a way that does not leak timing information about the expected length, for example by padding or hashing both inputs to a fixed length before comparing

**Bug 14 — NextAuth route handler export structure**

2.14 WHEN the NextAuth route at `app/api/auth/[...nextauth]/route.js` is evaluated THEN the system SHALL export both `GET` and `POST` named exports from the handler as required by the Next.js App Router convention

---

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a valid Razorpay payment signature is submitted THEN the system SHALL CONTINUE TO accept it and mark the payment as completed

3.2 WHEN an unauthenticated user visits a course page THEN the system SHALL CONTINUE TO render the course details and "Buy Now" button without redirecting

3.3 WHEN an authenticated user who has NOT purchased a course visits the course page THEN the system SHALL CONTINUE TO render the course details and "Buy Now" button

3.4 WHEN an authenticated user clicks "Buy Now" and the session is confirmed THEN the system SHALL CONTINUE TO open the payment registration flow modal

3.5 WHEN a user successfully completes payment THEN the system SHALL CONTINUE TO have their payment recorded as `"completed"` in the database

3.6 WHEN the admin page loads THEN the system SHALL CONTINUE TO display the correct "set" / "not set" password status for each marketer

3.7 WHEN an admin marks a payment as `"pending"` or `"failed"` THEN the system SHALL CONTINUE TO update the payment status correctly and redirect back to the admin page

3.8 WHEN `isAdminEmail` is called with a valid admin email THEN the system SHALL CONTINUE TO return `true` in both the auth callback and admin session contexts

3.9 WHEN `MONGO_URI` is correctly set and `connectDB()` is called THEN the system SHALL CONTINUE TO establish and cache the database connection as before

3.10 WHEN a user clicks the "Home" or "Courses" footer links THEN the system SHALL CONTINUE TO navigate to the correct existing pages

3.11 WHEN a user is already signed in and clicks "Continue with Google" THEN the system SHALL CONTINUE TO handle the interaction correctly without triggering an unnecessary re-authentication

3.12 WHEN `normalizeInrPrice` is called with a plain numeric value (e.g., `499`) THEN the system SHALL CONTINUE TO return `"INR 499"`

3.13 WHEN `timingSafeEqualStrings` is called with two equal-length matching strings THEN the system SHALL CONTINUE TO return `true`

3.14 WHEN a user signs in via Google OAuth THEN the system SHALL CONTINUE TO be redirected correctly and have their session established

---

## Bug Condition Pseudocode

### Bug 1 — Timing-Safe Signature Comparison

```pascal
FUNCTION isBugCondition_1(request)
  INPUT: request with razorpay_signature field
  OUTPUT: boolean
  RETURN signature comparison uses string equality operator
END FUNCTION

// Fix Checking
FOR ALL requests WHERE isBugCondition_1(request) DO
  result ← verifySignature'(request)
  ASSERT uses crypto.timingSafeEqual() for comparison
END FOR

// Preservation Checking
FOR ALL valid_requests WHERE NOT isBugCondition_1(valid_requests) DO
  ASSERT verifySignature(valid_requests) = verifySignature'(valid_requests)
END FOR
```

### Bug 2 — Dead `hasPurchased` Prop

```pascal
FUNCTION isBugCondition_2(user, courseId)
  INPUT: user session, courseId
  OUTPUT: boolean
  RETURN hasCompletedCoursePayment(user.id, courseId) = true
END FUNCTION

// Fix Checking
FOR ALL users WHERE isBugCondition_2(user, courseId) DO
  result ← renderCoursePage'(user, courseId)
  ASSERT user sees "Purchased" UI OR is redirected to content (not both dead)
END FOR
```

### Bug 5 — `isPaying` State Race Condition

```pascal
FUNCTION isBugCondition_5(paymentFlow)
  INPUT: payment flow execution
  OUTPUT: boolean
  RETURN razorpayModal.isOpen = true AND isPaying = false
END FUNCTION

// Fix Checking
FOR ALL paymentFlows WHERE isBugCondition_5(paymentFlow) DO
  ASSERT isPaying = true WHILE modal is open
  ASSERT button is disabled WHILE modal is open
END FOR
```

### Bug 9 — Module-Load-Time Throw

```pascal
FUNCTION isBugCondition_9(env)
  INPUT: environment variables
  OUTPUT: boolean
  RETURN env.MONGO_URI = undefined OR env.MONGO_URI = null
END FUNCTION

// Fix Checking
FOR ALL envs WHERE isBugCondition_9(env) DO
  result ← importModule'("lib/mongodb")
  ASSERT no error thrown at import time
  result2 ← connectDB'()
  ASSERT error thrown at connection time
END FOR

// Preservation Checking
FOR ALL envs WHERE NOT isBugCondition_9(env) DO
  ASSERT connectDB(env) = connectDB'(env)
END FOR
```
