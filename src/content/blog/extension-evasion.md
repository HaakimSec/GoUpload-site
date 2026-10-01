---
title: "Extension Evasion: Why Blocking .php Isn't Enough"
date: "2026-10-01"
description: "How filename parsing, normalization, server configuration, and extension allowlists can diverge during file-upload validation."
slug: "extension-evasion-file-upload"
---
![File extension evasion](file-extention.png)

Extension validation is often the first security check added to a file-upload endpoint: reject `.php`, `.jsp`, `.asp`, and allow `.jpg`, `.png`, or `.pdf`.
The problem is that an extension is only one interpretation of a filename. The upload application, web server, filesystem, and downstream processors may each interpret that filename differently.
That gap between interpretations is where many extension-evasion bugs come from.

The core assumption behind extension filtering is simple: if the server refuses to accept files ending in `.php`, `.jsp`, `.asp`, or similar, it can't be tricked into storing and later executing attacker-controlled code. In practice, that assumption breaks down for a few different reasons — not because the idea is wrong, but because "extension" turns out to be a much blurrier concept than a single string comparison assumes.

## Blacklists vs. allowlists

The first failure mode is architectural, not technical. A lot of upload validators are built as **blacklists** — a list of extensions to reject (`.php`, `.exe`, `.sh`, etc.) — rather than **allowlists**, where only a known-safe set of extensions is permitted (`.jpg`, `.png`, `.pdf`).

Blacklists fail because they require the defender to anticipate every dangerous extension in advance, across every server technology that might ever process the file. Allowlists invert that burden: anything not explicitly permitted is rejected by default. Most of the bypass techniques below exist specifically because a blacklist didn't account for a variant its author never thought to include.

## Case variation

The simplest bypass: many filesystems and some validators treat extensions case-sensitively, but the server environment serving the file doesn't. A blacklist checking for `.php` might not catch `.PHP`, `.Php`, or `.pHp`. On a case-insensitive filesystem (common on Windows, and in some misconfigured Linux/Apache setups), the server will happily execute any of these the same way it executes `.php`.

## Alternate server-parsed extensions

This is the one blacklists miss most often. PHP, in particular, has historically supported several extensions beyond `.php` that get handed to the PHP interpreter depending on server configuration: `.php3`, `.php4`, `.php5`, `.php7`, `.phtml`, `.pht`, `.phar`. A validator that only checks for `.php` exactly will pass every one of these straight through — and whether the server actually executes them depends entirely on how `mod_php` or PHP-FPM is configured to map extensions to the interpreter. The same pattern shows up on other stacks: `.jspx`, `.jsw`, `.jsv` alongside `.jsp` on some Java servers; `.asa`, `.cer`, `.ashx` alongside `.asp`/`.aspx` on IIS under certain configurations.

The practical lesson here is that "extension" isn't a fixed, universal concept — it's whatever the specific web server and application stack in front of you has been configured to treat as executable, and that set is often larger and less documented than anyone assumes.

## Double extensions

A classic: `shell.php.jpg`. The logic some validators use is to check only the *final* extension — which here is `.jpg`, so the file passes. But depending on server configuration, Depending on the server's handler configuration, multiple extensions may be considered when determining how a file is handled. Apache's `mod_mime`, for example, can associate handlers with filename extensions and compare those extensions across filenames containing multiple extensions.

That means `shell.php.jpg` cannot be assumed to be harmless simply because `.jpg` is the final suffix. Whether it is actually executed depends on the target configuration.
The inverse also shows up: `shell.jpg.php`. If a validator naively checks whether the filename *contains* an allowed extension like `.jpg` rather than checking what it *ends with*, this slips through too.

## Trailing characters

Trailing dots, spaces, and certain control characters have historically caused differences between how an application validates a filename and how an underlying filesystem or API normalizes it.

For example, a validator might inspect a filename such as `shell.php.` as a distinct string, while a downstream component may normalize or otherwise interpret the name differently.

The important security issue is the mismatch: if validation happens before normalization, the application may make its security decision on a filename that is not equivalent to the one eventually stored or served.

## Null byte injection (mostly historical)

Null-byte truncation is another classic example of validation and downstream processing disagreeing about the same string.
Historically, C-style string handling could treat a null byte as the end of a string. This created cases where an application validated one apparent filename while a filesystem operation saw only the portion before the null byte.

For example, historical attacks used filenames conceptually similar to:

`shell.php%00.jpg`

This technique is not a reliable modern upload bypass: PHP fixed important null-byte filesystem handling issues in PHP 5.3.4, and later fixes addressed related filesystem-function behavior. :contentReference[oaicite:4]{index=4}

It remains worth understanding because it illustrates the broader class of bugs this article is concerned with: different components interpreting the same input differently.

## Why this keeps happening

Every technique above shares a common shape: the validator makes a decision based on one representation of the filename, and the server (or filesystem, or a downstream component) makes its own decision based on a *different* representation of the same input. Case folding, multiple extension parsing, trailing-character handling, and string truncation are all, at their core, the same category of bug — a disagreement between two components about what string they're actually looking at.

That's also why testing this properly means more than trying `.php` once and moving on. A thorough check needs to account for the specific server stack in front of the endpoint (what does *this* Apache/IIS/Node configuration actually treat as executable?), and test enough variations to find where the validator's assumptions and the server's actual behavior diverge.

## Defensive takeaways

- Prefer allowlists over blacklists, always.
- Don't use the user-supplied filename as the storage filename. Generate a server-side name, validate the intended file type before storage, and ensure the storage location cannot execute uploaded content.
- Don't rely on extension alone. Pair it with content-type and file-signature (magic byte) checks, and treat all three as independent signals rather than redundant checks of the same fact.
- Store uploaded files outside the webroot, or in a location explicitly configured to never execute scripts, regardless of extension. If uploaded files are stored outside the webroot, or in a location explicitly configured to never execute scripts, extension-based execution attacks become much harder to turn into code execution. — if the storage location can't execute PHP/JSP/ASP under any filename, extension bypass techniques become irrelevant.
- If your stack has non-obvious executable extensions (`.phtml`, `.jspx`, etc.), know what they are for your specific server configuration — don't assume the "obvious" extension list is complete.

Extension filtering isn't useless — it's a reasonable first layer. The mistake is treating it as sufficient on its own, rather than one signal among several that should all agree before a file is trusted.

---

## What an upload scanner should actually verify

Extension evasion is only one layer of an upload security test.

A scanner shouldn't treat an HTTP `200 OK` or an accepted upload as proof that a vulnerability exists. The important question is what happens after acceptance:

1. What filename did the application accept?
2. What filename did it actually store?
3. What content type did it infer?
4. What does the file's signature indicate?
5. Where was the file stored?
6. Can that location execute server-side code?
7. Does a downstream parser or processor handle the file?
8. Does the application transform or rename it before serving it?

This is why extension testing works best as one module in a broader upload-security assessment rather than as a standalone check.

*I test for extension evasion bypasses like these (and 12 other upload-related attack classes) as part of [GoUpload](https://github.com/HaakimSec/GoUpload), an open-source scanner I've been building — but the underlying issue here isn't specific to any one tool. It's worth understanding regardless of what you use to test for it.*