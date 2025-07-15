import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/button';
import { Mail, Loader2, Plus, Download } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component built with class-variance-authority for consistent styling across different variants and sizes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default button style with primary colors.',
      },
    },
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete Item',
  },
  parameters: {
    docs: {
      description: {
        story: 'Used for dangerous actions like deleting data.',
      },
    },
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with a border and transparent background.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Action',
  },
  parameters: {
    docs: {
      description: {
        story: 'For secondary actions with muted colors.',
      },
    },
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'A minimal button style with no background.',
      },
    },
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Styled to look like a hyperlink.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button sizes for various use cases.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button>
          <Mail className="mr-2 h-4 w-4" />
          Send Email
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary">
          Add Track
          <Plus className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with Lucide icons for enhanced visual communication.',
      },
    },
  },
};

export const Loading: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
      <Button
        variant="outline"
        disabled
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons in loading state with spinner animation.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button disabled>Disabled Default</Button>
      <Button
        variant="destructive"
        disabled
      >
        Disabled Destructive
      </Button>
      <Button
        variant="outline"
        disabled
      >
        Disabled Outline
      </Button>
      <Button
        variant="secondary"
        disabled
      >
        Disabled Secondary
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons in disabled state across different variants.',
      },
    },
  },
};

export const MusicPlayerExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Track
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Playlist
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
        >
          Play All
        </Button>
        <Button
          variant="ghost"
          size="sm"
        >
          Shuffle
        </Button>
        <Button
          variant="ghost"
          size="sm"
        >
          Repeat
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant="destructive"
          size="sm"
        >
          Delete Playlist
        </Button>
        <Button
          variant="link"
          size="sm"
        >
          Share Playlist
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button examples from the music player application.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants in one view for comparison.',
      },
    },
  },
};
