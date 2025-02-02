---
name: 'Lighthouse: Cross-origin destinations are unsafe'
about: Instructions for addressing the cross-origin linking vulnerabilities
title: 'Lighthouse Issue: Cross-origin destinations are unsafe'
labels: ''
assignees: ''

---

### Overview
Links to cross-origin destinations are unsafe both from a security and performance perspective.  

### Action Item
Run [Lighthouse](https://developers.google.com/web/tools/lighthouse/) and then follow the instructions in [cross-origin destinations are unsafe]
(https://developers.google.com/web/tools/lighthouse/audits/noopener) .   
- [ ] Review with product and dev. Update if needed based on feedback
- [ ] Once finalized, add before and after images to the [staging deck on this slide]() 
   - [ ] if no slide has been made, make one in [the staging deck](https://docs.google.com/presentation/d/1crZ3IxqA4hAu3qzD7ns93Ieuqjwh6wyEtuX_46cP-fg)
- [ ] Get Stakeholder sign-off via the stakeholder meeting slide deck.

## Summary of instructions
When using *target=_blank* also adding *rel="noopener"* to the tag ensures that new page runs in a separate process.
