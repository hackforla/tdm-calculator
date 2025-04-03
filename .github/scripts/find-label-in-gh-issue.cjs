module.exports = async ({ github, context, issueNumber }) => {
  const { owner, repo } = context.repo;

  try {
    // Get issue data
    const issue = await github.rest.issues.get({
      owner,
      repo,
      issue_number: issueNumber
    });
    
    // Check for UI label
    const hasUILabel = issue.data.labels.some(label => 
      label.name.toLowerCase().includes('ui') || 
      label.name.toLowerCase().includes('design') ||
      label.name.toLowerCase().includes('frontend') 
    );
    
    if (!hasUILabel) {
      console.log("Issue does not have a UI label");
      return {
        hasUILabel: false
      };
    }
    
    // If we have both a UI label and a designer, proceed
    return {
      hasUILabel: true,
    };
  } catch (error) {
    console.log(`Error getting issue: ${error}`);
    return {
      hasUILabel: false
    };
  }
}