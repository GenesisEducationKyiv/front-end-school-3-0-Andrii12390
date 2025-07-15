## Dependency Security Audit

This document provides a detailed analysis of all dependencies used in the track management application. Each package has been checked for known vulnerabilities (CVE), zero‑day vulnerabilities, development activity, and popularity based on weekly npm downloads.

---

### Date

**2025-06-14**

---

### `yarn audit` Results

```bash
$ yarn audit
yarn audit v1.22.22
5 vulnerabilities found - Packages audited: 475
Severity: 5 Low
Done in 1.48s.
```

The initial `yarn audit` output reported 5 low-severity vulnerabilities related to the `brace-expansion` package, which is a dependency of `typescript-eslint` and `eslint`. To resolve these, the following command was executed:

```bash
yarn upgrade typescript-eslint eslint
```

After upgrading, the audit was run again:

```bash
$ yarn audit
yarn audit v1.22.22
0 vulnerabilities found - Packages audited: 478
Done in 0.69s.
```

> **Conclusion:** The initial audit found 5 minor vulnerabilities, which were resolved by upgrading `typescript-eslint` and `eslint`.

---

### `snyk test` Results

To further validate the security of the dependencies, a scan was performed using [Snyk](https://snyk.io).

```bash
$ snyk test
✔ Tested 150 dependencies for known issues, no vulnerable paths found.
```

> **Conclusion:** The Snyk scan didn't detect any known vulnerabilities in the project dependencies. 

### Dependency Analysis

| Package                    | Version   | Maintainer                | Last Commit   | Weekly Downloads     | Known CVE (any version)  |
| -------------------------- | --------- | ------------------------- | ------------- | -------------------- | ------------------------ |
| @hookform/resolvers        | ^5.0.1    | react-hook-form authors   | 2024-12-01    | 8,222,628            | -                        |
| @mobily/ts-belt            | ^3.13.1   | Mobily Team               | 2025-05-10    | 128,566              | -                        |
| @radix-ui/react-* (6 pkgs) | ^1–2.x    | Radix UI Team             | 2025-05-05    | ~63,000,000 total    | -                        |
| @reduxjs/toolkit           | ^2.7.0    | Redux Maintainers         | 2025-06-01    | 4,692,904            | -                        |
| @tailwindcss/vite          | ^4.1.4    | Tailwind Labs             | 2024-11-10    | 2,009,092            | -                        |
| axios                      | ^1.8.4    | axios contributors        | 2025-05-15    | 62,959,638           | +                        |
| class-variance-authority   | ^0.7.1    | Class Variance Authority  | 2023-11-01    | 7,334,006            | -                        |
| clsx                       | ^2.1.1    | JJV                       | 2025-04-02    | 1,500,000            | -                        |
| lucide-react               | ^0.501.0  | Lucide Team               | 2025-05-20    | 7,997,168            | -                        |
| next-themes                | ^0.4.6    | Jonathan Rauch            | 2025-02-14    | 4,953,410            | -                        |
| react                      | ^19.0.0   | Meta                      | 2025-05-30    | 39,642,756           | -                        |
| react-dom                  | ^19.0.0   | Meta                      | 2025-05-30    | 37,385,603           | -                        |
| react-hook-form            | ^7.56.0   | react-hook-form authors   | 2025-06-05    | 11,552,147           | -                        |
| react-redux                | ^9.2.0    | Redux Maintainers         | 2025-06-03    | 9,390,831            | -                        |
| react-router-dom           | ^7.5.1    | Remix / React Router Team | 2025-05-25    | 15,019,059           | +                        |
| sonner                     | ^2.0.3    | toast-ui authors          | 2024-02-10    | 4,944,742            | -                        |
| tailwind-merge             | ^3.2.0    | Tailwind Labs             | 2025-03-30    | 10,159,013           | -                        |
| tailwindcss                | ^4.1.4    | Tailwind Labs             | 2025-05-12    | 20,317,695           | -                        |
| tailwindcss-animated       | ^2.0.0    | Anonymous (minimal info)  | 2022-09-15    | 43,346               | -                        |
| zod                        | ^3.24.3   | Colin McDonnell           | 2025-06-07    | 31,461,473           | -                        |

---

"+": CVEs were found for this package in any version (not necessarily the current one)  
"-": No known CVEs found for this package

> **Summary:** The fact that packages like axios and react-router-dom have had known CVEs in the past suggests that they may have potential zero-day vulnerabilities. `tailwindcss-animated` is the least popular package.

---

### DevDependencies Analysis

| Package                           | Version      | Maintainer           | Last Commit   | Weekly Downloads     | Known CVE (any version)  |
| --------------------------------- | -----------  | -------------------- | ------------- | -------------------- | ------------------------ |
| @eslint/js                        | ^9.22.0      | ESLint Team          | 2025-05-30    | 43,519,292           | -                        |
| @types/node                       | ^22.14.1     | DefinitelyTyped      | 2025-05-20    | 150,177,768          | -                        |
| @types/react, @types/react-dom    | ^19.x        | DefinitelyTyped      | 2025-05-22    | 39,376,534           | -                        |
| @vitejs/plugin-react              | ^4.3.4       | Vite Team            | 2025-04-25    | 9,274,143            | -                        |
| eslint, eslint-plugin-* (3 pkgs)  | ^9–7.x       | ESLint Team          | 2025-06-01    | 70,000,000           | -                        |
| globals                           | ^16.0.0      | Bohemian Coding      | 2025-01-10    | 137,479,683          | -                        |
| typescript                        | ^5.7.x       | Microsoft            | 2025-06-10    | 84,641,116           | -                        |
| typescript-eslint                 | ^8.26.1      | TS-ESLint            | 2025-06-10    | 11,646,234           | -                        |
| vite                              | ^6.3.1       | Vite Team            | 2025-05-15    | 28,018,295           | +                        |

---

> **Summary:** a history of CVEs in `vite` may indicate a non-zero risk of potential zero-day vulnurabilities
### Package Replacement Recommendation

Most packages are popular and have a stable development history. However, `tailwindcss-animated` is significantly less popular compared to others. While popularity is not the only metric, it is recommended to consider a more widely used alternative, such as `tw-animate-css`.

**Recommended replacement:** `tailwindcss-animated` with `tw-animate-css`

```bash
yarn remove tailwindcss-animated
yarn add tw-animate-css
```

* **Advantages of `tw-animate-css`:**
  - 1,143,299 weekly downloads
  - Active maintenance
  - Few open issues

* **Example usage:**

  ```css
  /* main css file => index.css */
  @import 'tw-animate-css';
  ```

  ```diff
  - <div className="fadeIn">…</div>
  + <div className="animate-in fade-in">…</div>
  ```

---

### Summary

* **Yarn Audit:** no known vulnerabilities found;
* **CVEs detected:** `axios`, `react-router-dom`, `vite`;
* **Zero‑day vulnerabilities:** not detected;
* **Least popular package:** `tailwindcss-animated`;
* **Recommendation:** replace `tailwindcss-animated` with `tw-animate-css`.