---
name: 'Dev: Update the spelling linter exclusion list with new terms'
about: to prevent the spelling linter from reporting misspellings
title: 'Dev: Update the spelling linter exclusion list with new terms'
labels: 'deck: add to staging, feature: spelling, good first issue, priority: MUST
  HAVE, role: front-end, size: 0.25pt'
assignees: ''

---

[comment]: <> (Prep this issue by adding your list of words for the exclusion list, to the resources section of this issue template)
[comment]: <> (Prep this issue by adding details of the list of words for the exclusion list, to the resources section of this issue template)
[comment]: <> (Click Create to make the issue)
[comment]: <> (Add your issue to the spelling epic https://github.com/hackforla/tdm-calculator/issues/413)

### Overview
We need to add some words to the exclusion list for the spelling linter so that it does not report these specific words as misspellings. 

#### Details
Use this issue template if the words are either either non-words that are part of the TDM vernacular, or a string in code that doesn't appear in the UI, for example client-side routing paths, that are following a convention that the spell checker doesn't recognize

### Action Items
- [ ] Assign yourself to the development issue.
- [ ] Move the development issue from the Prioritized Backlog to In Progress.
- [ ] add the word to the project-words.txt file
- [ ] Create a PR
   - indicate it fixes this issue
   - use the before details in the resources below
   - add the following in the after image section
      ```
      Once this PR is merged, the after image for the slide will come from going to the [Actions tab in the repo](https://github.com/hackforla/tdm-calculator/actions) and making a screenshot of the latest spell check run, Check spelling drop down
      ```
- Once the PR has been merged it will close this issue
   - [ ] Go make the after image and replace the text you added before

### Resources/Instructions
- https://github.com/hackforla/tdm-calculator/blob/develop/project-words.txt
<details><summary>Before details</summary>

On the Action Tab the spell check action shows all the words that are being caught.  The list of words to exclude below is the subset of this list.  The remaining words being caught are misspellings and will be handled on another issue.
- [INSERT A LINK TO THE LATEST RUN OF THE SPELL CHECK IN THE ACTIONS TAB]
- [INSERT A LINK TO THE LATEST IMAGE OF THE SPELL CHECK IN THE ACTIONS TAB]
</details> 

#### Words to add to exclude list
```
[INSERT WORDS TO EXCLUDE]
```

#### Details about word appearance

- word: `[INSERT WORD]`
  - where it appears: 
     - [INSERT FILE NAME AND LOCATION e.g., client/src/components/About/About.jsx], 
        - [INSERT PERMALINK e.g., https://github.com/hackforla/tdm-calculator/blob/f716d049535a5068210da9ab7ca51acbf246f0f4/client/src/components/About/About.jsx#L6]
