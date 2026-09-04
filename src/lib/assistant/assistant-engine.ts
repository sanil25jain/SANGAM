import { mockApprovals } from "../../app/data/mock/approvals";
import { mockProjects } from "../../app/data/mock/projects";

export function getAssistantResponse(message: string): string {
  const query = message.toLowerCase();

  const project = mockProjects[0];

  const completed = mockApprovals.filter(
    (approval) => approval.status === "approved"
  );

  const pending = mockApprovals.filter(
    (approval) =>
      approval.status !== "approved" &&
      approval.status !== "rejected"
  );

  const actionRequired = mockApprovals.filter(
    (approval) =>
      approval.status === "query" ||
      approval.status === "rejected"
  );

  const overdue = mockApprovals.filter(
    (approval) => approval.daysRemaining < 0
  );

  /*
   * 1. Approvals required
   */
  if (
    query.includes("approval") &&
    (query.includes("need") ||
      query.includes("required") ||
      query.includes("which"))
  ) {
    if (pending.length === 0) {
      return "All tracked approvals for this project are currently completed.";
    }

    return `For ${project.name}, there are ${pending.length} approvals that are not yet completed: ${pending
      .map((approval) => approval.name)
      .join(", ")}.`;
  }

  /*
   * 2. Approval status
   */
  if (
    query.includes("pending") ||
    query.includes("approval status") ||
    query.includes("status of")
  ) {
    return `Your project currently has ${completed.length} completed approvals and ${pending.length} approvals still in progress or awaiting action.`;
  }

  /*
   * 3. Documents
   */
  if (
    query.includes("document") ||
    query.includes("documents")
  ) {
    const approval = mockApprovals.find((item) =>
      query.includes(item.name.toLowerCase())
    );

    if (approval) {
      return `${approval.name} requires the following documents: ${approval.documents.join(
        ", "
      )}.`;
    }

    return `I can provide document requirements for a specific approval. Try asking "What documents are required for Pollution Consent?"`;
  }

  /*
   * 4. Overdue / deadlines
   */
  if (
    query.includes("overdue") ||
    query.includes("deadline")
  ) {
    if (overdue.length === 0) {
      return "There are currently no overdue approvals in the project data.";
    }

    return `You have ${overdue.length} overdue approval${
      overdue.length > 1 ? "s" : ""
    }: ${overdue.map((approval) => approval.name).join(", ")}.`;
  }

  /*
   * 5. Action required
   */
  if (
    query.includes("action") ||
    query.includes("attention") ||
    query.includes("problem")
  ) {
    if (actionRequired.length === 0) {
      return "There are currently no approvals marked as requiring action.";
    }

    return `The following approvals require attention: ${actionRequired
      .map((approval) => approval.name)
      .join(", ")}.`;
  }

  /*
   * 6. Next step
   */
  if (
    query.includes("next") ||
    query.includes("what should i do") ||
    query.includes("what do i do")
  ) {
    const next = [...pending].sort(
      (a, b) => a.daysRemaining - b.daysRemaining
    )[0];

    if (!next) {
      return "All tracked approvals are completed. Your next step is to review ongoing compliance requirements.";
    }

    return `Your next priority should be ${next.name}. Its current status is "${next.status.replace(
      "_",
      " "
    )}" and it has ${next.daysRemaining} days remaining.`;
  }

  /*
   * 7. Project information
   */
  if (
    query.includes("project") ||
    query.includes("about my project")
  ) {
    return `${project.name} is a ${project.industry} project located in ${project.location}. There are ${mockApprovals.length} tracked approvals, with ${completed.length} completed and ${pending.length} still pending.`;
  }

  /*
   * 8. Help
   */
  if (
    query.includes("help") ||
    query.includes("what can you do")
  ) {
    return "I can help you with approval requirements, required documents, approval status, deadlines, action items, compliance and project next steps.";
  }

  /*
   * 9. Fallback
   */
  return `I can help with your project approvals, documents, deadlines, compliance and next steps.

Try asking:
• Which approvals do I need?
• What documents are required?
• What approvals are pending?
• What is overdue?
• What should I do next?`;
}