Here’s the updated documentation using ``` instead of triple backticks for code:

# AI Committer

**AI Committer** is a lightweight CLI tool designed to help developers generate professional, AI-powered git commit messages with customizable options. It supports various AI providers, models, and commit types, making it a versatile addition to your development workflow.

---

## **Features**

- Generate professional commit messages using AI.
- Supports multiple AI providers like `ollama` and `openai`.
- Customizable commit types (e.g., `feat`, `fix`, `chore`).
- Option to generate a list of commit messages.
- Fully configurable via CLI arguments or environment variables.

---

## **Installation**

Install globally using `npm` or `yarn`:

```bash
npm install -g ai-committer
```

---

## **Usage**

Run the tool from the command line:

```bash
ai-committer
```

### **Basic Command**

```bash
ai-committer --provider openai --model gpt-4o --commitType feat
```

This will generate a commit message using the specified provider, model, and commit type.

---

## **Configuration**

You can configure the tool using:

1. **CLI Arguments**
2. **Environment Variables**
3. **A combination of both**

---

### **CLI Arguments**

| Argument       | Description                                         | Example Values            | Default     |
| -------------- | --------------------------------------------------- | ------------------------- | ----------- |
| `--provider`   | The AI provider to use.                             | `ollama`, `openai`        | `ollama`    |
| `--model`      | The AI model to use with the provider.              | `gpt-4o`, `gpt-3.5-turbo` | `undefined` |
| `--commitType` | The commit type for the generated message.          | `feat`, `fix`, `chore`    | `undefined` |
| `--numCommits` | The number of commit messages to generate.          | Any integer               | `5`         |
| `--list`       | Generate a list of commits instead of a single one. | `true`/`false`            | `false`     |

Example:

```bash
ai-committer --provider openai --model gpt-4o --commitType feat --numCommits 3 --list
```

---

### **Environment Variables**

You can set environment variables to configure the tool globally.

| Variable         | Description                                 | Example Values      | Default     |
| ---------------- | ------------------------------------------- | ------------------- | ----------- |
| `AI_PROVIDER`    | The AI provider to use.                     | `ollama`, `openai`  | `ollama`    |
| `OPENAI_API_KEY` | API key required for the `openai` provider. | Your OpenAI API key | `undefined` |

Set them directly in your terminal:

```bash
export AI_PROVIDER=openai
export OPEN_AI_API_KEY=your-api-key
```

or Create a `.env` file in your working directory and set the variables:

```plaintext
AI_PROVIDER=openai
OPENAI_API_KEY=your-api-key
```

---

### **Examples**

#### Generate a Single Commit Message

```bash
ai-committer --provider openai --model gpt-4o --commitType fix
```

#### Generate a List of Commit Messages

```bash
ai-committer --provider ollama --list --numCommits 3
```

#### Use Environment Variables

1. Create a `.env` file:

   ```plaintext
   AI_PROVIDER=openai
   OPENAI_API_KEY=your-api-key
   ```

2. Run the tool:
   ```bash
   ai-committer
   ```

---

## **Default Values**

| Option        | Default Value |
| ------------- | ------------- |
| `AI_PROVIDER` | `ollama`      |
| `MODEL`       | `undefined`   |
| `COMMIT_TYPE` | `undefined`   |
| `NUM_COMMITS` | `5`           |
| `IS_LIST`     | `false`       |

---

## **Prerequisites**

- **Node.js**: Ensure Node.js is installed on your system.
- **OpenAI API Key**: Required when using the `openai` provider.

---

## **Contributing**

Contributions are welcome! Feel free to submit a pull request or open an issue.

---

Enjoy effortless commit messages with **AI Committer**! 🚀
