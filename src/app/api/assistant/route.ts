import Groq from "groq-sdk";

import { mockProjects } from "../../data/mock/projects";
import { mockApprovals } from "../../data/mock/approvals";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const messages = body.messages;

    if (!Array.isArray(messages)) {
      return Response.json(
        { error: "Invalid messages format." },
        { status: 400 }
      );
    }

    const projectContext = JSON.stringify(mockProjects, null, 2);
    const approvalContext = JSON.stringify(mockApprovals, null, 2);

    const systemMessage = {
      role: "system" as const,
      content: `
You are SANGAM AI Assistant, an intelligent assistant for industrial
project approvals, compliance and government processes in India.

Your job is to help users understand their project, approvals,
documents, compliance requirements, deadlines and next steps.

Use the project and approval data provided below as your primary source
of truth.

PROJECT DATA:
${projectContext}

APPROVAL DATA:
${approvalContext}

Rules:
1. Give practical and concise answers.
2. Use the provided project and approval data whenever relevant.
3. Do not invent approval statuses, deadlines, documents or government
   requirements that are not present in the provided data.
4. If the data does not contain an answer, clearly say that the
   information is not available in the current project data.
5. Explain approval statuses in simple language.
6. When appropriate, recommend the user's next action.
7. If an approval is overdue or approaching its SLA deadline, highlight it.
8. Do not claim to submit applications or contact government departments.
9. You are an informational assistant, not a legal authority.
      `,
    };

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [systemMessage, ...messages],
      temperature: 0.2,
      max_completion_tokens: 700,
    });

    const response =
      completion.choices[0]?.message?.content ??
      "Sorry, I could not generate a response.";

    return Response.json({
      response,
    });
  } catch (error) {
    console.error("Groq API error:", error);

    return Response.json(
      {
        error: "Failed to generate AI response.",
      },
      { status: 500 }
    );
  }
}