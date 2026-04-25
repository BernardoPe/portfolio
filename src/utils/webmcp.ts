/**
 * WebMCP (Web Model Context Protocol) utilities
 * Exposes site tools to AI agents via the browser
 * @see https://webmachinelearning.github.io/webmcp/
 */
import { ROUTES } from '@/data/routes';
import { PROFILE, SOCIAL_LINKS_BY_ID } from '@/data/profile';

interface WebMCPTool {
  name: string;
  title?: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<string>;
}

/**
 * Navigate to a specific page on the site
 */
const navigateTool: WebMCPTool = {
  name: 'navigate',
  title: 'Navigate Page',
  description:
    'Navigate to a specific section of the portfolio website. Available pages: home, experience, projects, chat (AI chat), and contact.',
  inputSchema: {
    type: 'object',
    properties: {
      page: {
        type: 'string',
        enum: ['home', 'experience', 'projects', 'chat', 'contact'],
        description: 'The page to navigate to',
      },
    },
    required: ['page'],
  },
  execute: async (input: Record<string, unknown>) => {
    const page = input.page as string;
    const routeMap: Record<string, string> = {
      home: ROUTES.home,
      experience: ROUTES.experience,
      projects: ROUTES.projects,
      chat: ROUTES.aiChat,
      contact: ROUTES.contact,
    };

    const route = routeMap[page];
    if (!route) {
      return `Error: Unknown page "${page}". Available pages: ${Object.keys(routeMap).join(', ')}`;
    }

    window.location.href = route;
    return `Navigating to ${page}...`;
  },
};

/**
 * Get contact information
 */
const getContactInfoTool: WebMCPTool = {
  name: 'get-contact-info',
  title: 'Get Contact Information',
  description: 'Retrieve contact information including email, location, and social media links.',
  inputSchema: {
    type: 'object',
    properties: {
      include: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['email', 'github', 'linkedin', 'location', 'response-time'],
        },
        description:
          'Specific contact fields to include. If omitted, returns all available contact info.',
      },
    },
  },
  execute: async (input: Record<string, unknown>) => {
    const contactInfo: Record<string, string> = {
      name: PROFILE.name,
      email: PROFILE.email,
      location: PROFILE.location,
      'response-time': PROFILE.responseTime,
      github: SOCIAL_LINKS_BY_ID.github.href,
      linkedin: SOCIAL_LINKS_BY_ID.linkedin.href,
    };

    const includeFields = input.include as string[] | undefined;
    if (includeFields && Array.isArray(includeFields)) {
      const filtered: Record<string, string> = {};
      includeFields.forEach(field => {
        if (field in contactInfo) {
          filtered[field] = contactInfo[field];
        }
      });
      return JSON.stringify(filtered, null, 2);
    }

    return JSON.stringify(contactInfo, null, 2);
  },
};

/**
 * Send a contact message
 */
const sendMessageTool: WebMCPTool = {
  name: 'send-message',
  title: 'Send Contact Message',
  description: 'Send a message through the contact form. Returns confirmation of message sent.',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Name of the person sending the message',
      },
      email: {
        type: 'string',
        description: 'Email address of the sender',
      },
      message: {
        type: 'string',
        description: 'The message content',
      },
    },
    required: ['name', 'email', 'message'],
  },
  execute: async (input: Record<string, unknown>) => {
    const { name, email, message } = input as {
      name: string;
      email: string;
      message: string;
    };

    if (!name || !email || !message) {
      return 'Error: name, email, and message are required';
    }

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          subject: `Portfolio contact - ${name}`,
        }),
      });

      if (!response.ok) {
        return `Error: Failed to send message (HTTP ${response.status})`;
      }

      return `Message from ${name} (${email}) sent successfully. Response time: ${PROFILE.responseTime}`;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return `Error: Failed to send message - ${errorMessage}`;
    }
  },
};

/**
 * Get profile information
 */
const getProfileTool: WebMCPTool = {
  name: 'get-profile',
  title: 'Get Profile Information',
  description: "Retrieve Bernardo Pereira's profile information including headline and resume URL.",
  inputSchema: {
    type: 'object',
    properties: {},
  },
  execute: async () => {
    return JSON.stringify(
      {
        name: PROFILE.name,
        headline: PROFILE.headline,
        location: PROFILE.location,
        resumeUrl: PROFILE.resumeUrl,
        email: PROFILE.email,
      },
      null,
      2
    );
  },
};

/**
 * Get available pages/sections
 */
const getPagesTool: WebMCPTool = {
  name: 'get-pages',
  title: 'Get Available Pages',
  description: 'Get a list of all available pages and sections on the portfolio site.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  execute: async () => {
    const pages = [
      {
        name: 'home',
        label: 'Home',
        description: 'Main landing page',
        route: ROUTES.home,
      },
      {
        name: 'experience',
        label: 'Experience',
        description: 'Education, experience, and skills',
        route: ROUTES.experience,
      },
      {
        name: 'projects',
        label: 'Projects',
        description: 'Portfolio projects and work samples',
        route: ROUTES.projects,
      },
      {
        name: 'chat',
        label: 'AI Chat',
        description: 'Chat with AI about the portfolio',
        route: ROUTES.aiChat,
      },
      {
        name: 'contact',
        label: 'Contact',
        description: 'Contact form and information',
        route: ROUTES.contact,
      },
    ];

    return JSON.stringify(pages, null, 2);
  },
};

/**
 * Register all WebMCP tools with the browser
 * This should be called once on page load
 */
export function registerWebMCPTools(): void {
  // Check if WebMCP API is available
  if (!navigator.modelContext) {
    console.debug('[WebMCP] Navigator.modelContext not available');
    return;
  }

  const tools: WebMCPTool[] = [
    navigateTool,
    getContactInfoTool,
    sendMessageTool,
    getProfileTool,
    getPagesTool,
  ];

  tools.forEach(tool => {
    try {
      navigator.modelContext.registerTool({
        name: tool.name,
        title: tool.title,
        description: tool.description,
        inputSchema: tool.inputSchema,
        execute: async (input: Record<string, unknown>) => {
          try {
            const result = await tool.execute(input);
            return result;
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return `Error executing tool: ${errorMessage}`;
          }
        },
        annotations: {
          readOnlyHint:
            tool.name === 'get-contact-info' ||
            tool.name === 'get-profile' ||
            tool.name === 'get-pages',
        },
      });

      console.debug(`[WebMCP] Registered tool: ${tool.name}`);
    } catch (error) {
      console.warn(`[WebMCP] Failed to register tool "${tool.name}":`, error);
    }
  });

  console.debug(`[WebMCP] Registered ${tools.length} tools`);
}
