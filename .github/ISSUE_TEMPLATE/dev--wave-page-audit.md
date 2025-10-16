---
name: 'Dev: WAVE Page Audit'
about: Use to perform accessibility audits on web pages
title: 'Dev: WAVE Page Audit: [page-name]'
labels: 'deck: staging not for stakeholder, feature: Accessibility, level: easy, priority:
  MUST HAVE, role: front-end, size: 1pt'
assignees: ''

---

### Overview
We need to run the WAVE evaluation browser extension on [page-name] to audit the page for WCAG2.2 accessibility compliance. 

#### Details
We will need to audit all user interactions on the page so that all possible states and user flows are compliant.
- Page URL: [insert-page-url-here]
  - Requires sign in: [true/false]
    - User Profile Required: [None/User/Admin/Security]
  - Can access page directly from URL: [true/false]

### Action Items

- [ ] Review wiki page: Accessibility, **How to run the WAVE browser extension (Resource 1.01.02)**
- [ ] Install the WAVE browser extension
  - (suggested) pin to your browser's toolbar for quick access
- [ ] Open TDM WAVE Accessibility Audit Spreadsheet, **1. Page Log (Resource 1.02.01)**
  - [ ] Choose the row that has your issue number and populate the following fields...
    - [ ] Populate `Auditor` cell with your GitHub handle
    - [ ] Populate `Begin Date` with today's date (YYYY-MM-DD)
  - [ ] Log in as the user indicated under Details and navigate to the page you will audit
    - [ ] Run the WAVE extension with no elements focused, or clicked
      - [ ] In TDM WAVE Accessibility Audit Spreadsheet, **2. Audit Log (Resource 1.02.02)**, create a row for every Error, Contrast Error, and Alert on the Details pane
        - [ ] populate `Auditor` with your GitHub handle
        - [ ] populate `Page` with your selected page from **1. Page Log**
        - [ ] populate `Error Title` with the dropdown that matches the subtitle on the Details pane (see **Resource 2.01.02**)
        - [ ] double check that the `Category` field now matches the title on the Details pane (see **Resource 2.01.01**). If there's not a match, leave a comment with the actual title 
        - [ ] populate the `DOM snippet` by pasting in the highlighted HTML snippet for the Code panel
        - [ ] leave `Steps to Reproduce` empty
<!-- Delete if page has no Form-Elements -->
- Form-Elements
    - [ ] For all form elements (e.g. text input, password fields, checkboxes), click on the element and then click away to trigger validation error messages
      - [ ] In **2. Audit Log**, create and populate row for every Error, Contrast Error, and Alert on the Details pane
        - [ ] populate `Auditor` with your GitHub handle
        - [ ] populate `Page` with your selected page from **1. Page Log**
        - [ ] populate `Error Title` with the dropdown that matches the subtitle on the Details pane (see **Resource 2.01.02**)
        - [ ] double check that the `Category` field now matches the title on the Details pane (see **Resource 2.01.01**). If there's not a match, leave a comment with the actual title
        - [ ] populate the `DOM snippet` by pasting in the highlighted HTML snippet for the Code panel
        - [ ] in a new comment in this issue, write out all steps required to trigger the validation message
          - [ ] populate `Steps to Reproduce` with the link to this comment
<!-- end Form-Elements section -->
<!-- Delete if page has no Table-Controls -->
- Table-Controls
    - [ ] For all table controls (e.g. dropdown menus, radio buttons, checkboxes, filters) click on the table control to trigger any popups, menu dropdowns, selection styles, etc.
      - [ ] In **2. Audit Log**, create and populate row for every Error, Contrast Error, and Alert on the Details pane
        - [ ] populate `Auditor` with your GitHub handle
        - [ ] populate `Page` with your selected page from **1. Page Log**
        - [ ] populate `Error Title` with the dropdown that matches the subtitle on the Details pane (see **Resource 2.01.02**)
        - [ ] double check that the `Category` field now matches the title on the Details pane (see **Resource 2.01.01**). If there's not a match, leave a comment with the actual title 
        - [ ] populate the `DOM snippet` by pasting in the highlighted HTML snippet for the Code panel
        - [ ] in a new comment in this issue, write out all steps required to trigger the table control elements
          - [ ] populate `Steps to Reproduce` with the link to this comment
<!-- end Table-Controls section -->

### Resources/Instructions

- 1.01 TDM Wiki Pages
  - 1.01.01 [Accessibility Audits](https://github.com/hackforla/tdm-calculator/wiki/Accessibility-Audits)
    - 1.01.02 [How to run the WAVE browser extension](https://github.com/hackforla/tdm-calculator/wiki/Accessibility-Audits#tdm-wave-audits)
- 1.02 _TDM WAVE Accessibility Audit Spreadsheet_
  - 1.02.01 [1. Page Log](https://docs.google.com/spreadsheets/d/1qiAqR9LH-Gd4LO3aOs0yUy174o5LOmnuU6Bz671mKsY/edit?gid=669073341#gid=669073341)
  - 1.02.02 [2. Audit Log](https://docs.google.com/spreadsheets/d/1qiAqR9LH-Gd4LO3aOs0yUy174o5LOmnuU6Bz671mKsY/edit?gid=0#gid=0)
  - 1.02.03 [3. Solved Index](https://docs.google.com/spreadsheets/d/1qiAqR9LH-Gd4LO3aOs0yUy174o5LOmnuU6Bz671mKsY/edit?gid=406857693#gid=406857693)
  - 1.02.04 [4. Unsolved Index](https://docs.google.com/spreadsheets/d/1qiAqR9LH-Gd4LO3aOs0yUy174o5LOmnuU6Bz671mKsY/edit?gid=1793119266#gid=1793119266)
  - 1.02.05 [5. WAVE Error Index](https://docs.google.com/spreadsheets/d/1qiAqR9LH-Gd4LO3aOs0yUy174o5LOmnuU6Bz671mKsY/edit?gid=1697403119#gid=1697403119)

#### Audit Instructions

<details><summary>2.01 WAVE Details pane (title and subtitle)</summary>
<p>

> **2.01.01 Title**
> <img height="640" alt="Image" src="https://github.com/user-attachments/assets/954fbfcf-bcff-4ed1-b85d-ed22ee2d460e" />
>
> **2.01.02 Subtitle**
> <img height="640" alt="Image" src="https://github.com/user-attachments/assets/4a57bf7f-fef3-4580-a0c7-0f3d1e5be851" />

</p>
</details> 

<details><summary>Click to see: 📝 Steps to Reproduce</summary>
<p>

## Example 1: Register Page, No Interaction
> - Page URL: https://tdm-dev.azurewebsites.net/register
> - Steps to Reproduce: n/a
> - Error: Missing form label

**Screenshot (w/o WAVE Annotations)**
<img width="480" alt="Image" src="https://github.com/user-attachments/assets/56a989de-69ec-42d7-a75c-50263519f5a8" />

**Screenshot (w/ WAVE Annotations)**
<img width="480" alt="Image" src="https://github.com/user-attachments/assets/4622dd2e-0594-4879-9b98-775aa19a2d77" />

**Screenshot (click on first Missing form label)**
<img width="480" alt="Image" src="https://github.com/user-attachments/assets/25887728-4022-4ce9-ad71-f9227d53804c" />

**Screenshot (open Code panel, click on first Missing form label)**
<img width="480" alt="Image" src="https://github.com/user-attachments/assets/a50670ce-9c9d-4a98-83a8-9ffc29d66c02" />

**HTML DOM Snippet from firstMissing form label**
```
<input name="firstName" type="text" placeholder="First Name" class="form-control " value="">
```
</p>
</details>
