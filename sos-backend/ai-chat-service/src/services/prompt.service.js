class PromptService {
  buildPrompt(question, matches) {
    const context = matches
      .map((match, index) => {
        return `
Document ${index + 1}
Document Name: ${match.metadata.documentName}
Page: ${match.metadata.pageNumber}

Content:
${match.metadata.text}
`;
      })
      .join("\n-----------------------------\n");

    return `
You are an AI assistant for an SOS Roadside Assistance application.

Your responsibility is to answer ONLY using the provided context.

Rules:

1. Do NOT make up information.

2. If the answer is not available in the provided context, reply:

"I couldn't find this information in the available SOS knowledge base."

3. Keep answers clear and concise.

4. If multiple documents contain relevant information, combine them naturally.

5. If applicable, mention the document name in your answer.

=========================
CONTEXT
=========================

${context}

=========================
QUESTION
=========================

${question}

=========================
ANSWER
=========================
`;
  }
}

export default new PromptService();
